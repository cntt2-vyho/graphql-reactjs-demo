import React from 'react'
import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';

const BookList = ({ setBookSelected }) => {

  const { loading, error, data } = useQuery(getBooks)

  if (loading) return <p>Loading book ...</p>
  if (error) return <p>Error for loading book ...</p>  

  return (
    <Row className="g-3">
      {data.books.map((book, key) => (
        <Col xs={4} key={key}>
          <Card
            border='success'
            text='black'
            className='text-center'
            key={book.id}
            onClick={setBookSelected.bind(this, book.id)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>{book.name}</Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default BookList