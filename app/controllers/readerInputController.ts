/* eslint-disable no-unused-vars */
import { spawnSync } from 'child_process'
import { EventEmitter } from 'events'
import { Request, Response } from 'express'
import { join } from 'path'
import * as roomTable from '../models/inRoomUsersModel'
import * as logsTable from '../models/accessLogsModel'
import mysql from '../database/db'

const WAV_FILE_DIR = join(process.cwd(), 'sound')

const Status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FATAL: 'fatal'
} as const

// フロントエンドに通知するためのイベントを定義。sseHandler関数にlistenさせる
const emitter = new EventEmitter()

// 検知してもどうしようも無いがもしエラーが出たら記録する
emitter.on('error', () => {
  console.error('[!] Some error related to "emitter(node:events.EventEmitter)" has occured')
  // さいきょうのえらーはんどりんぐ
})

function playWav (fileName: string) {
  // stdio: 'inherit'だとnodeのstdioに流れてしまって後で使えないので'pipe'
  // asyncなspawnだとChildProcessが返ってきて世話するのが面倒くさいので、spawnSyncを使う
  // 順番通りに最後まで再生したいのでspawnSyncを使う
  const aplay = spawnSync('aplay', [fileName + '.wav'], { cwd: WAV_FILE_DIR, stdio: 'pipe' })

  // spawnSync().errorはコマンドを実行できなかった際にErrorオブジェクトが入る
  if (aplay.error) {
    console.error('[!] spawnSync error:', aplay.error)
  // spawnSync().statusは実行したコマンドの終了コードが入る
  // errorではないのでnullではないはずだが一応確認
  } else if (aplay.status !== null && aplay.status !== 0) {
    console.error('[!] aplay error:', aplay.stderr)
  }
}

async function handleReaderInput (req: Request, res: Response) {
  const readerStatus = req.body.status
  const receivedUserId = req.body.user_id

  function isValidStatus (status: any) {
    // statusがtruthyであることを確認する
    if (!status) {
      return false
    // statusが正しいStatusかであることを確認する
    } else if (!Object.values(Status).includes(status)) {
      return false
    }
    return true
  }

  // statusが適切かチェック
  if (!isValidStatus(readerStatus)) {
    res.status(400).json({
      message: 'Invalid status in body'
    })
    console.error('[!] Received a request including invalid status')
    return
  }

  // reader-bridgeからのリクエストを正しく受け取ったことを音で知らせる
  switch (readerStatus) {
    case Status.SUCCESS:
      // ちゃんとしたIDが来ているかチェック
      if (!Number.isInteger(receivedUserId)) {
        res.status(400).json({
          message: 'Invalid user_id in body'
        })
        console.error('[!] Received a request including invalid user_id')
        return
      }
      break
    case Status.ERROR:
      playWav(Status.ERROR)
      console.error('[!] Reader-bridge status', Status.ERROR)
      res.status(204).send()
      return
    case Status.FATAL:
      playWav(Status.FATAL)
      console.error('[!] Reader-bridge status', Status.FATAL)
      res.status(204).send()
      return
    default:
      /* isValidStatus()でチェックするので多分ここには来ない */
      console.error('[!] 日本はもう終わりよ～ん')
      res.status(500).send()
      return
  }

  // 入室or退室処理
  const [user, err] = await roomTable.getUser(receivedUserId)
  if (err) {
    console.error('[!] Error:', err)
    res.status(500).json({ message: err.message || 'internal server error' })
    return
  }

  const isExit = !!user
  try {
    await mysql.beginTransaction()
    if (isExit) {
      // 退室
      const [_caResult, caErr] = await logsTable.createAccessLog(user.user_id, user.entered_at)
      // エラーがnullでなかったらthrowする
      if (caErr) {
        throw caErr
      }
      const [_duResult, duErr] = await roomTable.deleteUser(user.user_id)
      if (duErr) {
        throw duErr
      }
    } else {
      // 入室
      const [_cuResult, cuErr] = await roomTable.createUser(receivedUserId)
      if (cuErr) {
        throw cuErr
      }
    }
    await mysql.commit()
  } catch (err) {
    playWav('error')
    console.error('[!] Error:', err)
    await mysql.rollback()
    res.status(500).json({ message: err.message || 'internal server error' })
    return
  }

  // 処理が一通り終わったので音を鳴らす
  playWav(isExit ? 'out' : 'in')

  // イベントの発火
  emitter.emit('usersUpdated')

  res.status(204).send()
}

export { emitter, handleReaderInput }
