import React, { Component } from 'react';


class MessageBoard extends Component {
  render() {
    const { messageText } = this.props
    return (
      <div>
        {messageText}
      </div>
    )
  }
}

export default MessageBoard