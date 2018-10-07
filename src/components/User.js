import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user.displayName);
    })
  }

  handleSignIn() {
    const provider =  new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
    this.props.setUser('Guest');
  }

  render() {
    return(
      <section className='user'>
        <div>
          Current User: {this.props.user}
        </div>
        <div>
          <button onClick={() => this.handleSignIn()}>Sign In</button>
          <button onClick={() => this.handleSignOut()}>Sign Out</button>
        </div>
      </section>
    );
  }
}

export default User;
