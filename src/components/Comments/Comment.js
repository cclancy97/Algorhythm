import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Comment = ({ comment, user, handleDelete, commentOwner, updateState }) => {
  const deleteButton = <Fragment>
    <Button variant='danger' onClick={() => { handleDelete(comment._id) }}>Delete Comment</Button>
  </Fragment>
  const commentJsx =
<Fragment>
  <p className='font'>{comment.text}</p>
  <Fragment>
    {(user && comment) && user._id === comment.owner
      ? deleteButton
      : ''
    }
  </Fragment>
</Fragment>

  return commentJsx
}

export default withRouter(Comment)
