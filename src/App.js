import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: ''
    };
  }

  handleActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
