import { sequelize, User } from '../db'
import { exec } from 'child_process'
import sha1 from 'sha1'

const databases = ['alphadb1', 'alphadb2', 'alphadb3', 'alphadb4', 'alphadb5', 'alphadb6']

const parseUser = user => {
  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    token: user.token,
    userAccess: user.userAccess,
    database: user.database,
    domain: user.domain
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
    User.findOne({ where: { name: req.params.name } })
      .then(result => res.json(result))
      .catch(err => res.end(JSON.stringify(err)))
  }

  async token(req, res) {
    const { password, name } = req.body
    if (!name) {
      res.json({ message: 'Informe o nome ou o email.' })
      return
    }

    if (!password) {
      res.json({ message: 'Informe a senha.' })
      return
    }

    const userDb = await User.findOne({
      where: sequelize.or(
        { email: name },
        { name: name }
      )
    })
    if (!userDb) {
      res.json({ message: 'Usuário não existe.' })
      return
    }

    if (userDb.password != password) {
      res.json({ message: 'Credenciais inválidas.' })
      return
    }

    res.json(parseUser(userDb))
  }

  async create(req, res) {
    try {

      const { name, email, password, domain } = req.body

      if (!name || !/^[a-zA-Z0-9_]{0,20}$/.test(name)) {
        res.json({ message: 'Nome inválido.' })
        return
      }

      if (!email || !/[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}/.test(email)) {
        res.json({ message: 'Email inválido.' })
        return
      }

      if (!domain || !/^[a-zA-Z0-9]{3,10}\.[a-zA-Z0-9]{2,5}$/.test(domain)) {
        res.json({ message: 'Domínio inválido.' })
        return
      }

      if (!password || password.length < 4) {
        res.json({ message: 'Informe uma senha de no mínimo 4 dígitos.' })
        return
      }

      const userDb = await User.findOne({
        where: sequelize.or(
          { email: email },
          { name: name }
        )
      })

      if (userDb) {
        if (userDb.email === email)
          res.json({ message: 'Email já cadastrado.' })
        else
          res.json({ message: 'Nome já cadastrado.' })
        return
      }

      const usedDbs = await User.findAll().map(p => p.database)
      if (usedDbs.length >= 6) {
        res.json({ message: 'Desculpe, não temos ambientes disponíveis. Tente mais tarde.' })
        return
      }

      const availableDb = databases.filter(p => usedDbs.indexOf(p) == -1)[0]

      let user = {
        name: req.body.name,
        email: req.body.email,
        token: sha1(req.body.password),
        password: req.body.password,
        userAccess: req.body.name + 'alpha',
        domain: req.body.domain,
        database: availableDb
      }

      let result = null
      const created = await User.create(user)
      result = await exec(`sudo useradd -m -d /home/${user.userAccess} -p $(openssl passwd -1 ${user.password}) ${user.userAccess}`, (err) => {
        if (err) {
          console.log(`Erro ao criar usuário ${user.userAccess}`)
          console.log(err)
        } else {
          console.log(`Usuário ${user.userAccess} criado com sucesso.`)
          const name = user.name[0].toUpperCase() + user.name.substring(1)
          const command = `sudo runuser -l ${user.userAccess} -c "sh /home/alpha/create.sh ${user.userAccess} ${name} ${user.email}"`
          exec(command, (err) => {
            if (err) {
              console.log(`Erro em create.sh para o usuário ${user.userAccess}`)
              console.log(command)
              console.log(err)
            } else {
              exec(`sudo sh /home/alpha/create-site.sh ${user.userAccess} ${user.domain}`, err => {
                if (err) {
                  console.log(`Erro em create-site.sh para o usuário ${user.userAccess}`)
                  console.log(err)
                }
              })
            }
          })
        }
      })

      result = await sequelize.query(`create user '${user.userAccess}'@'%' identified by '${user.password}'`)
      result = await sequelize.query(`create database ${user.database}`)
      result = await sequelize.query(`grant all privileges on ${user.database} . * to '${user.userAccess}'@'%'`)

      res.json(parseUser(created))
    } catch (ex) {
      console.log('Erro ao criar usuário')
      console.log(ex)
      res.json(ex)
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const userDb = await User.findOne({ where: { id: id } })
    let result
    try {
      if (userDb && userDb.userAccess) {
        result = await sequelize.query(`drop user '${userDb.userAccess}'@'%'`)
        result = await sequelize.query(`drop database ${userDb.database}`)

        const command = `sudo runuser -l ${userDb.userAccess} -c "sh /home/alpha/delete.sh ${userDb.userAccess}"`

        exec(command, (err) => {
          if (err) {
            console.log(`Erro no shell script para o usuário ${userDb.userAccess}`)
            console.log(err)
          } else {
            exec(`sudo pkill -u ${userDb.userAccess}`, (err) => {
              if (err) {
                console.log(`Não foi possível encerrar os processos do usuário ${userDb.userAccess}.`)
                console.log(err)
              }
              exec(`sudo userdel ${userDb.userAccess}`, (err) => {
                if (err) {
                  console.log(`Não foi possível remover o usuário ${userDb.userAccess} do sistema.`)
                  console.log(err)
                }
                exec(`sudo sh /home/alpha/delete-site.sh ${userDb.userAccess}`, (err) => {
                  if (err) {
                    console.log(`Erro em delete-site.sh para o usuário ${userDb.userAccess}`)
                    console.log(err)
                  }
                })
              })
            })
          }
        })

        result = await exec(`sudo rm -rf /home/${userDb.userAccess}`, err => {
          if (err) {
            console.log(`Não foi possível remover /home/${userDb.userAccess}`)
            console.log(err)
          }
        })
        result = await User.destroy({ where: { id: id } })
        res.json({ message: 'Removido com sucesso.' })
        console.log(`Usuário ${userDb.userAccess} removido com sucesso.`)
      } else {
        console.log(`Usuário não encontrato.`)
        res.json({ message: 'Usuário não encontrato.' })
      }

    } catch (ex) {
      console.log('Erro ao remover usuário')
      console.log(ex)
      res.json(JSON.stringify(ex))
    }
  }
}

export default new UserController()