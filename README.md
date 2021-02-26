# ams-backend-nodejs

~~The back-end server of our [Access management system](https://github.com/su-its/Access-management-system).~~
The back-end server of our [reader-bridge](https://github.com/su-its/rdr-bridge)

**version: 2.0.0**
- No longer backward compatible
  - Changed routing path
  - Hidden some APIs served in previous version to access the DB
- Installed eslint and formatted according to JavaScript Standard Style

## Setup:gear:

:memo: Before you start, make sure you are not logged in as the root user. Check `whoami`.

```bash
cd ~
git clone https://github.com/su-its/ams-backend-nodejs.git
cd ams-backend-nodejs
```

### Basic

For developpers

```bash
cp src/config.ts.sample src/config.ts
```

**Then you have to edit `config.ts`** See [here](#Configuration-Guide)

Start development (auto-reload when a file changed)

```bash
npm run dev
```

:loudspeaker: Due to path resolving, use npm script shown above. The command below will fail.

```bash
# NG
npm run build
cd dist
node ams-backend-server.js
```

### Optional (Slackbot)

>:bulb: This project will only provide APIs to access the database, and features related to slackbot will be discontinued.

To use Slackbot, download *CA certificate*. It is required to establish TLS connection with *MQTT broker(Beebotte)*. About MQTT, see [here](https://beebotte.com/docs/mqtt).

```bash
curl "https://beebotte.com/certs/mqtt.beebotte.com.pem" -o ./mqtt.beebotte.com.pem
```

- You have to sign up for Beebotte and create a channel to subscribe. More detail, see [Beebotte documentation](https://beebotte.com/overview).
- You also have to have the right to install bot to your Slack workspace. There is a great guide for designing Slack app, [here](https://api.slack.com/start/overview#apps).

## Deployment:rocket:

Make sure that [pm2](https://github.com/Unitech/pm2) has been installed to the system, or install via:

```bash
npm install pm2 -g
```

Then, start pm2 process and daemonize it.

```
cd /path/to/projectdir/
pm2 start ecosystem.config.js
pm2 startup  # You should get output like '[PM2] To setup the Startup Script...'. Follow it.
pm2 save
```

More: [pm2 official website](https://pm2.keymetrics.io/)

---

## Configuration Guide

More detail, see `config.ts`.

:loudspeaker: If you don't use the Slackbot, set `enable_boushitsu` false, and *comment out* all of properties `slack_` and `beebotte_` of `amsOptions`.

- **Database**
  - See [here](https://github.com/mysqljs/mysql#connection-options)
- **Slackbot**
  - ~~slack_bearer_token~~ As long as using slash command, it is not required.
    - ~~`xoxb-` prefixed token~~
  - beebotte_channel_token
    - `token_` prefixed token

### Required Bot Token Scopes

- ~~`chat:write` API document [here](https://api.slack.com/scopes/chat:write)~~ As long as using slash command, it is not required.
- `commands` API document [here](https://api.slack.com/scopes/commands), Tutorial [here](https://api.slack.com/interactivity/slash-commands)

---

## API Reference

Each path prefixed with `/v1/` like `/v1/access_logs`.

**Models**
- *Log*

```json5
{
  /* The attributes "entered_at"/"exited_at"
     show when he or she entered/left the room. */

  // Example
  "user_id": 1,                             // user_id: number
  "entered_at": "2021-02-23T16:57:39.000Z"  // entered_at: string
  "exited_at": "2021-02-23T17:32:50.000Z"   // exited_at: string
}
```

- *User*

```json5
{
  // Example
  "user_id": 1,                             // user_id: number
  "entered_at": "2021-02-23T16:57:39.000Z"  // entered_at: string
}
```

- *Err*

```json5
{
  /* Text will be produced by this API server
     itself, or passed to by some other packages. */

  // Example
  "message": "internal server error"  // message: string
}
```

### /access_logs

- **GET** : returns an array of *Log*, or *Err*

### /room

- **POST** : returns empty body. Always responces with status code 200.

### /users_in_room

- **GET** : returns an array of *User* or *Err*

### /users_in_room/:userId

- **GET** : returns *User* or *Err*
