import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from './BookForm'

class CreateBook extends Component {
 state = {
   book: {
     title: '',
     author: ''
   }
 }

 handleChange = event => {
   this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } })
 }
 handleSubmit = event => {
   event.preventDefault()
   axios({
     method: 'POST',
     url: `${apiUrl}/books`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: this.state
   })
     .then(response => {
       this.props.alert({
         heading: 'Success!',
         message: 'You created a book!',
         variant: 'success'
       })
       this.props.history.push(`/books/${response.data.book._id}`)
     })
     .catch(console.error)
 }
 render () {
   return (
     <BookForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       book={this.state.book}
     />
   )
 }
}

export default withRouter(CreateBook)
