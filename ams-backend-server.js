const express = require('express')
const bodyParser = require('body-parser')
const accesslogRoutes = require('./app/routes/accesslogRoutes')
const memberRoutes = require('./app/routes/membersRoutes')

const app = express()
// app.set('query parser', 'extended') // default value: 'extended'

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/api', accesslogRoutes.routes, memberRoutes.routes)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
