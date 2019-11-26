export const createUserValidation = user => {
  const { name, email, password, domain } = user || {}

  if (!name || !/^[a-zA-Z0-9_]{0,20}$/.test(name))
    throw { message: 'Nome inválido.' }

  if (!email || !/[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}/.test(email))
    throw { message: 'Email inválido.' }

  if (!domain || !/^[a-zA-Z0-9]{3,10}\.[a-zA-Z0-9]{2,5}$/.test(domain))
    throw { message: 'Domínio inválido.' }

  if (!password || password.length < 4)
    throw { message: 'Informe uma senha de no mínimo 4 dígitos.' }
}