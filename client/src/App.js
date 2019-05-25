import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Signup from './signup';
import Login from './login';
import List from './list';
import { history } from './helpers/history';
import { authenticationService } from './services/authentication';



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

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
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
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/list'>List</Link></li>
          </ul>
        <hr />
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/list' component={List} />
        </div>
      </BrowserRouter>
    );
  }
}