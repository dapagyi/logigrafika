import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

export enum UserRole {
  USER,
  ADMIN,
  SUPERVISOR,
}

type LoginProps = {
  authCallback: (username: string, role: UserRole, labelX: string[], labelY: string[]) => void;
};

type LoginState = {
  isDialogVisible: boolean;
  usernameError: string;
  passwordError: string;
};

class Login extends Component<LoginProps, LoginState> {
  state = {
    isDialogVisible: true,
    usernameError: '',
    passwordError: '',
  };

  headerText = 'Bejelentkezés';
  username: string | null = null;
  password: string | null = null;
  loading = false;

  handleClose = () => {
    if (this.username !== null && this.password !== null && this.username.length > 0 && this.password.length > 0) {
      this.setState({ isDialogVisible: false });
      this.loading = true;
      // Fetch data from API

      let labelX = [
        '6 6 7',
        '6 4 5 1',
        '4 1 3 5 3',
        '3 2 4 4',
        '2 1 3',
        '1 2 4',
        '2 2 1 6',
        '2 6 3',
        '2 12',
        '2 12',
        '2 7',
        '2 2 8',
        '2 1 4 5',
        '2 1 3 3',
        '2 3 1 2',
        '2 9',
        '1 1 1 2 2',
        '2 2 1 2',
        '2 1 1 1',
        '2 2 3',
        '3 3',
        '2 2 2',
        '2 1 4',
        '2 2',
        '6',
      ];
      let labelY = [
        '7',
        '11',
        '3 3',
        '3 3',
        '4 2',
        '3 2',
        '2 1 2',
        '3 6 1',
        '2 2 1 2',
        '1 1 6 1',
        '2 2 1 2',
        '3 2 2 2',
        '3 2 4 1 1',
        '2 4 1 1 2 2 1',
        '2 12 2 1',
        '1 1 15 1',
        '1 2 2 6 2 1',
        '5 5 1 1',
        '4 5 3',
        '3 6 2',
        '3 1 5 1',
        '2 1 2 2 2',
        '1 5 1 2',
        '1 5 1 2',
        '7 1 2',
      ];

      setTimeout(() => {
        // Fake API
        let userRole: UserRole | null = null;
        if (this.username === 'guest' && this.password === 'guest') userRole = UserRole.USER;
        else if (this.username === 'admin' && this.password === 'admin') userRole = UserRole.ADMIN;
        // -----

        let validCredentials = userRole !== null && this.username !== null;
        this.loading = false;
        if (validCredentials && userRole !== null && this.username !== null) {
          this.props.authCallback(this.username || '', userRole, labelX, labelY);
        } else {
          this.headerText = 'Hibás felhasználónév vagy jelszó';
          this.setState({ isDialogVisible: true });
        }
      }, 1500);
    }
  };

  render() {
    return (
      <>
        <Backdrop open={this.loading}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Dialog open={this.state.isDialogVisible} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.headerText}</DialogTitle>
          <DialogContent>
            <DialogContentText>(felhasználónév, jelszó): (guest, guest), (admin, admin)</DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="username"
              label="Felhasználónév"
              fullWidth
              onChange={event => {
                this.username = event.target.value;
                this.setState({ usernameError: this.username.length > 0 ? '' : 'Ez a mező kötelező.' });
              }}
              helperText={this.state.usernameError}
              error={this.state.usernameError.length > 0}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.handleClose();
                }
              }}
            />
            <TextField
              // autoFocus
              required
              margin="dense"
              id="password"
              label="Jelszó"
              type="password"
              fullWidth
              onChange={event => {
                this.password = event.target.value;
                this.setState({ passwordError: this.password.length > 0 ? '' : 'Ez a mező kötelező.' });
              }}
              helperText={this.state.passwordError}
              error={this.state.passwordError.length > 0}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.handleClose();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
        Cancel
      </Button> */}
            <Button onClick={this.handleClose} color="primary">
              Bejelentkezés
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Login;
