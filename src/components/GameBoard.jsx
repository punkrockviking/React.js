import React, { Component } from 'react';
import Space from './Space'


class GameBoard extends Component {
  render() {
    const { board, placeToken } = this.props

    return (
      <div className='game-board'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((value, colIndex) => (
              <div key={colIndex} className='space-container' onClick={() => placeToken(rowIndex, colIndex)}>
                <Space token={value} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default GameBoard