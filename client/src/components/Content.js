import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BookList from './BookList';
import BookDetails from './BookDetails';
import { useState } from 'react';

const Content = () => {
  const [bookSelected, setBookSelected] = useState('')
 
  return (
    <Row>
      <Col xs={8}>
        <BookList setBookSelected={setBookSelected} />
      </Col>
      <Col xs={4}>
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  )
}

export default Content;