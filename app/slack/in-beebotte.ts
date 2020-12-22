import mqtt from 'mqtt'
import { readFileSync } from 'fs'
import { SlackPostMessageFactory } from './out-slack'
import { countNumOfPeople } from '../models/accesslogModel'
import { config } from 'dotenv'

enum BoushitsuStatus {
  Closed,
  Error,
  Open
}

namespace BoushitsuStatus {
  export function toString(status: BoushitsuStatus) {
    switch (status) {
      case BoushitsuStatus.Closed:
        return 'boushitsu status: *closed* :zzz:'
      case BoushitsuStatus.Error:
        return 'boushitsu status: *error* (Sorry, something went wrong.) :x:'
      case BoushitsuStatus.Open:
        return 'boushitsu status: *open* :heavy_check_mark:'
    }
  }
}

export function setupBeebotte() {
  config()
  /**
   * ref1. https://github.com/beebotte/bbt_node/blob/master/lib/stream.js
   * ref2. https://github.com/beebotte/bbt_node/blob/master/lib/mqtt.js
  */
  const mqtt_auth = {
    username: 'token:' + process.env.BEEBOTTE_CHANNEL_TOKEN || '',
    password: '',
    ca: [readFileSync('./mqtt.beebotte.com.pem')] // I'm not sure if 'ca' is needed or not.
  }
  const mqtt_url = 'mqtts://mqtt.beebotte.com:8883'
  const beebotteClient = mqtt.connect(mqtt_url, mqtt_auth)

  const channel = process.env.BEEBOTTE_CHANNEL || 'test'
  const res = process.env.BEEBOTTE_RESOURCE || 'res'

  beebotteClient.on('connect', () => {
    beebotteClient.subscribe(channel + '/' + res, (_err, granted) => {
      const t = granted[0].topic.split('/')
      if (t.length === 2) {
        console.log('Subscribed to')
        console.log('- channel:', t[0])
        console.log('- resource:', t[1])
      }
    })
    .on('message', async (_topic, message, _packet) => {
      const receivedMessage = JSON.parse(message.toString())
      console.log(receivedMessage)
      if (receivedMessage.data.channel === undefined) return // cancel due to missing of channel

      /* Set up responce message */
      const reaction = await setupResponce(new SlackPostMessageFactory(process.env.SLACK_BEARER_TOKEN))
      /**
       * Existance of 'channel' property depends on
       * the structure of 'receivedMessage'.(defined by boushitsu BOT)
       * So this is bad pattern...
       */
      reaction.setChannel(receivedMessage.data.channel)
      reaction.postMessage()
    })
  })
}

const fmt = (now: Date) => {
  const h = '00' + now.getHours()
  const m = '00' + now.getMinutes()
  return h.substr(h.length - 2, 2) + ':' + m.substr(m.length - 2, 2)
}

const setupResponce = async (reaction: SlackPostMessageFactory) => {
  const num = await countNumOfPeople()
  const hhmm = fmt(new Date())
  if (num < 0) {
    reaction.setText(':bow:_< Sorry_')
    reaction.setFooter(BoushitsuStatus.toString(BoushitsuStatus.Error), hhmm)
  } else {
    if (num === 0) {
      reaction.setText('No one is currently in the room.')
      reaction.setFooter(BoushitsuStatus.toString(BoushitsuStatus.Closed), hhmm)
    } else {
      let text = 'Currently in the room '
      for (let i = 0; i < num; i++) { text += ':bust_in_silhouette:' }
      reaction.setText(text)
      reaction.setFooter(BoushitsuStatus.toString(BoushitsuStatus.Open), hhmm)
    }
  }
  return reaction
}