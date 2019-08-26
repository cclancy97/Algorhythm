import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BookForm = ({ book, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Book Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Book Title"
        onChange={handleChange}
        value={book.title}
        name='title'
        required
      />
    </Form.Group>

    <Form.Group controlId="author">
      <Form.Label>Author</Form.Label>
      <Form.Control
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        name='author'
        required />
    </Form.Group>
    <Button variant="primary" type="submit">
    Submit
    </Button>
  </Form>

)
export default BookForm
