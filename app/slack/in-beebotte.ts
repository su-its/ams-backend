import mqtt from 'mqtt'
import { readFileSync } from 'fs'
import { SlackPostEphemeral } from './out-slack'
import { countNumOfPeople } from '../models/accesslogModel'
import { amsOptions } from '../../config'

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
    beebotteClient.subscribe(channel + '/' + res, {qos: 1}, (err, granted) => {
      if (err) {
        console.error('[!] Error', err)
	return
      }
      const t = granted[0].topic.split('/')
      if (t.length === 2) {
        console.log('Subscribed to')
        console.log('- channel:', t[0])
        console.log('- resource:', t[1])
      }
    })
    .on('message', async (_topic, message, _packet) => {
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

const fmt = (now: Date) => {
  const h = '00' + now.getHours()
  const m = '00' + now.getMinutes()
  return h.substr(h.length - 2, 2) + ':' + m.substr(m.length - 2, 2)
}

const setupResponse = async (reaction: SlackPostEphemeral) => {
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
