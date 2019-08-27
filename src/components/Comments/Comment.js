import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
// import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Comment extends Component {
state = {
  comment: null
}
async componentDidMount () {
  try {
    const response = await axios(`${apiUrl}/comments/${this.props.match.params.id}`)
    console.log(response.data)
    console.log(this.props)
    this.setState({
      comment: response.data.comment
    })
  } catch (e) {
    console.error(e)
  }
}
render () {
  const { comment } = this.state
  return (
    <div>
      {comment && (
        <div>
          <h1><strong>{comment.text}</strong></h1>
          <h2>{comment.post}</h2>
        </div>
      )}
    </div>
  )
}
}

export default withRouter(Comment)
