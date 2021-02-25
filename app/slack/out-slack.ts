import https from 'https'

export class SlackPostEphemeral {
  private footer: string
  private text: string

  constructor () {
    this.footer = '_text_'
    this.text = '_footer_'
  }

  setFooter (s: string, ...rest: string[]) {
    /* 'text' must be more than 0 characters */
    if (s.length === 0) return
    rest.unshift(s)
    this.footer = rest.join(' ')
  }

  setText (s: string, ...rest: string[]) {
    /* 'text' must be more than 0 characters */
    if (s.length === 0) return
    rest.unshift(s)
    this.text = rest.join(' ')
  }

  postEphemeral (url: string) {
    const payload = {
      text: 'from boushitsu',
      resonse_type: 'ephemeral',
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

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })

    /* debug */
    // req.on('error', err => console.error(err))
    // req.on('close', () => console.log('CLOSE'))
    // req.on('finish', () => console.log('FINISH'))
    // req.on('response', res => console.log('STATUS', res))
    req.write(JSON.stringify(payload))
    req.end()
  }
}
