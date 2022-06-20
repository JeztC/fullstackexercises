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
        .catch(error => next(error))
})

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

app.get('/api/persons/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.get('/info/', (req, res) => {
    Note.find().count(function (err, count) {
        if (err) console.log("Error while getting phone numbers count")
        res.send(`<l3>Phonebook has info for ${count} people <br><br>${new Date()}</l3>`)
    });
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})