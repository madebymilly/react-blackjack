import React, { Component } from 'react'

import { RoundContext } from "../context/RoundContext";

import '../styling/Round.css'

class Round extends Component {
  static contextType = RoundContext;
  render() {
    const { roundNum, roundBet, isRoundActive } = this.context;
    return (
      <div className="Round">
        <p>Round number: {roundNum}</p>
        <p>Bet: {roundBet}</p>
        <p>Active: {isRoundActive ? 'active' : 'not active'}</p>
        <button onClick={this.props.resetGame}>Start over!</button>
      </div>
    )
  }
}

export default Round;
