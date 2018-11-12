import React, { Component } from 'react';
import SendMessage from './SendMessage';
import moment from 'moment';

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

  createMessage(newMsg) {
    this.messagesRef.push({
      content: newMsg, roomId: this.props.activeRoom.key, sentAt: moment(Date(this.props.firebase.database.ServerValue.TIMESTAMP)).format("hh:mm a"), username: this.props.user
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
        {this.props.activeRoom === '' ? '' : <SendMessage user={this.props.user} createMessage={this.createMessage.bind(this)}/>}
      </div>
    );
  }
}

export default MessageList;
