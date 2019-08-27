import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Post extends Component {
state = {
  post: null,
  comments: []
}
async componentDidMount () {
  try {
    const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)
    console.log(response.data.post.comments)
    this.setState({
      post: response.data.post,
      comments: response.data.post.comments
    })
    console.log(this.state.comments)
  } catch (e) {
    console.error(e)
  }
}

render () {
  const commentsJsx = this.state.comments.map(comment => (
    <li key={comment._id}>{comment.text}</li>
  ))
  const { post } = this.state
  return (
    <div>
      { post && (
        <div>
          <h1><strong>{this.state.post.title}</strong></h1>
          <h2>{this.state.post.text}</h2>
          <h3>Comments:{ commentsJsx }</h3>
          {(this.props.user && post) && this.props.user._id === post.owner} {
            <Button href={`#posts/${post._id}/edit`}>Edit Post</Button>
          }
        </div>
      )}
    </div>
  )
}
}

export default withRouter(Post)
