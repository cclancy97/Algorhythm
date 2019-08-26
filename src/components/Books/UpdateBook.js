import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from './BookForm'

class UpdateBook extends Component {
 state = {
   book: {
     title: '',
     author: ''
   }
 }
 componentDidMount () {
   axios(`${apiUrl}/books/${this.props.match.params.id}`)
     .then(res => this.setState({ book: res.data.book }))
     .catch(() => this.props.alert({
       heading: 'Error',
       message: 'Error Stupid!',
       variant: 'danger'
     }))
 }

 handleChange = event => {
   this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } })
 }
 handleSubmit = event => {
   event.preventDefault()
   axios({
     method: 'PATCH',
     url: `${apiUrl}/books/${this.state.book._id}`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: this.state
   })
     .then(response => {
       this.props.alert({
         heading: 'Success!',
         message: 'You updated a book!',
         variant: 'success'
       })
       this.props.history.push(`/books/${this.state.book._id}`)
     })
     .catch(console.error)
 }
 render () {
   if (!this.state.book) {
     return (
       <h1>Loading...</h1>
     )
   }
   return (
     <BookForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       book={this.state.book}
     />
   )
 }
}

export default withRouter(UpdateBook)
