const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const express = require('express')
const http = require('http')
const _ = require('lodash');

require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'development'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

const mongoose = require('mongoose')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const typeDefs = require('./types/schema')
const resolvers = require('./types/resolvers')
const DataLoader = require("dataloader");

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connection to MongoDB:', error.message)
    })


const countBooks = async (books) => {
    return Book.find({author: {$in: books}}).then(beds => {
        const bedsById = _.countBy(beds, "author")
        return books.map(bedId => bedsById[bedId] === undefined ? 0 : bedsById[bedId])
    });
};

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: '',
        }
    )

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            const dataLoader = new DataLoader(keys => countBooks(keys))
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser, dataLoader }
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

// call the function that does the setup and starts the server
start()