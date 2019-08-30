import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Posts from '../Posts/Posts'
import Post from '../Posts/Post'
import CreatePost from '../Posts/CreatePost'
import UpdatePost from '../Posts/UpdatePost'
import Comment from '../Comments/Comment'
import CreateComment from '../Comments/CreateComment'
import MusicPlayer from '../Music/MusicPlayer'
import playlist from '../playlist'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/' component={Posts} />
          <Route exact path='/music' render={() => (
            <div className='player'>
              <MusicPlayer playlist={playlist}
                mode='vertical'/></div>
          )} />
          <AuthenticatedRoute exact path='/createcomment'user= {user} render={() => (
            <CreateComment user={user} alert={this.alert} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route
            exact path='/posts/:id'
            user={user}
            render={() => (
              <Post
                user={user}
                alert={this.alert}
              />
            )}
          />
          <Route
            exact path='/comments/:id'
            user={user}
            render={() => (
              <Comment
                user={user}
              />
            )}
          />
          <AuthenticatedRoute user={user} path='/createpost' render={() => (
            <CreatePost user={user} alert={this.alert} />
          )} />
          <AuthenticatedRoute
            user={user}
            exact
            path="/posts/:id/edit"
            render={() => (
              <UpdatePost
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
