import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Pm2 from 'pm2'

import userController from './controllers/user'
import databaseController from './controllers/database'

const app = express()

console.log(Pm2.list())

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(express.static('public'))

app.use((req, res, next) => {
  next()
})

app.get('/api/user', userController.getAll)
app.post('/api/user', userController.create)
app.post('/api/token', userController.token)
app.delete('/api/user/:id', userController.delete)

app.post('/api/database', databaseController.create)
app.get('/api/database', databaseController.getAll)
app.delete('/api/database/:id', databaseController.remove)

const port = 8081

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
