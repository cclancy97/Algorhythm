import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PostForm = ({ post, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label className='auth'>Title:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Post Title"
        onChange={handleChange}
        value={post.title}
        name='title'
        required
      />
    </Form.Group>

    <Form.Group controlId="text">
      <Form.Label className='auth'>Text:</Form.Label>
      <Form.Control
        as="textarea"
        type="text"
        placeholder="Post Body"
        value={post.text}
        onChange={handleChange}
        name='text'
        required />
    </Form.Group>

    <Button className='font' variant="light" type="submit">
    Submit
    </Button>
  </Form>

)
export default PostForm
