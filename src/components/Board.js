import React, { Component } from 'react'
import Round from './Round'
import Bank from './Bank'
import Player from './Player'
import StartGameForm from './StartGameForm'
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
      gameHasStarted: false,
      player: {
        id: 1,
        name: '',
        stacksize: 0,
        hands: [
          { id: 0, cards: [this.props.deck[2], this.props.deck[3]] },
          { id: 1, cards: [this.props.deck[4], this.props.deck[5]] },
          { id: 2, cards: [this.props.deck[6], this.props.deck[7]] }
        ]
      },
      bank: { hand: [this.props.deck[0], this.props.deck[1]] },
      round: { num: 1 }
    }

    this.resetGame = this.resetGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.doMove = this.doMove.bind(this)
    this.doBet = this.doBet.bind(this)
    
  }

  resetGame() {
    console.log('reset game')
  }

  startGame( playerName, playerStacksize ) {
    console.log('start game!')
    this.setState(prevState => ({
      gameHasStarted: true,
      player: {...prevState.player, name: playerName, stacksize: playerStacksize }
    }))
  }

  doMove(move) {
    console.log('do move:', move)
  }

  doBet(bet) {
    console.log('do bet:', bet)
  }

  

  render() {

    const { moves, bets } = this.props;
    const { gameHasStarted, player, bank, round } = this.state;

    return (
      <div className="Board">
        <h1>Black Jack!</h1>
        {gameHasStarted 
        ? <div>
            <Round roundnr={round.num} resetGame={this.resetGame} />
            <Bank hand={bank.hand} />
            <div className="Board-players">
              <Player
                name={player.name}
                stacksize={player.stacksize}
                moves={moves}
                bets={bets}
                doMove={this.doMove}
                doBet={this.doBet}
                hands={player.hands}
              />
            </div>
          </div>
          : <StartGameForm startGame={this.startGame} />
        }
      </div>
    )
  }
}

export default Board
