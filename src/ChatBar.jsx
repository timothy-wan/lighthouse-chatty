/* eslint-disable react/prop-types */
import React, { Component } from 'react';

// ChatBar component that provides input fields for username and message. Has multiple listeners for various user inputs
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  render() {
    const {user, sendMessage, changeUserName, colour, typing} = this.props;
    
    // Changes username to input field value when user hits enter
    const changeName = event => {
      if(event.key === 'Enter' && event.target.value !== user) {
        let newMessage = {
          type: 'postNotification',
          content: `${user} has changed their name to ${event.target.value}`
        }
        changeUserName(event.target.value);
        sendMessage(newMessage);
      }
    }
    
    // Change controlled input value for message field
    const onInput = event => {
      this.setState({
        content: event.target.value
      })
    }
    
    // Creates and send a new message to websocket server 
    const createMessage = event => {
      if(event.key === 'Enter') {
        let newMessage = {
          type: 'postMessage',
          content: event.target.value,
          username: user,
          colour
        } 
        sendMessage(newMessage);
        this.setState({content: ''});
      }
    }

    // Send message to server when user is typing
    const userTyping = event => {
      if(event) {
        let newMessage = {
          type: 'currentlyTyping',
          content: `${user} is currently typing`
        }
        sendMessage(newMessage);
      }

    }
    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
          placeholder='Your Name (Optional)'
          defaultValue={user}
          onKeyPress={changeName}
          />
        <input className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onInput={onInput}
          onKeyPress={createMessage}
          onChange={userTyping}
          value={this.state.content}/>
        <div className='typing'>{typing}</div>
      </footer>
    )
  }
}
  

export default ChatBar;