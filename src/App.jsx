import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import MessageBoard from './components/MessageBoard';
import TurnTracker from './components/TurnTracker';
import Button from './components/Button'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      numTurns: 0,
      isXturn: true,
      history: [],
      message: '',
      winner: false,
      glowEnabled: false
    }

    this.resetBoard = this.resetBoard.bind(this)
    this.placeToken = this.placeToken.bind(this)
    this.undo = this.undo.bind(this)
    this.titleGlow = this.titleGlow.bind(this)

  }

  resetBoard() {
    this.setState({
      board: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      isXturn: true,
      numTurns: 0,
      history: [],
      message: '',
      winner: false
    })
  }

  placeToken(row, col) {
    
    const { board, isXturn, numTurns, history, message, winner } = this.state
    if (this.hasWinner() || this.isCatsGame()) {
      this.resetBoard()
      return
    }
    if (board[row][col]) {
      this.setState({message: 'error: space already has a token!'})
      return
    }
    // replace empty space with token
    const newBoard = board.slice()
    newBoard[row][col] = isXturn ? 'X' : 'O'
    const newHistory = history.slice()
    newHistory.push([row, col])
    this.setState({
      board: newBoard,
      isXturn: !isXturn,
      numTurns: numTurns + 1,
      history: newHistory,
      message: ''
    }, () => {
      if (this.hasWinner()) {
        this.declareWinner(newBoard[row][col])
        return
      }
      if (this.state.numTurns === 9) {
        this.isCatsGame()
      }
    })

  }

  undo() {
    const { board, isXturn, numTurns, history } = this.state
    if (!history.length) return
    const newHistory = history.slice()
    const [undoRow, undoCol] = newHistory.pop()
    const newBoard = board.slice()
    newBoard[undoRow][undoCol] = ''

    this.setState({
      board: newBoard,
      isXturn: !isXturn,
      numTurns: numTurns - 1,
      history: newHistory,
      message: 'Last turn undone. Go again!'
    })
  }
  
  titleGlow() {
    const { glowEnabled } = this.state
    this.setState({
      glowEnabled: !glowEnabled
    })
  }

/*
need to change hasWinner, declareWinner, and isCatsGame to set state
need to figure out how, when, and where to call those methods
*/


  hasWinner() {
    // should run this method ever time a token is placed
    // what do i change the return true/false statements to?
    
    const { board, isXturn, numTurns, message, winner } = this.state
    // only check to see if hasWinner if this.numTurns >= 5
    if (numTurns < 5) {
      return false
    }
    // 3 tokens in a row (vert, horiz, or diag) wins game
    // whole row or col has same token
    for (let i = 0; i < board.length; i++) {
      const isRowWinner = board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]
      const isColWinner = board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]
      if (isRowWinner || isColWinner) {
        return true
      } 
    }
    // whole diag
    const isLeftDiagWinner = board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]
    const isRightDiagWinner = board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]
    if (isLeftDiagWinner || isRightDiagWinner) {
      return true
    } 
  }


  declareWinner(winner) {
    // should stop game, display winner in message
    const { message } = this.state
      this.setState({
        message: `${winner} is the winner!`
      })
  }


  isCatsGame() {
    // should stop game, display cat's game in message
    const { message, numTurns } = this.state
    if (numTurns === 9) {
      this.setState({
        message: "Cat's game! Play again!"
      })
      return true
    }
    return false
  }


  render() {
    return (
      <main>
        <div className={this.state.glowEnabled ? 'glow-title' : 'title'} onClick={this.titleGlow} >
          {this.state.glowEnabled ? 'Tic-Tac-Glo' : 'Tic-Tac-Toe'}
        </div>
        <div className='columns'>
          <div className='column1'>
            <Button style='button' buttonText='Undo' handleClick={this.undo} />
            <Button style='button' buttonText='Reset' handleClick={this.resetBoard} />
          </div>
          <div className='column2'>
            <GameBoard 
              board={this.state.board} 
              placeToken={this.placeToken}  
              gameBoardStyle={this.state.glowEnabled ? 'glow-game-board' : 'game-board'}
            />
            <MessageBoard style='message' messageText={this.state.message} />
          </div>
          <div className='column3'>
            <TurnTracker tokenStyle='token-style' isXturn={this.state.isXturn} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;