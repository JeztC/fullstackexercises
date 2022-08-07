const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");
const {UserInputError, AuthenticationError} = require("apollo-server");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        bookCount: async (root, args, context) => {
            return await context.dataLoader.load(root.id);
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

            pubsub.publish('BOOK_ADDED', {bookAdded : book})
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
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

module.exports = resolvers