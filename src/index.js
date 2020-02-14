const express = require('express')
const atrium = require('mx-atrium')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

const { devApiKey, devClientId } = require('../config.js') 

const app = express()
const port = 3005
const client = new atrium.AtriumClient(devApiKey, devClientId, "https://vestibule.mx.com")

app.use(bodyParser.json())
app.use(morgan(':method :status :res[content-length] - :response-time ms'))
app.use(cors())

app.get('/', (req, res) => res.send('node app init'))

app.get('/create_user', (req, res) => {
  const user = new atrium.User();
  user.metadata = "test";
  const body = new atrium.UserCreateRequestBody();
  body.user = user;
  const response = client.users.createUser(body);
  response.then((response) => res.send(response.body))
})



app.listen(port, () => console.log(`App running on port ${port}!`))
