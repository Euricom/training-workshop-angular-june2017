const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const _ = require('underscore')

const seed = require('./seed')

// app setup
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//
// setup users
//
let users = [
  { id: 1, firstName: 'john', latName: 'bar', email: 'john.bar@noreply.com' },
  { id: 2, firstName: 'jane', latName: 'zoe', email: 'jane.zoer@noreply.com' },
]
const numberOfUsersToCreate = 10
users = seed.generateUsers(numberOfUsersToCreate)

//
// routes
//

app.get('/api/tasks', (req, res) => {
  res.send([
    { id: 1, desc: 'Drink coffee', completed: true},
    { id: 2, desc: 'Write code', completed: false},
    { id: 3, desc: 'Document work', completed: false}
  ])
})

// GET /api/users
// GET /api/users?page=0&pageSize=10
app.get('/api/users', (req, res) => {
  const page = req.query.page || 0
  const pageSize = req.query.pageSize || 20
  console.log('page:', page)
  console.log('pageSize:', pageSize)

  const userSet = _.chain(users).rest(page * pageSize).first(pageSize).value()
  // return all resource
  res.send({
    total: userSet.length,
    users: userSet,
  })
})

// GET /api/users/12
app.get('/api/users/:id', (req, res) => {
  // find user
  const user = _.findWhere(users, { id: +req.params.id })
  if (!user) {
    return res.send(404, 'not found')
  }

  // return resource
  return res.send(user)
})

/* POST /api/users
{
  "firstName": "peter",
  "lastName": "cosemans",
  "age": 52,
  "email": "peter.cosemans@gmail.com",
  "role": "admin"
}
*/
app.post('/api/users', (req, res) => {
  // Get resource
  const resource = req.body
  console.log('post', req.body)

  // Assign number
  resource.id = new Date().valueOf()

  // Add to users's
  users.push(resource)

  // return resource
  res.status(200).send(resource)
})

/* PUT /api/users/12
{
  "firstName": "peter",
  "lastName": "cosemans",
  "age": 52,
  "email": "peter.cosemans@gmail.com",
  "role": "admin"
}
*/
app.put('/api/users/:id', (req, res) => {
  // Get resource
  const resource = req.body
  console.log('put', req.body)

  // Find and update
  const user = _.findWhere(users, { id: Number(req.params.id) })
  if (!user) {
    return res.send(404, 'not found')
  }

  user.firstName = resource.firstName
  user.lastName = resource.lastName
  user.email = resource.email
  user.age = Number(resource.age)
  user.company = resource.company
  if (resource.address) {
    user.address = {}
    user.address.zip = resource.address.zip
    user.address.city = resource.address.city
    user.address.street = resource.address.street
  }
  return res.status(200).send(user)
})

// DELETE /api/users/12
app.delete('/api/users/:id', (req, res) => {
  const user = _.findWhere(users, { id: Number(req.params.id) })
  if (!user) {
    return res.status(204)
  }

  users = _.without(users, user)
  return res.status(200).send(user)
})

//
// listen for requests
//
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Express server listening on port: http://localhost:${server.address().port}/api/users`)
})
