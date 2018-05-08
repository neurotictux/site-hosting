import { User } from '../db/sequelize'

const parseUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

class UserController {
  getAll(req, res) {
    User.findAll()
      .then(result => {

        res.json(result.map(p => parseUser(p)))
      })
      .catch(err => res.end(JSON.stringify(err)))
  }

  getByName(req, res) {
    User.findAll({ where: { name: req.params.name } })
      .then(result => res.json(result))
      .catch(err => res.end(JSON.stringify(err)))
  }

  create(req, res) {
    req.body.id = undefined
    User.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.end(JSON.stringify(err)))
  }

  update(req, res) {

  }

  delete(req, res) {

  }
}

export default new UserController()