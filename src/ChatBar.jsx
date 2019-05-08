/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  
  render() {
    const {user, sendMessage, changeUserName} = this.props;
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
    const onInput = event => {
      this.setState({
        content: event.target.value
      })
    }
    const createMessage = event => {
      if(event.key === 'Enter') {
        let newMessage = {
          type: 'postMessage',
          content: event.target.value,
          username: user
        } 
        sendMessage(newMessage);
        this.setState({content: ''});
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
          value={this.state.content}/>
      </footer>
    )
  }
}
  

export default ChatBar;