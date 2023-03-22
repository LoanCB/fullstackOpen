require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT


morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


// ROUTES
app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(result => response.json(result))
        .catch(e => response.json({error: e}).status(500).end())
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    Person.findById(id)
        .then(person => response.json(person))
        .catch(e => response.json({error: e}).status(404).end())
})
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)

//     persons = persons.filter(person => person.id !== id)

//     response.status(204).end()
// })
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number)
        return response.status(400).json({error: 'name or number is missing'})

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => response.json(savedPerson))
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})