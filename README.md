# ams-backend-nodejs
The back-end server of our Access management system.

## Setup
```
# must
npm run build
cp .env.sample ./dist/.env

# option (to use slackbot)
curl "https://beebotte.com/certs/mqtt.beebotte.com.pem" -o ./dist/mqtt.beebotte.com.pem
```
Then, edit `.env` properly.

:exclamation: Skip setting `SLACK_` and `BEEBOTTE_` variable if you don't use the slackbot.

Start
```
cd dist
node ams-backend-server.js
```
