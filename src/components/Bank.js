import React from 'react'
import Hand from './Hand'
import '../styling/Bank.css'

function Bank(props) {
  return (
    <div className="Bank">
      <h3>Bank</h3>
      <div className="Bank-hand">
        <div className="Bank-cards">
          {props.hand.length !== 0 && 
            <Hand hand={props.hand} moves={false} bet={false} />
          }
        </div>
      </div>
    </div>
  )
}

export default Bank
