import React from 'react'
import Hand from './Hand'

function Bank(props) {
  return (
    <div className="Bank">
      <h3>Bank</h3>
      <div className="Bank-hand">
        <div className="Bank-cards">
          <Hand hand={props.hand} moves={false} />
        </div>
      </div>
    </div>
  )
}

export default Bank
