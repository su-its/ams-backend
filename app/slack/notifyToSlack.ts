require('dotenv').config(require('path').resolve(process.cwd(), '.env'))
import https from 'https'

export function postMessage(...args: string[] | number[]) {
  const options = {
    hostname: 'slack.com',
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + process.env.SLACK_BEARER_TOKEN
    }
  }

  const message = {
    channel: process.env.SLACK_CH_ID,
    text: args.join(' ')
  }

  const req = https.request(options)

  req.write(JSON.stringify(message))
  req.end()
}
