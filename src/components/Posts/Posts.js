import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
// import Spinner from 'react-bootstrap/Spinner'

class Posts extends Component {
state = {
  posts: [],
  isLoading: true
}

async componentDidMount () {
  try {
    const response = await axios(`${apiUrl}/posts`)
    this.setState({ posts: response.data.posts, isLoading: false })
    console.log(response.data.posts)
  } catch (e) {
    console.error(e)
  }
}

render () {
  const postsJsx = this.state.posts.map(post => (
    <ListGroup.Item key={post._id}>
      <Link to={`/posts/${post._id}`}>{post.title}</Link></ListGroup.Item>
  ))
  return (
    <ListGroup>
      <ListGroup.Item>{this.state.posts.length && postsJsx}</ListGroup.Item>
    </ListGroup>
  )
}
}

export default Posts
