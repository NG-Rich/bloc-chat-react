import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  render() {
    return(
      <div id='message-list'>
        <h3>{this.props.activeRoom.name}</h3>
        {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map(message =>
          <div key={message.key}>
            <h4>{message.username}</h4>
            <p><span style={{fontSize: 15}}>{message.sentAt} - {message.content}</span></p>
          </div>
        )}
      </div>
    );
  }
}

export default MessageList;
