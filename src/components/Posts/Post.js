import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Post extends Component {
state = {
  post: null,
  deleted: false,
  comments: []
}
async componentDidMount () {
  try {
    const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)
    console.log(response.data.post.comments)
    this.setState({
      post: response.data.post,
      comments: response.data.post.comments
    })
    console.log(this.state.comments)
  } catch (e) {
    console.error(e)
  }
}

 deletePost = () => {
   axios({
     method: 'DELETE',
     url: `${apiUrl}/posts/${this.props.match.params.id}`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     }
   })
     .then(() => {
       this.props.alert({
         heading: 'Sent To Russia!',
         message: '...I mean Deleted!',
         variant: 'danger'
       })
     })
     .then(() => this.setState({ deleted: true }))
     .catch(console.error)
 }

 addComment = () => {
   axios({
     method: 'POST',
     url: `${apiUrl}/comments`,
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: this.state.post.id
   })
 }

 render () {
   const { post, deleted } = this.state
   let postsJsx
   let updateAndDelete

   if (deleted) {
     return <Redirect to={
       {
         pathname: '/posts'
       }
     }/>
   } else if (post) {
     updateAndDelete =
      <Fragment>
        <br/>
        <Button className='edit' variant='light' href={`#posts/${post._id}/edit`}>Update</Button>
        <Button variant='danger' onClick={this.deletePost}>Delete</Button>
        <br/>
      </Fragment>
     // AddComment =
     //  <Fragment>
     //    <Button onClick={this.addComment}></Button>
     //  </Fragment>

     postsJsx =
      <div>
        { post && (
          <Fragment>
            <h1 className='auth'>Title:<strong> {post.title}</strong></h1>
            <h2 className='auth'>Body: {post.text}</h2>
            {(this.props.user && post) && this.props.user._id === post.owner
              ? updateAndDelete
              : ''
            }
          </Fragment>
        )}
      </div>
   } else {
     postsJsx = (
       'Loading....'
     )
   }
   const commentsJsx = this.state.comments.map(comment => (
     <li key={comment._id}><em>Comments: {comment.text}</em></li>
   ))
   return (
     <div>
       {postsJsx}
       {commentsJsx}
     </div>
   )
 }
}

export default withRouter(Post)
