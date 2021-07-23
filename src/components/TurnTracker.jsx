import React, { Component } from 'react';

class TurnTracker extends Component {
  render() {
    const { isXturn, tokenStyle } = this.props
    return (
      <div>
        <div>
          YOUR MOVE 
        </div>
        <div className={tokenStyle}>
          {isXturn ? 'X' : 'O'}
        </div>
      </div>
    )
  }
}

export default TurnTracker