import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'

import Comment from './Comment'
import CreateComment from './CreateComment'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onCreate = () => {
    this.props.updatePostState()
  }
  handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.alert({
          heading: 'Uploaded to Facebook!',
          message: '...I mean Deleted! -NotMarkZuck',
          variant: 'success'
        })
        this.props.updatePostState()
      })
      .catch(() => {
        this.props.alert({
          heading: 'Error!',
          message: 'Not Deleted',
          variant: 'danger'
        })
      })
  }
  render () {
    const comments = this.props.post.comments
    let commentsJsx
    if (comments.length === 0) {
      commentsJsx = (
        <ListGroup.Item className='text-center list font'>No Comments😔 ...What are you waiting for?</ListGroup.Item>
      )
    } else {
      commentsJsx = comments.map(comment => (
        <ListGroup.Item className='text-center list' key={comment._id}>
          <Comment comment={comment} user={this.props.user} post={this.props.post}
            alert={this.props.alert}
            handleDelete={this.handleDelete}
          />
        </ListGroup.Item>
      ))
    }
    return (
      <ListGroup>
        { this.props.user &&
        <ListGroup.Item>
          <CreateComment
            post={this.props.post}
            user={this.props.user}
            alert={this.props.alert}
            onCreate={this.onCreate}
          />
        </ListGroup.Item>
        }
        <ListGroup.Item><h3>Comments:{commentsJsx}</h3></ListGroup.Item>
      </ListGroup>
    )
  }
}

export default Comments
