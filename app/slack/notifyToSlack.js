// user environment variable
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
chat.postMessage = (num) => {
  const message = {
    channel: process.env.ITS19_BOTTEST_CH_ID,
    text: new Date().toString() + ` なう\n いま ${num} 人:+1:`
  }
  // const req = https.request(options, res => {
  //   console.log(`STATUS: ${res.statusCode}`)
  //   console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  //   res.setEncoding('utf8')
  //   res.on('data', (chunk) => {
  //     console.log(`BODY: ${chunk}`);
  //   })
  //   res.on('end', () => {
  //     console.log('No more data in response.');
  //   })
  // })
  const req = https.request(options)

  req.write(JSON.stringify(message))
  req.end()
}

module.exports = chat