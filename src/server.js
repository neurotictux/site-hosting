import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import userController from './controllers/user'

const app = express()

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

const port = 8081

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
