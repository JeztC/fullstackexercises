const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are enough blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('The id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
});

test('can add blogs', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blog = {
        title: "Blog",
        author: "Author",
        url: "https://www.blogger.com/about/",
        likes: 500
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(blogsAtStart.length + 1)
});

test('check likes', async () => {
    const blog = {
        title: "TestBlog",
        author: "Author",
        url: "https://www.blogger.com/about/",
    }

    await api
        .post('/api/blogs')
        .send(blog)

    const request = await api.get('/api/blogs')
    const contents = request.body.find(r => r.title === blog.title && r.author === blog.author && r.url === blog.url)
    expect(contents['likes']).toEqual(0)
});

test('contains title and url', async () => {
    const blog = {
        author: "Author",
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
});

afterAll(() => {
    mongoose.connection.close()
})