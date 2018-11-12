import React, { Component } from 'react';

class SendMessage extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentMessage: ''
    }
  }

  handleChange(e) {
    this.setState({currentMessage: e.target.value});
  }

  handleSubmit(currentMessage) {
    this.props.createMessage(currentMessage);
    this.setState({currentMessage: ''});
  }

  handleEnterKey(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(this.state.currentMessage);
    }
  }

  render() {
    return(
      <div>
        <input id='send-message' type='text' onChange={(e) => this.handleChange(e)} value={this.state.currentMessage} onKeyDown={(e) => this.handleEnterKey(e)}/>
        <button type='submit' onClick={() => this.handleSubmit(this.state.currentMessage)}>Send</button>
      </div>
    )
  }
}

export default SendMessage;
