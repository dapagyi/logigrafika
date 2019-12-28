import ClearIcon from '@material-ui/icons/Clear';
import React, { Component } from 'react';

type CellProps = {
  x: number;
  y: number;
  size: number;
  changeCellState: (status: cellStatus) => void;
};

export enum cellStatus {
  DEFAULT,
  COLORED,
  CROSSED,
}

type CellState = {
  status: cellStatus;
  mouseOver: boolean;
  text: JSX.Element;
};

export class Cell extends Component<CellProps, CellState> {
  state: CellState = {
    status: cellStatus.DEFAULT,
    mouseOver: false,
    text: <></>,
  };

  click() {
    this.setState(
      {
        status: (this.state.status + 1) % 3,
        text:
          this.state.status === cellStatus.COLORED ? (
            <>
              <ClearIcon style={{ margin: '0 auto', display: 'block', height: '100%' }} />
            </>
          ) : (
            <></>
          ),
      },
      () => {
        this.props.changeCellState(this.state.status);
      },
    );
  }

  backgroundColor(status: boolean, mouseOver: boolean) {
    if (status) {
      if (mouseOver) return '#808080';
      else return '#404040';
    } else {
      if (mouseOver) return '#D3D3D3';
      else return '#FFFFFF';
    }
  }

  render() {
    return (
      <div
        className="asd"
        style={{
          display: 'inline-block',
          border: '0.5px solid black',
          borderRight: `${this.props.x % 5 === 4 ? 2 : 0.5}px solid black`,
          borderBottom: `${this.props.y % 5 === 4 ? 2 : 0.5}px solid black`,
          boxSizing: 'border-box',
          // borderRight: '2px solid black',
          margin: '0px',
          width: this.props.size,
          height: this.props.size,
          backgroundColor: this.backgroundColor(this.state.status === cellStatus.COLORED, this.state.mouseOver),
        }}
        onMouseEnter={() => this.setState({ mouseOver: true })}
        onMouseLeave={() => this.setState({ mouseOver: false })}
        onClick={this.click.bind(this)}
      >
        {this.state.text}
      </div>
    );
  }
}
