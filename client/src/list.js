import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    const requestOptions = { headers: authHeader(), mode: 'cors' };
    fetch('http://localhost:1313/api/tasks', requestOptions)
    .then(x => x.json())
    .then(res => {
      this.setState({
        tasks: res,
        isLoading: false,
      })
    })
    .catch((error) => {
      console.log(error, 'error');
    })
  }

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