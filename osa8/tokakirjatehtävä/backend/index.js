const { ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'development'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Book {
        title: String!
        published: Int!
        author: Author
        genres: [String!]!
        id: ID!
    }
    type Author {
        name : String!
        bookCount : Int!
        born : Int!
    }
    type Query {
        bookCount : Int!
        authorCount : Int!
        allAuthors : [Author!]!
        allBooks(author: String, genre: String): [Book!]
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String!   
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount : () => Book.collection.countDocuments(),
        authorCount : () => Author.collection.countDocuments(),
        allAuthors: async (root, args) => { return Author.find({}) },
        allBooks : async (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({})
            }
            /**
             * TODO: Add filter for authors
             */
            return Book.find({ genres: { $in: args.genre }});
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author : {
        name: async (root) => {
            const author = await Author.findOne(root)
            return author.name
        },
        bookCount: async (root) => {
            const author = await Author.findOne({ name : root.name })
            const books = await Book.find({ author })
            return books.length
        },
        born : async (root) => {
            const author = await Author.findOne(root)
            return author.born
        }
    },
    Mutation : {
        createUser: async (root, args) => {
            const user = new User({ ...args })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.author })
            const book = new Book({ ...args, author })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})