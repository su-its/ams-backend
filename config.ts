import * as YAML from 'yaml'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * 設定ファイルのパス
 */
const CONFIG_FILE = join(process.cwd(), 'config.yml')

/**
 * バックエンドの動作に必要な設定を格納したインターフェイス
 */
interface AmsOptions {
  /**
   * Port to listen.
   */
  port: number,

  /**
   * Accept student who is not registered to DB or not.
   * 使ってません
   */
  acceptGuest: boolean,

  /**
   * ログファイルの出力先フォルダ
   */
  logPath: string,
}

/**
 * mysql の ConnectionOptions の必要な部分だけ抜き出したインターフェイス
 *
 * @see ConnectionOptionsの定義(8行目あたりから) ./node_modules/mysql2/typings/mysql/lib/Connection.d.ts
 */
interface DBOptions {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
}

/**
 * AmsOptionsインターフェースを実装しているかチェックするためのユーザー定義タイプガード
 *
 * @see 元ネタ {@link https://qiita.com/suin/items/0ce77f31cbaa14031288 TypeScript: interfaceにはinstanceofが使えないので、ユーザ定義タイプガードで対応する - Qiita}
 * @see TypeScriptのドキュメント {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates TypeScript: Documentation - Narrowing}
 * @param arg AmsOptionsインターフェースを実装しているか確かめたいもの(オブジェクト)
 * @returns
 */
function implementsAmsOptions (arg: any): arg is AmsOptions {
  return arg !== null &&
    typeof arg === 'object' &&
    typeof arg.port === 'number' &&
    typeof arg.acceptGuest === 'boolean' &&
    typeof arg.logPath === 'string'
}

/**
 * 与えられた引数がDBOptionsインターフェースを実装しているかチェックするためのユーザー定義タイプガード
 *
 * @see 元ネタ {@link https://qiita.com/suin/items/0ce77f31cbaa14031288 TypeScript: interfaceにはinstanceofが使えないので、ユーザ定義タイプガードで対応する - Qiita}
 * @see TypeScriptのドキュメント {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates TypeScript: Documentation - Narrowing}
 * @param arg DBOptionsインターフェースを実装しているか確かめたいもの(オブジェクト)
 * @returns
 */
function implementsDBOptions (arg: any): arg is DBOptions {
  return arg !== null &&
    typeof arg === 'object' &&
    typeof arg.host === 'string' &&
    typeof arg.port === 'number' &&
    typeof arg.user === 'string' &&
    typeof arg.password === 'string' &&
    typeof arg.database === 'string'
}

// import { xxOptions } from 'config' されると、ここから下が実行される
let amsOptions: AmsOptions
let dbOptions: DBOptions

try {
  // yamlの読み込み
  const loaded = YAML.parse(readFileSync(CONFIG_FILE, 'utf-8'))

  // それぞれinterfaceとして適切かチェック
  if (!implementsAmsOptions(loaded.amsOptions) || !implementsDBOptions(loaded.dbOptions)) {
    console.error(`[!] The setting value is incorrect or insufficient. Check '${CONFIG_FILE}'.`)
    process.exit(-1) // kill process
  }

  amsOptions = loaded.amsOptions
  dbOptions = loaded.dbOptions
} catch (err: any) {
  // YAML.parse()のエラーをハンドリング
  console.error('[!] Error:', err)
  process.exit(-1) // kill process
}

export { amsOptions, dbOptions }
