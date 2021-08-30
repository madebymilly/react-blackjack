import React, { Component } from 'react'
import Round from './Round'
import '../styling/Board.css'

class Board extends Component {
  render() {
    return (
      <div className="Board">
        <h1>Black Jack!</h1>
        <Round />
      </div>
    )
  }
}

export default Board
