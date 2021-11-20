import React, { Component } from 'react'

import { withRoundContext } from "../context/RoundContext";

import '../styling/Round.css'

class Round extends Component {
  render() {
    const { roundNum, roundBet } = this.props.roundContext;
    return (
      <div className="Round">
        <p>Round number: {roundNum}</p>
        <p>Total bet: {roundBet}</p>
        <button onClick={this.props.resetGame}>Start over!</button>
      </div>
    )
  }
}

export default withRoundContext(Round);
