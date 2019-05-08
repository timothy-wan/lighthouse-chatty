/* eslint-disable no-console */
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      userCount: ''
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.changeUserCount = this.changeUserCount.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = new WebSocket('ws://192.168.88.45:3001', 'procotol');
  }
  changeUserName(name) {
    this.setState({
      currentUser: name
    })
  }
  changeUserCount(content) {
    this.setState({ userCount: content })
  }
  addNewMessage(message) {
    const oldMessages = this.state.messages;
    const newMessage = [...oldMessages, message];
    this.setState({ messages: newMessage});
  }
  sendMessage(message) {
    if(this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
    // in App.jsx
  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
      if(data.type === 'usersConnected') {
        this.changeUserCount(data.content);
      } else {
        this.addNewMessage(JSON.parse(event.data));
      }

    }
  }

  render() {
    return (
      <>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          user={this.state.currentUser} 
          sendMessage={this.sendMessage}
          changeUserName={this.changeUserName}/>
      </>   
    )
  }
}
export default App;
