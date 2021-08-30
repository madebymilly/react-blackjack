import React, { Component } from 'react'
import Round from './Round'
import Bank from './Bank'
import Player from './Player'
import fullDeck from '../data/deck'
import '../styling/Board.css'

class Board extends Component {
  static defaultProps = {
    bets: [10, 25, 50, 100, 200],
    moves: ['hit', 'pass', 'split', 'double'],
    deck: fullDeck.sort(() => 0.5 - Math.random())
  }

  constructor(props) {
    super(props)

    this.state = {
       //deck: fullDeck.sort(() => 0.5 - Math.random()) // is this state?
    }

    this.resetGame = this.resetGame.bind(this)
    this.doMove = this.doMove.bind(this)
    this.doBet = this.doBet.bind(this)
  }

  resetGame() {
    console.log('reset game')
  }
  
  doMove(move) {
    console.log('do move:', move)
  }

  doBet(bet) {
    console.log('do bet:', bet)
  }

  render() {
    //console.log(this.state.deck)
    
    return (
      <div className="Board">
        <h1>Black Jack!</h1>
        <Round roundnr={1} resetGame={this.resetGame} />
        <Bank hand={[this.props.deck[0], this.props.deck[1]]}/>
        <div className="Board-players">
          <Player 
            name={'Milly'} 
            stacksize={1000} 
            moves={this.props.moves} 
            bets={this.props.bets} 
            doMove={this.doMove} 
            doBet={this.doBet}
            hands={[this.props.deck[2], this.props.deck[3]]}
          />
        </div>
      </div>
    )
  }
}

export default Board
