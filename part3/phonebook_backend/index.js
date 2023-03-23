require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
const person = require('./models/person')

const app = express()
const PORT = process.env.PORT


morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


// ROUTES
app.get('/api/info', (request, response, next) => {
    Person.estimatedDocumentCount()
        .then(result => response.send(`
            <p>Phonebook has info for ${result} people</p>
            <p>${new Date()}</p>
        `))
        .catch(e => next(e))
})
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(result => response.json(result))
        .catch(e => next(e))
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                next({name: 'NotFound'})
            }
        })
        .catch(e => next(e))
})
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number)
        next({name: 'MissingArgument'})

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(e => next(e))
})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(e => next(e))
})
app.post('/api/persons', (request, response, next) => {
    const name = request.body.name
    const number = request.body.number
    
    if (!name || !number)
        next({name: 'MissingArgument'})

    const person = new Person({
        name: name,
        number: number
    })

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(e => next(e))
})


// Error Middleware
const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError')
        return response.status(400).send({error: 'malformatted id'})

    if (error.name === 'NotFound')
        return response.status(404).send({error: 'person not found'})

    if (error.name === 'MissingArgument')
        return response.status(400).json({error: 'missing argument'})
    
    next(error)
}

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})