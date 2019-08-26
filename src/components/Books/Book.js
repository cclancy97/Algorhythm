import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Book extends Component {
 state= {
   book: null
 }
 async componentDidMount () {
   try {
     const response = await axios(`${apiUrl}/books/${this.props.match.params.id}`)
     this.setState({
       book: response.data.book
     })
   } catch (e) {
     console.error(e)
   }
 }
 render () {
   const { book } = this.state
   return (
     <div>
       { book && (
         <Fragment>
           <h1>{book.title}</h1>
           <h2>{book.author}</h2>
           {(this.props.user && book) && this.props.user._id === book.owner} {
             <Button href={`#books/${book._id}/edit`}>Edit Book</Button>
           }
         </Fragment>
       )
       }
     </div>
   )
 }
}

export default withRouter(Book)
