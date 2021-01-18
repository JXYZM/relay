import React, { Component } from 'react'

export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: true,
    }
  }

  render() {
    const { valid } = this.state

    return (
      <div>
        {valid ? '1' : '0'}
        <button
          onClick={(_) =>
            this.setState({
              valid: !valid,
            })
          }
        ></button>
      </div>
    )
  }
}
