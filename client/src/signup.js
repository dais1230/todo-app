import React from 'react';
import PropTypes from 'prop-types';
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
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="standard-name"
          label="Name"
          className={classes.textField}
          onChange={this.handleChange('name')}
          margin="normal"
        />

        <TextField
          required
          id="standard-password-input"
          label="Email"
          className={classes.textField}
          type="email"
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          required
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          required
          id="standard-password-input"
          label="Password Confirmation"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

      <Button variant="contained" color="primary" className={classes.button}>
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