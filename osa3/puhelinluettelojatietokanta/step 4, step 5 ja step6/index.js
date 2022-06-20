const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Note = require('./src/models/note')
app.use(express.json());

app.use(cors())

app.get('/api/persons', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({error: 'Name missing'})
    }

    if (!body.number) {
        return response.status(400).json({error: 'Number missing'})
    }

    const note = new Note({
        name : body.name,
        number: body.number,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => errorHandler(error, request, response, next))
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const note = {
        name: body.name,
        number: body.number,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => errorHandler(error, request, response, next))
})

app.get('/info/', (req, res, next) => {
    Note.find().count(function (err, count) {
        if (err) errorHandler(err, req, res, next)
        res.send(`<l3>Phonebook has info for ${count} people <br><br>${new Date()}</l3>`)
    });
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})