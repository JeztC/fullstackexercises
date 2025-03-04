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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

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

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter