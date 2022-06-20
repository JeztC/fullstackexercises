const express = require('express')
const app = express()
const cors = require('cors')

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
];

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', function (req, res) {
    res.send(persons);
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    if (persons.map(name => name.name).includes(body.name)) {
        return response.status(400).json(
            { error: 'Name must be unique' }
        )
    }

    const person = {
        name : body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})