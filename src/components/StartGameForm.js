import React, { Component } from 'react'
import '../styling/StartGame.css'

export default class StartGameForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: 'Roodkapje', // should be empty
       stacksize: '1000' // should be empty
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.startGame( this.state.name, this.state.stacksize );
    this.setState({
        name: '',
        stacksize: ''
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <form className="StartGameForm" onSubmit={this.handleSubmit}>
        <div className="StartGameForm-input">
          <label htmlFor="name">Your name:</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="StartGameForm-input">
          <label htmlFor="stacksize">Your stacksize:</label>
          <input type="number" id="stacksize" name="stacksize" min="100" max="2000" value={this.state.stacksize} onChange={this.handleChange} />
        </div>
        <button>Start Your Game of BlackJack!</button>
      </form>
    )
  }
}
