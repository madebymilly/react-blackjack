import React from 'react'

function Bet(props) {

  const handleBet = () => {
    props.doBet(props.bet)
  }

  return (
    <button className="Bet" onClick={handleBet}>{props.bet}</button>
  )
}

export default Bet
