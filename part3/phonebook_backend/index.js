const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = 3001


morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.json())
app.use(cors())

// DATAS
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

const generatedId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}


// ROUTES
app.get('/api/persons', (request, response) => response.json(persons))
app.get('/api/info', (request, response) => {
    currentDate = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate}</p>
    `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number)
        return response.status(400).json({error: 'name or number is missing'})

    if (persons.find(person => person.name === body.name))
        return response.status(400).json({error: 'name already used'})
    
    const person = {
        id: generatedId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})