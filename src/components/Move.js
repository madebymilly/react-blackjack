import React, { Component } from 'react'
import '../styling/Move.css'

class Move extends Component {

  constructor(props) {
    super(props)
    this.handleMove = this.handleMove.bind(this)
  }

  handleMove(e) {
    e.preventDefault();
    this.props.doMove(this.props.move)
  }

  render() {
    const { move } = this.props;
    return (
      <button className="Move" onClick={this.handleMove}>{move}</button>
    )
  }
}

export default Move
