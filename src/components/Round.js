import React from 'react'

function Round(props) {
  return (
    <div className="Round">
      <p>Round number: {props.roundnr}</p>
      <button onClick={props.resetGame}>Start over!</button>
    </div>
  )
}

export default Round;
