Chatty App
=====================

A SPA built with ReactJS that allows users with communicate with each other without having to register for an account.

### Usage

Clone the project.

Install the dependencies and start the React server from chatty directory. Change directory into the websocket server, chatty/chatty-server and install the dependencies and start the websocket server.

```
npm install
npm start
cd chatty-server
npm install
node server.js
open http://localhost:3000
```


### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* css-loader
* sass-loader
* SASS
* ws
* uuid
* style-loader
* SockJS-client
* eslint
