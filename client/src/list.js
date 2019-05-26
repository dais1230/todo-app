import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { authHeader } from './helpers/auth-header';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class TaskList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchTasks()
  }

  fetchTasks() {
    const requestOptions = {
      headers: {
        'Authorization': authHeader()
      },
      mode: 'cors',
    };
    fetch('http://localhost:1313/api/tasks', requestOptions)
    .then(x => x.json())
    .then(res => {
      this.setState({
        tasks: res,
        isLoading: false,
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }


  handleToggle = value => () => {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      mode: 'cors',
      method: 'PUT',
      body: value,
    };
    fetch(`http://localhost:1313/api/tasks/${value.ID}/completed`, requestOptions)
    .then(res => {
      this.fetchTasks()
    })
    .catch((error) => {
      console.error(error);
    })
  };


  render() {
    const { classes } = this.props;
    const tasks = this.state.tasks;
    const isLoading = this.state.isLoading;

    if (!isLoading) {
      return (
        <List dense className={classes.root}>
          {tasks.map((task, index) => (
            <ListItem key={index} button>
              <ListItemText primary={task.Description} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(task)}
                  checked={task.Completed == true}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);