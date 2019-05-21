import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});



class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    var data = this.state;

    switch (event.target.name) {
        case 'name':
            data.name = event.target.value;
            break;
        case 'password':
            data.password = event.target.value;
            break;
    }
  }

  handleSubmit() {
    console.log(this.state)
    fetch('http://localhost:1313/signup', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'POST',
      body:  JSON.stringify(this.state)
    })
    .then(x => x.json())
    .then(res => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
        <TextField
          className={classes.textField}
          id="standard-name"
          label="Name"
          margin="normal"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          required
        />

        <TextField
          className={classes.textField}
          id="standard-password-input"
          label="Password"
          margin="normal"
          name="password"
          onChange={this.handleChange}
          type="password"
          value={this.state.password}
          required
        />

        {/* <TextField
          className={classes.textField}
          id="standard-password-input"
          label="Password Confirmation"
          margin="normal"
          type="password"
          required
        /> */}

      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);