import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addSingleAuthor } from '../graphql-client/mutations'
import { getAuthors } from '../graphql-client/queries'
import { useMutation } from '@apollo/client'

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    age: ''
  })
  const { name, age } = newAuthor
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor)

  const onInputChange = event => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    addAuthor({
      variables: { name, age: parseInt(age)},
      refetchQueries: [{ query: getAuthors }]
    })
    setNewAuthor({ name: '', age: '' })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Author name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the author's name"
          name="name"
          value={name}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the author's age"
          onChange={onInputChange}
          value={age}
          name="age"
          required
        />
      </Form.Group>
      <Button className='float-right' variant='primary' type='submit'>
        Add Author
      </Button>
    </Form>
  )
}

export default AuthorForm