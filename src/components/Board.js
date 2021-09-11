import React, { Component } from 'react'
import Round from './Round'
import Bank from './Bank'
import Player from './Player'
import StartGameForm from './StartGameForm'
import fullDeck from '../data/deck'
import '../styling/Board.css'

const DECK = fullDeck.sort(() => 0.5 - Math.random());

class Board extends Component {
  static defaultProps = {
    bets: [10, 25, 50, 100, 200],
    moves: ['hit', 'pass', 'split', 'double']
  }

  constructor(props) {
    super(props)

    this.state = {
      deck: DECK,
      gameHasStarted: true, // for testing purpose set to true (should be false)
      player: {
        id: 1,
        name: 'Milly', // for testing purpose set to Milly (should be '')
        stacksize: 1000, // for testing purpose set to 1000 (should be 0)
        hands: []
        // hands: [
        //   { id: 0, cards: [DECK[2], DECK[3]] },
        //   { id: 1, cards: [DECK[4], DECK[5]] },
        //   { id: 2, cards: [DECK[6], DECK[7]] }
        // ]
      },
      bank: { hand: [] },
      // bank: { hand: [DECK[0], DECK[1]] },
      currentRound: { num: 0, bet: 0, active: false }
      // rounds: [] // contains all previous rounds
    }

    this.resetGame = this.resetGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.dealCard = this.dealCard.bind(this)
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

  dealCard(to, from) {
    console.log('deal card');

  }

  doMove(move) {
    console.log('do move:', move)
  }

  doBet(bet) {
    console.log('do bet:', bet)
    // Only if currentRound is not yet active
    if ( !this.state.currentRound.active ) {
      const newRoundNum = this.state.currentRound.num + 1;
      const newStacksize = this.state.player.stacksize - bet;
      const dealtCardsToPlayer = [DECK[2], DECK[3]];
      const dealtCardToBank = [DECK[0]];
      this.setState(prevState => ({
        currentRound: { ...prevState.currentRound, num: newRoundNum, bet: bet, active: true },
        player: { ...prevState.player, stacksize: newStacksize, hands: [{ id: 0, cards: dealtCardsToPlayer }] },
        bank: { ...prevState.bank, hand: dealtCardToBank }
      }))
    }
  }

  render() {

    const { moves, bets } = this.props;
    const { gameHasStarted, player, bank, currentRound: round } = this.state;

    return (
      <div className="Board">
        <h1>Black Jack!</h1>
        {gameHasStarted 
        ? <div>
            <Round roundnr={round.num} bet={round.bet} resetGame={this.resetGame} />
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
                roundActive={round.active}
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
