require('dotenv').config(require('path').resolve(process.cwd(), '.env'))
const https = require('https')

const options = {
  hostname: 'slack.com',
  path: '/api/chat.postMessage',
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + process.env.SLACK_BEARER_TOKEN
  }
}
const chat = {}
chat.postMessage = (...args) => {
  const message = {
    channel: process.env.SLACK_CH_ID,
    text: args.join(' ')
  }
  const req = https.request(options)

  req.write(JSON.stringify(message))
  req.end()
}

module.exports = chat