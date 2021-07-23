import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { buttonText, handleClick, style } = this.props
    // console.log('click handler', handleClick)
    return (
      <div className={style} onClick={handleClick}>
        {buttonText}
      </div>
    )
  }
}

export default Button