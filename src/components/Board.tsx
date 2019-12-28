import React, { Component } from 'react';

import { Cell, cellStatus } from './Cell';

type BoardProps = {
  cellSize: number;
  labelX: string[];
  labelY: string[];
  returnCells: (cellStates: boolean[][]) => void;
};

class Board extends Component<BoardProps> {
  cellState: boolean[][] = [];

  height = this.props.labelX.length;
  width = this.props.labelY.length;

  // labelXSize: number;
  // labelYSize: number;

  constructor(props: BoardProps) {
    super(props);
    for (let i = 0; i < this.height; i++) {
      this.cellState.push([]);
      for (let j = 0; j < this.width; j++) {
        this.cellState[i].push(false);
      }
    }
    this.props.returnCells(this.cellState);

    // this.labelXSize = this.props.labelX.reduce((prev, current) => (prev.length > current.length) ? prev : current).length;
    // this.labelYSize = this.props.labelY.reduce((prev, current) => (prev.length > current.length) ? prev : current).length;
    // this.labelXSize = (this.labelXSize - 1)/2*32;
  }

  changeCellState(x: number, y: number, status: cellStatus) {
    // console.log(`Status changed: (${x}, ${y}) to ${status}`);
    this.cellState[y][x] = status === cellStatus.COLORED;
    this.props.returnCells(this.cellState);
    // console.table(this.cellState);
  }

  render() {
    let cells: JSX.Element[] = [
      <div
        key={'topleft-cell'}
        style={{
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      ></div>,
    ];

    // Labels:
    for (let i = 0; i < this.width; i++) {
      cells.push(
        <div
          key={`header-x-${i}`}
          style={{
            gridArea: `1 / ${i + 2} / 1 / ${i + 3}`,
            // display: 'grid',
            display: 'block',
            border: '0.5px solid black',
            borderRight: `${i % 5 === 4 ? 2 : 0.5}px solid black`,
            borderBottom: '2px solid black',
            boxSizing: 'border-box',
            // margin: '0 auto',
            height: '100%',
            width: '100%',
            textAlign: 'center',
            alignItems: 'flex-end',
          }}
        >
          {this.props.labelX[i].split(' ').map((label, j) => {
            return (
              <div
                key={`header-x-${i}-${j}`}
                // style={{margin: 'max auto 0', display: 'block'}}
              >
                {label}
                <br />
              </div>
            );
          })}
        </div>,
      );
    }
    for (let i = 0; i < this.height; i++) {
      cells.push(
        <div
          key={`header-y-${i}`}
          style={{
            gridArea: `${i + 2} / 1 / ${i + 3} / 1`,
            height: this.props.cellSize,
            display: 'block',
            border: '0.5px solid black',
            borderBottom: `${i % 5 === 4 ? 2 : 0.5}px solid black`,
            borderRight: '2px solid black',
            boxSizing: 'border-box',
            margin: '0 auto',
            width: '100%',
            minWidth: this.props.labelY[i].length + 'ch',
            textAlign: 'right',
            // height: '100%',
            //{margin: '0 auto', display: 'block', height: '100%'}
          }}
        >
          {/* <p> */}
          {this.props.labelY[i]}
          {/* </p> */}
        </div>,
      );
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        cells.push(
          <Cell
            x={j}
            y={i}
            size={this.props.cellSize}
            key={`cell-(${j}, ${i})`}
            changeCellState={(status: cellStatus) => this.changeCellState(j, i, status)}
          />,
        );
      }
    }

    return (
      <div
        style={{
          display: 'inline-grid',
          margin: '16px',
          gridTemplate: `auto ${`${this.props.cellSize}fr `.repeat(this.height)} / 
          auto ${`${this.props.cellSize}fr `.repeat(this.width)}`,
          border: '4px solid black',
          // width: `${this.width * this.props.cellSize + this.width*2}px`,
          // height: `${this.height * this.props.cellSize}px`,
          // float: 'left',
          // overflow: 'auto',
          touchAction: 'manipulation',
        }}
      >
        {cells}
      </div>
    );
  }
}

export default Board;
