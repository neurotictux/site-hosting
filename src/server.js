import express from 'express'
import bodyParser from 'body-parser'

import userController from './controllers/user'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/api/user', userController.getAll)
app.post('/api/user', userController.create)

const port = 8081

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
