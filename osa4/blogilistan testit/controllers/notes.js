const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/:id', async (request, response) => {
    const note = await Blog.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

notesRouter.get('/', async (request, response) => {
    const notes = await Blog.find({})
    response.json(notes)
    console.log(notes)
})

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes : body.likes === undefined ? 0 : body.likes
    })

    if (blog.title === undefined && blog.url === undefined) {
        return response.status(400).json({
            error: 'Bad Request'
        })
    }

    const savedNote = await blog.save();
    response.status(201).json(savedNote)
})

module.exports = notesRouter