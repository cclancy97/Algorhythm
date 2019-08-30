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
  } catch (e) {
    console.error(e)
  }
}

render () {
  let postsJsx
  if (this.state.posts.length === 0) {
    postsJsx = (
      <ListGroup.Item className="text-center list">No posts 😔 Get To Posting! </ListGroup.Item>
    )
  } else {
    postsJsx = this.state.posts.map(post => (
      <ListGroup.Item className='text-center list' key={post._id}>
        <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2></ListGroup.Item>
    ))
  }
  return (
    <ListGroup>
      { postsJsx }
    </ListGroup>
  )
}
}

export default Posts
