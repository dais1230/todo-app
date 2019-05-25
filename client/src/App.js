import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { history } from './helpers/history';
import { authenticationService } from './services/authentication';
// components
import NavBar from './components/NavBar';
import List from './list';
import Login from './login';
import Signup from './signup';

export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        currentUser: null
      };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  render() {
    const Home = () => (
      <div>
        <h2>Home</h2>
        <p>Welcome</p>
      </div>
    );

    return (
      <Router history={history}>
        <div>
          <NavBar />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/list'>List</Link></li>
          </ul>
        <hr />
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/list' component={List} />
        </div>
      </Router>
    );
  }
}