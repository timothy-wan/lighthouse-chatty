// server.js

const express = require('express');
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Random number generator for colours
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

// Colours array for users
const colours = ['#C2D2F2', '#5176A6','#70731F', '#A67D4B', '#A64B29'];

// Set broadcast function to send message to all clients
wss.broadcast = message => {
  wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  })
}
// Send current number of users to all clients
const sendCurrentUsers = () => {
  let content = '';
  if(wss.clients.size > 1) {
    content = `${wss.clients.size} users online`;
  } else if(wss.clients.size === 1) {
    content = `${wss.clients.size} user online`;
  }
  let newMessage = {
    content,
    type: 'usersConnected'
  }
  wss.broadcast(newMessage);
}
const sendUserColour = (ws) => {
  let random = getRandomInt(5);
  let newMessage = {
    type: 'userColour',
    colour: colours[random]
  }
  ws.send(JSON.stringify(newMessage));
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  sendUserColour(ws);
  sendCurrentUsers();
  ws.on('message', data => {
    const receivedData = JSON.parse(data);
    if(receivedData.type === 'postMessage') {
      let newMessage = {
        ...receivedData,
        id: uuidv1(),
        type: 'incomingMessage'
      }
      wss.broadcast(newMessage)
    }
    if(receivedData.type === 'postNotification') {
      let newMessage = {
        ...receivedData,
        id: uuidv1(),
        type: 'incomingNotification'
      }
      wss.broadcast(newMessage);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    sendCurrentUsers();
  });
});