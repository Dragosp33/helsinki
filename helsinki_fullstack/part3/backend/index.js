const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))





morgan.token('continut', function getcontinut (req) {
    return JSON.stringify(req.body);
  })


  var morgan2 = morgan(':continut :method :url :response-time', {
    skip: function (req, res) { return req.method !== 'POST' }
  })

app.use(express.json())

app.use(morgan2);
/*('combined'), {
    skip: function (req, res) { return req.method === 'POST' }});
*/

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})


app.get('/api/info', (request, response) => {
    let len = persons.length;
    let date = new Date();
    let page = `<p> Page has info for ${len} persons </p>
                <p> ${date}</p>`;
    response.send(page);

})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.statusMessage = `Person with id ${id} doesn't exist on server.`
      response.status(404).end()
    }

})


app.delete('/api/persons/:id', (request, response) =>{   
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.statusMessage = `Person with id ${id} deleted.`
        persons = persons.filter(n => n.id !== id)
        response.status(204).end()
    }
    else {
        response.statusMessage = `Person with id ${id} has already been deleted or it does not exist.`
        response.status(204).end()
    }
} )

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (person.name && person.number) {
        const name = person.name
        console.log(`person in request: ${person}, ${typeof name}`)
        console.log(`person name: ${name}`)
        const same = persons.find(person2 => person2.name === name)
        console.log(`same person: ${same}`);
        if (same){
            return response.status(400).json({ 
                error: `Person with name ${person.name} exists already.` 
              })
        }   
        const id = getRandomIntInclusive(50, 10000000)
        const newperson = {id:id , ...person}
        persons = persons.concat(newperson)
        response.json(newperson) 
    }
    else {
        return response.status(400).json({ 
            error: 'content missing; Person should have a name and a number.' 
          })
    }
  })



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })