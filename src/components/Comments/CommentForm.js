import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ comment, handleChange, handleSubmit }) => (

  <Form id='comment-form'
    onSubmit={handleSubmit}>
    <Form.Group controlId='text'>
      <Form.Label className='auth'>Text:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Comment-Text"
        onChange={handleChange}
        value={comment.text}
        name='text'
        required
      />
    </Form.Group>
    <Button className='font' variant="dark" type="submit">
    Add Comment
    </Button>
  </Form>
)
export default CommentForm
