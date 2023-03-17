const express = require('express')
const app = express()
const PORT = 3001

// DATAS
const persons = [
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


// ROUTES
app.get('/api/persons', (request, response) => response.json(persons))
app.get('/api/info', (request, response) => {
    currentDate = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate}</p>
    `)
})


app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})