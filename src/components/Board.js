import React, { Component } from 'react'
import Round from './Round'
import Bank from './Bank'
import Player from './Player'
import StartGameForm from './StartGameForm'
import fullDeck from '../data/deck'
import '../styling/Board.css'
import { getTotalValue } from '../js/helpers'


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
        //   { id: 0, cards: [DECK[2], DECK[3]], done: false, winner: false },
        //   { id: 1, cards: [DECK[4], DECK[5]], done: false, winner: false },
        //   { id: 2, cards: [DECK[6], DECK[7]], done: false, winner: false }
        // ]
      },
      bank: { hand: [] },
      // bank: { hand: [DECK[0], DECK[1]] },
      currentRound: { num: 0, bet: 0, active: false }
    }

    this.resetGame = this.resetGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.dealCard = this.dealCard.bind(this)
    this.doMove = this.doMove.bind(this)
    this.doMoveHit = this.doMoveHit.bind(this)
    this.doMovePass = this.doMovePass.bind(this)
    this.doMoveSplit = this.doMoveSplit.bind(this)
    this.doMoveDouble = this.doMoveDouble.bind(this)
    this.checkEndRound = this.checkEndRound.bind(this)
    this.endRound = this.endRound.bind(this)
    this.getBankCardsTill17 = this.getBankCardsTill17.bind(this)
    this.startRound = this.startRound.bind(this)
    this.doBet = this.doBet.bind(this)
    
  }

  resetGame() {
    console.log('reset game')
  }

  startGame( playerName, playerStacksize ) {
    this.setState(prevState => ({
      gameHasStarted: true,
      player: {...prevState.player, name: playerName, stacksize: playerStacksize }
    }))
  }

  dealCard() {
    const tempDeck = this.state.deck;
    const randomIndex = Math.floor(Math.random() * tempDeck.length);
    const card = tempDeck[randomIndex];
    tempDeck.splice(randomIndex, 1);
    this.setState({ 
      deck: tempDeck 
    });
    return card;
  }

  doMove(move, id) {
    switch(move) {
      case 'hit':
        this.doMoveHit(id);
        break;
      case 'pass':
        this.doMovePass(id);
        break;
      case 'split':
        this.doMoveSplit(id);
        break;
      case 'double':
        this.doMoveDouble(id);
        break;
      default:
        console.log('default')
    }
  }

  doMoveHit(id) {
    const newCard = this.dealCard();
    // Map through all hands, if hand has the right id, than return hand + new card:
    // And if hand value > 21 set hand to done:
    const playerHands = this.state.player.hands;
    // let tempHands = playerHands.map(hand =>
    //   hand.id === id
    //     ? { ...hand, cards: [...hand.cards, newCard] }
    //     : hand
    // );
    let tempHands = playerHands.map(function(hand) {
      if (hand.id === id) {
        return { ...hand, cards: [...hand.cards, newCard] }
      } else {
        return hand;
      }
    });

    // if value of new tempHands is higher than 21:
    if ( getTotalValue(tempHands.find(hand => hand.id === id).cards) > 21) {
      // set done to true of this hand.
      tempHands = playerHands.map(function(hand) {
        if (hand.id === id) {
          return { ...hand, cards: [...hand.cards, newCard], done: true }
        } else {
          return hand;
        }
      });
    }

    this.setState(prevState => ({
      player: {...prevState.player, hands: tempHands}
    }), () => 
      this.checkEndRound()
    );
  }

  doMovePass(id) {
    // Map through all hands, if hand has the right id, than set hand to done:
    const tempHands = this.state.player.hands.map(hand =>
      hand.id === id
        ? { ...hand, done: true }
        : hand
    );
    this.setState(prevState => ({ 
      player: {...prevState.player, hands: tempHands}
    }), () => 
      this.checkEndRound()
    );
     
  }

  doMoveSplit(id) {
    console.log('do move split')
  }

  doMoveDouble(id) {
    console.log('do move double')
  }

  checkEndRound() {
    
    let allHandsDone = this.state.player.hands.every( hand => hand.done === true );
    if (allHandsDone) {
      console.log('end round');
      this.endRound();
    } 
  }

  getBankCardsTill17() {
    let newCards = [];
    let currentBankHandValue = this.state.bank.hand[0].value;
    while (currentBankHandValue < 17) {
      const newCard = this.dealCard();
      console.log(newCards);
      console.log(newCard);
      newCards = [...newCards, newCard];
      currentBankHandValue += newCard.value;
    }
    return newCards;
  }

  endRound() {
    const newCardsForBank = this.getBankCardsTill17();
    this.setState(prevState => ({
      currentRound: { ...prevState.currentRound, active: false },
      bank: { ...prevState.bank, hand: [...prevState.bank.hand, ...newCardsForBank] }
    }))
  }

  startRound() {
    const newRoundNum = this.state.currentRound.num + 1;
    this.setState(prevState => ({
      currentRound: { ...prevState.currentRound, num: newRoundNum, active: true, bet: 0 },
      player: { ...prevState.player, hands: [] },
      bank: { ...prevState.bank, hand: [] },    
    }))
  }

  doBet(bet) {
    const newStacksize = this.state.player.stacksize - bet;
    this.setState(prevState => ({
      currentRound: { ...prevState.currentRound, bet: bet },
      player: { ...prevState.player, stacksize: newStacksize }
    }))
    this.dealFirstCards();
  }

  dealFirstCards() {
    const dealtCardsToPlayer = [this.dealCard(), this.dealCard()];
    const dealtCardToBank = [this.dealCard()];
    this.setState(prevState => ({
      player: { ...prevState.player, hands: [{ id: 0, cards: dealtCardsToPlayer, done: false }] },
      bank: { ...prevState.bank, hand: dealtCardToBank }
    }))
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
                round={round}
                doMove={this.doMove}
                startRound={this.startRound}
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
