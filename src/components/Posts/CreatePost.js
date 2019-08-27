import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './PostForm'

class CreatePost extends Component {
 state = {
   post: {
     title: '',
     text: ''
   }
 }
 handleChange = event => {
   this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value } })
 }
 handleSubmit = event => {
   event.preventDefault()
   axios({
     method: 'POST',
     url: `${apiUrl}/posts`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: this.state
   })
     .then(response => {
       console.log(response.data)
       this.props.alert({
         heading: 'Success!',
         message: 'You created a post!',
         variant: 'success'
       })
       this.props.history.push(`/posts/${response.data.post._id}`)
     })
     .catch(console.error)
 }
 render () {
   return (
     <PostForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       post={this.state.post}
     />
   )
 }
}
export default withRouter(CreatePost)
