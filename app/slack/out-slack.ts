import https from 'https'

export class SlackPostEphemeral {
  private channel = ''
  private footer = ''
  private text = ''
  private user = ''
  private token: string

  constructor(token: string | undefined) {
    if (typeof token === 'undefined') throw new Error('Slack bearer token is undefined!')
    this.token = token as string
  }

  setChannel(channelSendTo: string) {
    this.channel = channelSendTo
  }

  setFooter(s: string, ...rest: string[]) {
    /* 'text' must be more than 0 characters */
    if (s.length === 0) s = '_test_'
    rest.unshift(s)
    this.footer = rest.join(' ')
  }

  setText(s: string, ...rest: string[]) {
    /* 'text' must be more than 0 characters */
    if (s.length === 0) s = '_test_'
    rest.unshift(s)
    this.text = rest.join(' ')
  }

  setUser(user: string) {
    this.user = user
  }

  postEphemeral() {
    const payload = {
      channel: this.channel,
      text: 'from boushitsu',
      attachments: [],
      user: this.user,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: this.text
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: this.footer
            }
          ]
        }
      ]
    }

    const req = https.request({
      hostname: 'slack.com',
      path: '/api/chat.postEphemeral',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    })

    /* debug */
    // req.on('error', err => console.error(err))
    // req.on('close', () => console.log('CLOSE'))
    // req.on('finish', () => console.log('FINISH'))
    // req.on('response', res => console.log('STATUS', res.statusCode))
    req.write(JSON.stringify(payload))
    req.end()
  }
}
