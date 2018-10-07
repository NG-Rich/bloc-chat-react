import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
  apiKey: "AIzaSyDRrM8ToyMeg8sXnj54WMqOJdENJNcS_W4",
  authDomain: "bloc-chat-21134.firebaseapp.com",
  databaseURL: "https://bloc-chat-21134.firebaseio.com",
  projectId: "bloc-chat-21134",
  storageBucket: "bloc-chat-21134.appspot.com",
  messagingSenderId: "209952676396"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: 'Guest'
    };
  }

  handleActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

//change section with className=column to style column float left maybe?
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <section>
          <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
          <RoomList firebase={firebase} handleActiveRoom={this.handleActiveRoom.bind(this)}/>
        </section>
        <section>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
        </section>
      </div>
    );
  }
}

export default App;
