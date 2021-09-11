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
    moves: ['hit', 'pass']
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
        //   { id: 0, cards: [DECK[2], DECK[3]], done: false },
        //   { id: 1, cards: [DECK[4], DECK[5]], done: false },
        //   { id: 2, cards: [DECK[6], DECK[7]], done: false }
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
    this.doMoveHit = this.doMoveHit.bind(this)
    this.doMovePass = this.doMovePass.bind(this)
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

  dealCard() {
    console.log('deal card');
    const tempDeck = this.state.deck;
    const randomIndex = Math.floor(Math.random() * tempDeck.length);
    console.log('tempdeck-length', tempDeck.length, 'randomindex', randomIndex);
    const card = tempDeck[randomIndex];
    console.log('card', card);
    tempDeck.splice(randomIndex, 1);
    console.log('deck', tempDeck);
    this.setState({ deck: tempDeck })
    return card;
  }

  // TODO: consider moving this to Move.js or Hand.js
  doMoveHit(id) {
    console.log('do move hit')
    // give this hand a new card
    const newCard = this.dealCard();
    // map trough all hands, if hand has the right id, than return hand + new card
    const tempHands = this.state.player.hands.map(hand =>
      hand.id === id
        ? { ...hand, cards: [...hand.cards, newCard] }
        : hand
    );
    this.setState(prevState => ({
      player: {...prevState.player, hands: tempHands}
    }))
  }

  // TODO consider moving this to Move.js or Hand.js
  doMovePass() {
    console.log('do move pass')
    // TODO: check if all hands are done, then endRound
    this.endRound();
  }

  endRound() {
    // set currentRound to inactive
    // bank gets cards till 17
    // compare bank & player hands
    // show winnings
    // update stacksize
    this.setState(prevState => ({
      currentRound: { ...prevState.currentRound, active: false }
    }))
  }

  startRound() {

  }

  doBet(bet) {
    console.log('do bet:', bet)
    // Only if currentRound is not yet active
    if ( !this.state.currentRound.active ) {
      const newRoundNum = this.state.currentRound.num + 1;
      const newStacksize = this.state.player.stacksize - bet;
      const dealtCardsToPlayer = [this.dealCard(), this.dealCard()];
      const dealtCardToBank = [this.dealCard()];
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
                doBet={this.doBet}
                hands={player.hands}
                roundActive={round.active}
                doMoveHit={this.doMoveHit}
                doMovePass={this.doMovePass}
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
