import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
  }

  handleRoomCreate() {
    let newRoom = prompt('Please enter room name:');

    if (newRoom == null || newRoom == '') {
      alert('Room canceled');
    }else {
      this.createRoom(newRoom);
    }
  }

  handleMessageDisplay() {
    //this.messageDisplay = this.props.firebase.database().ref('messages').orderByChild('roomId')
    //DELETE THIS MAYBE
    console.log('hello');
  }


//RETURN this.RoomRef = this.props.firebase.database().ref('messages').equalTo('room1') or roomId when clicking on the room
  render() {
    return(
      <section className='roomlist'>
        <button onClick={() => this.handleRoomCreate()}>
          Create Room
        </button>
        <section>
          <ul>
            {this.state.rooms.map(room =>
              <li key={room.key} onClick={() => this.props.handleActiveRoom(room)}>{room.name/*add an onclick here*/}</li>
            )}
          </ul>
        </section>
        <section>

        </section>

      </section>
    );
  }
}

export default RoomList;
