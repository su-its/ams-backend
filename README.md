# ams-backend-nodejs
The back-end server of our [Access management system](https://github.com/su-its/Access-management-system).

## Setup

:memo: Before you start, make sure you are not logged in as the root user. Check `whoami`.

```bash
cd ~
git clone https://github.com/su-its/ams-backend-nodejs.git
cd ams-backend-nodejs
```

### Basic

```bash
mv src/config.ts.sample src/config.ts
```

**Then you have to edit `config.ts`** See [here](#Configuration-Guide)

Start

```bash
npm run start
```

:loudspeaker: Due to path resolving, use npm script shown above. The command below will fail.

```bash
# NG
npm run build
cd dist
node ams-backend-server.js
```

### Optional (Slackbot)

To use Slackbot, download *CA certificate*. It is required to establish TLS connection with *MQTT broker(Beebotte)*. About MQTT, see [here](https://beebotte.com/docs/mqtt).

```bash
curl "https://beebotte.com/certs/mqtt.beebotte.com.pem" -o ./mqtt.beebotte.com.pem
```

- You have to sign up for Beebotte and create channel to subscribe. More detail, see [Beebotte documentation](https://beebotte.com/overview).
- You also have to have the right to install bot to your Slack workspace. There is a great guide for designing Slack app, [here](https://api.slack.com/start/overview#apps).

---

## Configuration Guide

More detail, see `config.ts`.

:loudspeaker: If you don't use the Slackbot, set `enable_boushitsu` false, and *comment out* all of properties `slack_` and `beebotte_` of `amsOptions`.

- **Database**
  - See [here](https://github.com/mysqljs/mysql#connection-options)
- **Slackbot**
  - slack_bearer_token
    - `xoxb-` prefixed token
  - beebotte_channel_token
    - `token_` prefixed token

### Required Bot Token Scopes
- `chat:write` API document [here](https://api.slack.com/scopes/chat:write)
- `commands` API document [here](https://api.slack.com/scopes/commands), Tutorial [here](https://api.slack.com/interactivity/slash-commands)
