import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'
import Comments from '../Comments/Comments'

class Post extends Component {
state = {
  post: null,
  deleted: false,
  commentsUpdated: false
}
 updatePost = () => this.setState({ commentsUpdated: true })

 async componentDidMount () {
   try {
     const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)
     this.setState({
       post: response.data.post
     })
   } catch (e) {
     this.props.alert({
       heading: 'Error!',
       message: { e },
       variant: 'danger'
     })
   }
 }
 async componentDidUpdate () {
   if (this.state.commentsUpdated) {
     try {
       const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)
       this.setState({ post: response.data.post })
       this.setState({ commentsUpdated: false })
     } catch (e) {
       this.props.alert({
         heading: 'Error!',
         message: { e },
         variant: 'danger'
       })
     }
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
     .catch(error => {
       this.props.alert({
         heading: 'Error!',
         message: { error },
         variant: 'danger'
       })
     })
 }

 render () {
   const { post, deleted } = this.state
   let postsJsx
   let updateAndDelete

   if (deleted) {
     return <Redirect to='/posts'/>
   } else if (post) {
     updateAndDelete =
      <Fragment>
        <hr/>
        <Button className='edit' variant='light' href={`#posts/${post._id}/edit`}>Update Post</Button>
        <hr/>
        <Button variant='danger' onClick={this.deletePost}>Delete Post</Button>
        <hr/>
      </Fragment>

     postsJsx =
      <div>
        { post && (
          <div>
            <h1 className='auth'>Title:<strong className='font'> {post.title}</strong></h1>
            <h3 className='auth'>Body: {post.text}</h3>
            {(this.props.user && post) && this.props.user._id === post.owner
              ? updateAndDelete
              : ''
            }
            <br/>
            <Comments
              user={this.props.user}
              post={post}
              updatePostState={this.updatePost}
              alert={this.props.alert}
            />
          </div>
        )}
      </div>
   } else {
     postsJsx = (
       <h1 className='auth'>Loading....</h1>
     )
   }
   return (
     <div>
       {postsJsx}
     </div>
   )
 }
}

export default withRouter(Post)
