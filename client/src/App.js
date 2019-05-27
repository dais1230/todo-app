import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers/history';
import { authenticationService } from './services/authentication';
// components
import List from './components/list';
import Login from './components/login';
import NavBar from './components/NavBar';
import TaskNew from './components/new';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/signup';

export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        currentUser: null
      };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({currentUser: x }));
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/list' component={List} />
          <PrivateRoute path='/new' component={TaskNew} />
        </div>
      </Router>
    );
  }
}