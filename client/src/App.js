import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import CheckboxListSecondary from './components/ListItem';



export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          message: ''
      };
  }

  componentDidMount() {
      console.log('new')
      fetch('http://localhost:1313/users', {mode: 'cors'})
          .then(x => x.json())
          .then(res => {
            console.log(res);
              // this.setState({
              //     message: json.message
              // });
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

      return (
        <BrowserRouter>
        <div>
          <NavBar />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/task'>Task</Link></li>
            <li><Link to='/list'>List</Link></li>
          </ul>
          <CheckboxListSecondary />
        <hr />
          <Route exact path='/' component={Home} />
          <Route path='/task' component={Task} />
          <Route path='/list' component={List} />
        </div>
      </BrowserRouter>
    );
  }
}