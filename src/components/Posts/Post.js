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
        <Button href={`#posts/${post._id}/edit`}>Update This Post</Button>
        <Button onClick={this.deletePost}>Delete This Post</Button>
      </Fragment>

     postsJsx =
      <div>
        { post && (
          <Fragment>
            <h1>{post.title}</h1>
            <h2>{post.text}</h2>
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
     <li key={comment._id}>{comment.text}</li>
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
