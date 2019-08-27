import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './PostForm'

class UpdatePost extends Component {
 state = {
   post: {
     title: '',
     text: ''
   }
 }
 componentDidMount () {
   axios(`${apiUrl}/posts/${this.props.match.params.id}`)
     .then(res => this.setState({ post: res.data.post }))
     .catch(() => this.props.alert({
       heading: 'Error',
       message: 'Error Stupid!',
       variant: 'danger'
     }))
 }

 handleChange = event => {
   this.setState({ post: { ...this.state.post, [event.target.name]: event.target.value } })
 }
 handleSubmit = event => {
   event.preventDefault()
   axios({
     method: 'PATCH',
     url: `${apiUrl}/posts/${this.state.post._id}`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: this.state
   })
     .then(response => {
       this.props.alert({
         heading: 'Success!',
         message: 'You updated a post!',
         variant: 'success'
       })
       this.props.history.push(`/posts/${this.state.post._id}`)
     })
     .catch(console.error)
 }
 render () {
   if (!this.state.post) {
     return (
       <h1>Loading...</h1>
     )
   }
   return (
     <PostForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       post={this.state.post}
     />
   )
 }
}

export default withRouter(UpdatePost)
