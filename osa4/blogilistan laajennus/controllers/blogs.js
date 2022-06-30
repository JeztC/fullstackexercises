const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        console.log(request.token)
        response.status(204).end()
    } else {
        response.status(400).json({
            error: 'Invalid token'
        })
    }
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.content,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    if (request.token === undefined) {
        return response.status(401).json({
            error: 'Unauthorized'
        });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes : body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    if (blog.title === undefined && blog.url === undefined) {
        return response.status(400).json({
            error: 'Bad Request'
        });
    }

    const savedNote = await blog.save();
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
})

module.exports = blogsRouter