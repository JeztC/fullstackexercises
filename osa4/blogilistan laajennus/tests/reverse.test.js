const reverse = require('../utils/for_testing').reverse
const average = require('../utils/for_testing').average

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})


describe('most likes', () => {
    const blogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 13
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[1]);
    })
})

describe('most blogs author', () => {
    const blogs = [
        {
            author: "Robert C. Martin",
            blog: "Blog",
        },
        {
            author: "Robert C. Martin",
            blog: "Blog",
        },
        {
            author: "Robert C. Martin",
            blog: "Blog",
        },
        {
            author: "Robert D. Martin",
            blog: "Blog",
        }
    ]
    test('when a list has only one author equals the likes of that', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual([ 'Robert C. Martin', 3 ])
    });
});
