import {gql} from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: ID!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            author
        }
    }
`

export const UPDATE_BIRTH_YEAR = gql`
    mutation editAuthor($name: String!, $setBornTo : Int!) {
        editAuthor(name : $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`