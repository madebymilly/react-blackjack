import React from 'react'
import '../styling/Round.css'

function Round(props) {
  return (
    <div className="Round">
      <p>Round number: {props.roundnr}</p>
      <p>Bet: {props.bet}</p>
      <button onClick={props.resetGame}>Start over!</button>
    </div>
  )
}

export default Round;
