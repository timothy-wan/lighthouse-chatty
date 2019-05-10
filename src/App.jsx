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
      typing: '',
      isTyping: false,
      userCount: ''
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001', 'procotol');
  }
  // Passed as prop for ChatBar to change username 
  changeUserName(name) {
    this.setState({ currentUser: name })
  }
  
  // Adds a new message
  addNewMessage(message) {
    const oldMessages = this.state.messages;
    const newMessage = [...oldMessages, message];
    this.setState({ messages: newMessage });
  }

  // Sets content for currently typing user
  addNewTyping(message) {
    this.setState({ 
      isTyping: true,
      typing: message.content
    });
  }
  
  // Passed down as prop for ChatBar to send messages to websocket server
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
      switch (data.type) {
        case 'usersConnected':
          this.setState({ userCount: data.content });
          break;
        case 'userColour':
          this.setState({colour: data.colour});
          break;
        case 'incomingMessage':
          this.addNewMessage(data);
          break;
        case 'incomingNotification':
          this.addNewMessage(data);
          break;
        case 'currentlyTyping':
          this.addNewTyping(data);
          if(this.state.isTyping) {
            let interval = 900;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.setState({
                isTyping: false,
                typing: ''
              });
            }, interval);
          }
          break;
        default:
          console.error('Received incorrect data type!');
          break;
      }
    }
  }

  // Auto scrolls when message list fills
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
          colour={this.state.colour}
          isTyping={this.state.isTyping}
          typing={this.state.typing}/>
      </>   
    )
  }
}
export default App;
