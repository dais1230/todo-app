import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Signup from './signup';
import List from './list';



export default class App extends React.Component {
  componentDidMount() {
      fetch('http://localhost:1313/users', {mode: 'cors'})
          .then(x => x.json())
          .then(res => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })

  }


  render() {
    const { message } = this.state;

    const Home = () => (
      <div>
        <h2>Home</h2>
        <p>Welcome</p>
      </div>
    );

    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/list'>List</Link></li>
          </ul>
        <hr />
          <Route exact path='/' component={Home} />
          <Route path='/Signup' component={Signup} />
          <Route path='/list' component={List} />
        </div>
      </BrowserRouter>
    );
  }
}