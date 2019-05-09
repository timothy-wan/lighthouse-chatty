/* eslint-disable no-console */
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colour: '',
      currentUser: 'Anonymous',
      messages: [],
      userCount: ''
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001', 'procotol');
  }
  changeUserName(name) {
    this.setState({
      currentUser: name
    })
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
    this.socket.onopen = () => {
    }
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if(data.type === 'usersConnected') {
        this.setState({ userCount: data.content })
      } else if(data.type === 'userColour') {
        this.setState({colour: data.colour});
      }else {
        this.addNewMessage(data);
      }

    }
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return (
      <>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} colour={this.state.colour}/>
        <ChatBar 
          user={this.state.currentUser} 
          sendMessage={this.sendMessage}
          changeUserName={this.changeUserName}
          colour={this.state.colour}/>
      </>   
    )
  }
}
export default App;
