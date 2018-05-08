// axios.post('/api/user', { id: 3, name: 'fulano', password: '123qwe' })
//   .then(r => console.log(r))
//   .catch(err => console.log(err))

axios.get('/api/user')
  .then(r => console.log(r))
  .catch(err => console.log(err))