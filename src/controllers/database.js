import { sequelize, User } from '../db'

class DatabaseController {

  getAll(req, res) {
    return User.findAll().then(result => res.json(result))
      .catch(err => res.json(err))
  }

  async create(req, res) {
    try {
      const { name, password } = req.body || {}

      if (!/[a-zA-Z0-9]/.test(name))
        return res.json({ message: 'Nome de usuário inválido!' })

      if (!password)
        return res.json({ message: 'Senha inválida!' })

      const user = {
        name,
        password,
        dbName: name + '_db',
        domain: `${name}.hosting.com`
      }

      const result = await sequelize.query(`select count(1) from pg_user where usename = '${user.name}'`)
      if (result[0][0].count > 0)
        return res.json({ message: 'Nome de usuário já utilizado!' })

      await User.create(user)

      await sequelize.query(`CREATE USER ${user.name} WITH PASSWORD '${user.password}'`)

      await sequelize.query(`CREATE DATABASE ${user.dbName}
          WITH 
          OWNER = '${user.name}'
          ENCODING = 'UTF8'
          TABLESPACE = pg_default CONNECTION
          LIMIT = -1`)

      res.json({ message: 'Criado com sucesso!' })
    } catch (ex) {
      console.log(ex)
      res.json({ message: 'Erro ao criar usuário' })
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params || {}

      const user = await User.findOne({ where: { id: id || 0 } })
      if (!user)
        return res.json({ message: 'Usuário não localizado.' })

      await sequelize.query(`SELECT 
        pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${user.name}'
        AND pid <> pg_backend_pid()`)
      await sequelize.query(`drop database ${user.dbName}`)
      await sequelize.query(`drop user ${user.name}`)

      await User.destroy({ where: { id } })
      res.json({ message: 'Usuário removido com sucesso.' })
    } catch (ex) {
      console.log(ex)
      res.json({ message: 'Erro ao remover usuário' })
    }
  }
}

export default new DatabaseController()