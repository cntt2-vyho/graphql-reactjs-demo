import React from 'react'
import Card from 'react-bootstrap/Card'
import { useQuery } from '@apollo/client';
import { getBookById } from '../graphql-client/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookById, {
    variables: {
      id: bookId
    },
    skip: bookId === ''
  })

  if (loading) return <p>Loading book details...</p>
  if (error) {
    return <p>Error loading book details!</p>
  }

  const book = bookId !== '' ? data.book : null

  return (
    <Card bg='success' text="light">
      <Card.Body>
        {
          book === null ?
            <Card.Text>Please select a book</Card.Text>
            :
            <>
              <Card.Title>{book.name}</Card.Title>
              <Card.Text>Genre: {book.genre}</Card.Text>
              <Card.Text>Author: {book.author.name}</Card.Text>
              <Card.Text>Age: {book.author.age}</Card.Text>
              <ul>
                {
                  book.author.books.map((book, key) => <li key={key}>{book.name} - {book.genre}</li>)
                }
              </ul>
            </>
        }
      </Card.Body>
    </Card>
  )
}

export default BookDetails