import React, { Component } from 'react';


class Space extends Component {
  render() {
    const { token } = this.props
    return (
      <div>
        {token}
      </div>
    )
  }
}

export default Space