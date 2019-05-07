import React from 'react';

export const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter('', 10);
})('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

const ChatBar = (props) => {
  const {user, addNewMessage} = props;
  const receiveInput = event => {
    if(event.key === 'Enter') {
      let newMessage = {
        id: generateRandomId(),
        type: 'incomingMessage',
        content: event.target.value,
        username: user.name
      }
      addNewMessage(newMessage);
      event.target.value = '';
    }
  }
  return (
    <footer className='chatbar'>
      <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={user.name} readOnly/>
      <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={receiveInput}/>
    </footer>
  )
}

export default ChatBar;