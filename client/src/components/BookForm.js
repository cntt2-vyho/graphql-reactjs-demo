import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getAuthors, getBooks } from '../graphql-client/queries'
import { useQuery, useMutation } from '@apollo/client'
import { addSingleBook } from '../graphql-client/mutations';

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  })
  const { name, genre, authorId } = newBook
  const { loading, data } = useQuery(getAuthors)
  const [addBook, dataMutation] = useMutation(addSingleBook)

  const onInputChange = event => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    addBook({
			variables: { name, genre, authorId },
			refetchQueries: [{ query: getBooks }]
		})
    setNewBook({ name: '', genre: '', authorId: '' })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Book name</Form.Label>
        <Form.Control value={name} onChange={onInputChange} name="name" type="text" placeholder="Enter the book's name" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Book genre</Form.Label>
        <Form.Control value={genre} onChange={onInputChange} name="genre" type="text" placeholder="Enter the book's genre" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Book's author</Form.Label>
        {loading ?
          <p>Loading authors...</p>
          :
          <Form.Control
            as='select'
            name='authorId'
            onChange={onInputChange}
            value={authorId}
            required
          >
            <option value='' disabled>
              Select author
            </option>
            {data.authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        }
      </Form.Group>
      <Button className='float-right' variant='success' type='submit'>
        Add Book
      </Button>
    </Form>
  )
}

export default BookForm