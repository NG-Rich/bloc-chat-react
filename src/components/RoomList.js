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

  render() {
    return(
      <section className='roomlist'>
        <section>
          <ul>
            {this.state.rooms.map(room =>
              <li key={room.key}>{room.name}</li>
            )}
          </ul>
        </section>
        <button onClick={() => this.handleRoomCreate()}>
          Create Room
        </button>

      </section>
    );
  }
}

export default RoomList;
