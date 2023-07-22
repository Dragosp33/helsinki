require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
// const person = require('./models/Person');
const Person = require('./models/Person')

app.use(cors())
app.use(express.static('build'))


morgan.token('continut', function getcontinut(req) {
  return JSON.stringify(req.body)
})


const morgan2 = morgan(':continut :method :url :response-time', {
  skip: function(req, res) {
    return req.method !== 'POST'
  },
})

app.use(express.json())

app.use(morgan2)


let persons = []
Person.find().then((response) => {
  persons = response
}).catch((error) => next(error))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find().then((result) => {
    console.log(result)
    persons = result
    response.json(result)
  })
  // response.json(persons);
})


app.get('/api/info', (request, response) => {
  Person.find().then((result) => {
    const len = result.length
    const date = new Date()
    const page = `<p> Page has info for ${len} persons </p>
                <p> ${date}</p>`
    response.send(page)
  }).catch((error) => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.statusMessage = `person with id 
      ${request.params.id} doesn't exist `
      response.status(404).end()
    }
  })
    .catch((error) => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.statusMessage = `Person with id ${id} deleted.`
    persons = persons.filter((n) => n.id !== id)
    response.status(204).end()
  } else {
    response.statusMessage = `Person with id ${id} has already
    been deleted or it does not exist.`
    response.status(204).end()
  }
} )

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  if (person.name && person.number) {
    const name = person.name
    console.log(`person in request: ${person}, ${typeof name}`)
    console.log(`person name: ${name}`)
    const same = persons.find((person2) => person2.name === name)
    console.log(`same person: ${same}`)
    const newperson = new Person({

      name: person.name,
      number: person.number,
    })


    newperson.save().then((savedperson) => {
      console.log(`saved person: ${person.name}`)
      persons = persons.concat(newperson)
      response.json(savedperson)
    }).catch((error) => {
      console.log(`addperson error in backend: ${error}`)
      next(error)
    })
  } else {
    return response.status(400).json({
      error: 'content missing; Person should have a name and a number.',
    })
  }
})


app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  const id = request.params.id
  const newperson = {
    name: person.name,
    number: person.number,
  }
  Person.findByIdAndUpdate(id, newperson,
    { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => {
      console.log('eroare: ', error)
      console.log(response.statusMessage)
      next(error)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
