const {gql} = require("apollo-server");

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
    type Subscription {
        bookAdded: Book!
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

module.exports = typeDefs