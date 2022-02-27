import { gql } from '@apollo/client'

const getBooks = gql`
  query getBooksQuery {
    books {
      id
      name
      genre
    }
  }
`
const getBookById = gql`
  query getSingleBook ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`

const getAuthors = gql`
  query getAuthorQuery {
    authors {
      id
      name
    }
  }
`

export { getBooks, getBookById, getAuthors }