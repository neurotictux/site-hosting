import express from 'express'
import linuxUser from 'linux-user'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/users', (req, res) => {
  linuxUser.getUsers((err, users) => {
    if (err)
      return res.end(err)
    res.json(users)
  })
})

const port = 80

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
