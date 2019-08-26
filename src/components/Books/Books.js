import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
class Books extends Component {
  constructor () {
    super()
    this.state = {
      books: [],
      isLoading: true
    }
  }
  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/books`)
      setTimeout(() => this.setState({ books: response.data.books, isLoading: false }), 1000)
    } catch (e) {
      console.error(e)
    }
  }
  render () {
    const booksJsx = this.state.books.map(book => (
      <ListGroup.Item key={book._id}>
        <Link to={`/books/${book._id}`}>{book.title}</Link>
      </ListGroup.Item>
    ))
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
    return (
      <ListGroup>
        <ListGroup.Item>{this.state.books.length && booksJsx}</ListGroup.Item>
      </ListGroup>
    )
  }
}

export default Books
