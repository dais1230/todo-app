import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/task'>Task</Link></li>
        <li><Link to='/list'>List</Link></li>
      </ul>
    <hr />
      <Route exact path='/' component={Home} />
      <Route path='/task' component={Task} />
      <Route path='/list' component={List} />
    </div>
  </BrowserRouter>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome</p>
  </div>
);
const Task = () => (
  <div>
    <h2>Task</h2>
    <p>task detail</p>
  </div>
);
const List = () => (
  <div>
    <h2>List</h2>
    <p>task list</p>
  </div>
);

export default App