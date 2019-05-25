import React from 'react';
import CheckboxListSecondary from './components/ListItem';
import { authHeader } from './helpers/auth-header';

export default class List extends React.Component {

  componentDidMount() {
    const requestOptions = { headers: authHeader(), mode: 'cors' };
    fetch('http://localhost:1313/api/tasks', requestOptions)
    .then(x => x.json())
    .then(res => {
      console.log(res, 'res');
    })
    .catch((error) => {
      console.log(error, 'error');
    })
}

  render() {
    return (
      <CheckboxListSecondary />
    );
  }
}

