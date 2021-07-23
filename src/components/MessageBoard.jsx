import React, { Component } from 'react';


class MessageBoard extends Component {
  render() {
    const { messageText, style } = this.props
    return (
      <div className={style}>
        {messageText}
      </div>
    )
  }
}

export default MessageBoard