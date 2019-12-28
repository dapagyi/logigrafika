import './App.css';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

// import Link from '@material-ui/core/Link';
import Board from './components/Board';
import Login, { UserRole } from './components/Login';
import Rules from './components/Rules';

type AppState = {
  isBoardVisible: boolean;
  isRulesVisible: boolean;
  username: string | null;
  userrole: UserRole | null;
  labelX: string[];
  labelY: string[];
};

class App extends Component<{}, AppState> {
  cellStates: boolean[][] = [];

  state = {
    isBoardVisible: true,
    isRulesVisible: false,
    username: null,
    userrole: null,
    labelX: [],
    labelY: [],
  };

  loading = false;

  sendSolution() {
    console.table(this.cellStates);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      // this.setState({isBoardVisible: !this.state.isBoardVisible});
    }, 1500);
  }

  authCallback = (username: string, role: UserRole, labelX: string[], labelY: string[]) => {
    this.setState({ username: username, userrole: role, labelX: labelX, labelY: labelY });
  };

  render() {
    // let labelX = ['6 6 7', '6 4 5 1', '4 1 3 5 3', '3 2 4 4', '2 1 3', '1 2 4', '2 2 1 6', '2 6 3', '2 12', '2 12', '2 7', '2 2 8', '2 1 4 5', '2 1 3 3', '2 3 1 2', '2 9', '1 1 1 2 2', '2 2 1 2', '2 1 1 1', '2 2 3', '3 3', '2 2 2', '2 1 4', '2 2', '6']
    // let labelY = ['7', '11', '3 3', '3 3', '4 2', '3 2', '2 1 2', '3 6 1', '2 2 1 2', '1 1 6 1', '2 2 1 2', '3 2 2 2', '3 2 4 1 1', '2 4 1 1 2 2 1', '2 12 2 1', '1 1 15 1', '1 2 2 6 2 1', '5 5 1 1', '4 5 3', '3 6 2', '3 1 5 1', '2 1 2 2 2', '1 5 1 2', '1 5 1 2', '7 1 2'];

    return (
      <div
        className="App"
        style={
          {
            // backgroundColor: 'lightgrey'
          }
        }
      >
        <Login authCallback={this.authCallback} />
        <h1>Logigrafika pontverseny</h1>

        {this.state.userrole === UserRole.USER ? (
          <>
            <Backdrop open={this.loading}>
              <CircularProgress color="primary" />
            </Backdrop>
            <Rules />
            <br />
            {this.state.isBoardVisible ? (
              <Board
                cellSize={30}
                labelX={this.state.labelX}
                labelY={this.state.labelY}
                returnCells={cellStates => {
                  this.cellStates = cellStates;
                }}
              ></Board>
            ) : (
              <div></div>
            )}
            <h3>Megoldás beküldése</h3>
            <TextField
              required
              label="Mit látható a képen?"
              variant="outlined"
              style={{
                margin: '6px',
              }}
            />
            <br />
            <TextField
              required
              label="Felhasználónév"
              defaultValue={this.state.username}
              // helperText={
              // <>
              //   <span>Nem Te vagy? </span>
              //   <Link style={{display: "inline"}} href="#">
              //     Válts felhasználót!
              //   </Link>
              // </>
              // }
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              style={{
                margin: '6px',
              }}
            />
            <br />
            <Button variant="contained" color="primary" onClick={() => this.sendSolution()}>
              Beküldés
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
