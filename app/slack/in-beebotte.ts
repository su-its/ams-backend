import mqtt from 'mqtt'
import { readFileSync } from 'fs'
import { SlackPostEphemeral } from './out-slack'
import { readAccessLogs } from '../models/accessLogsModel'
import { amsOptions } from '../../config'

export function setupBeebotte () {
  /**
   * ref1. https://github.com/beebotte/bbt_node/blob/master/lib/stream.js
   * ref2. https://github.com/beebotte/bbt_node/blob/master/lib/mqtt.js
  */
  const mqttAuth = {
    username: 'token:' + amsOptions.beebotte_channel_token,
    password: '',
    ca: [readFileSync('./mqtt.beebotte.com.pem')] // I'm not sure if 'ca' is needed or not.
  }
  const mqttUrl = 'mqtts://mqtt.beebotte.com:8883'
  const beebotteClient = mqtt.connect(mqttUrl, mqttAuth)

  const channel = amsOptions.beebotte_channel
  const res = amsOptions.beebotte_resource

  beebotteClient.on('connect', () => {
    // Set QoS 0 or 1 (2 unavailable) if too many messages are posted.
    beebotteClient.subscribe(channel + '/' + res, { qos: 1 }, (err, granted) => {
      if (err) {
        console.error('[!] Error', err)
        process.exit(-1) // Halt!!
      }
      if (!granted) {
        console.error('[!] "granted" is undefined. Faled to subscribe.')
        process.exit(-1)
      }
      const t = granted[0].topic.split('/')
      if (t.length === 2) {
        console.log('Subscribed to')
        console.log('- channel:', t[0])
        console.log('- resource:', t[1])
      }
    })
    beebotteClient.on('message', async (_topic, message, _packet) => {
      const receivedMessage = JSON.parse(message.toString())
      /* debug */
      // console.log(receivedMessage)

      /* Set up response message */
      const reaction = await setupResponse(new SlackPostEphemeral())
      /**
       * ref. https://api.slack.com/interactivity/slash-commands
       */
      reaction.postEphemeral(receivedMessage.data.response_url)
    })
  })
}

const setupResponse = async (reaction: SlackPostEphemeral) => {
  const [logs, error] = await readAccessLogs()
  if (error || !Array.isArray(logs)) {
    reaction.setText('boushitsu status: *error* (Sorry, something went wrong.) :x:')
    reaction.setFooter(':bow:_< Sorry_')
  } else {
    const num = logs.length
    if (num === 0) {
      reaction.setText('boushitsu status: *closed* :zzz:')
      reaction.setFooter('No one is currently in the room.')
    } else {
      let text = 'Currently in the room '
      for (let i = 0; i < num; i++) { text += ':bust_in_silhouette:' }
      reaction.setText('boushitsu status: *open* :heavy_check_mark:')
      reaction.setFooter(text)
    }
  }
  return reaction
}
