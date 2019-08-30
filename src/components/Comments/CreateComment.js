import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from './CommentForm'

class CreateComment extends Component {
state = { comment: {
  text: '',
  post: this.props.post._id
}
}
handleChange= event => {
  this.setState({ comment: { ...this.state.comment, [event.target.name]: event.target.value } })
}
handleSubmit = event => {
  this.setState({ comment: { text: '' } })
  event.preventDefault()
  axios({
    method: 'POST',
    url: `${apiUrl}/comments`,
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: this.state
  })
    .then(response => {
      this.props.alert({
        heading: 'Success!',
        message: ' Woo-hoo you made a comment...what do you want? A cookie?',
        variant: 'success'
      })
      this.props.history.push(`/posts/${response.data.comment.post}`)
      this.props.onCreate(response)
    })
    .catch(error => {
      this.props.alert({
        heading: 'Error!',
        message: { error },
        variant: 'danger'
      })
    })
}

render () {
  return (
    <CommentForm
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      comment={this.state.comment}
    />
  )
}
}
export default withRouter(CreateComment)
