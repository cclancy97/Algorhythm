import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import ListGroup from 'react-bootstrap/ListGroup'

class Comments extends Component {
state = {
  comments: []
}

async componentDidMount () {
  try {
    const response = await axios(`${apiUrl}/comments`)
    this.setState({ comments: response.data.comments })
    console.log(response.data.comments)
  } catch (e) {
    console.error(e)
  }
}
render () {
  return (
    <h1>commments</h1>
  )
}
}

export default Comments
