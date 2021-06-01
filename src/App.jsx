import React, { Component } from 'react';
import './App.css';


// compenents
/*
- buttons
- board
  - spaces
- message board
- turn tracker
*/


class GameBoard extends Component {
  render() {
    console.log(this)
    const { board, placeToken } = this.props

    return (
      <div className='game-board'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((value, colIndex) => (
              <div key={colIndex} className='space-container' onClick={() => placeToken(rowIndex, colIndex)}>
                <Space token={value} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

class Space extends Component {
  render() {
    const { token } = this.props
    return (
      <div>
        {token}
      </div>
    )
  }
}

class MessageBoard extends Component {
  render() {
    const { messageText } = this.props
    return (
      <div>
        {messageText}
      </div>
    )
  }
}

class TurnTracker extends Component {
  render() {
    return (
      <div>
        I track turns
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const { buttonText, handleClick } = this.props
    console.log('click handler', handleClick)
    return (
      <div onClick={handleClick}>
        {buttonText}
      </div>
    )
  }
}


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
      message: ''
    }

    this.resetBoard = this.resetBoard.bind(this)
    this.placeToken = this.placeToken.bind(this)
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
      message: ''
    })
  }

  placeToken(row, col) {
    
    // if space has token, error message
    const { board, isXturn, numTurns } = this.state
    if (board[row][col]) {
      this.setState({message: 'error: space already has a token!'})
      return
    }
    // replace empty space with token
    const newBoard = board.slice()
    newBoard[row][col] = isXturn ? 'X' : 'O'
    this.setState({
      board: newBoard,
      isXturn: !isXturn,
      numTurns: numTurns + 1,
      message: ''
    })
  }

  render() {
    return (
      <main>
        <div className='column1'>
          <Button buttonText='Undo' />
          <Button buttonText='Reset Board' handleClick={this.resetBoard} />
        </div>
        <div className='column2'>
          <GameBoard board={this.state.board} placeToken={this.placeToken} />
          <MessageBoard messageText={this.state.message} />
        </div>
        <div className='column3'>
          <TurnTracker />
        </div>
      </main>
    );
  }
}

export default App;


/*
//TIC TAC TOE
// input coordinate (controlled via method)
// output 'X' or 'O' into tic tac toe board (controlled via method)
// constraints: keep track of turns, allow for reset of board, notifications for win and cat's game, only one character per space
 
 
      <div>
        Column 1
        Buttons
      </div>
      <div>
        Column 2
        <div> 
          GameBoard
        </div>
        <div> 
          MessageBoard
        </div>
      </div>
      <div>
        Column 3
        TurnTracker
      </div>


class TicTacToe {
  constructor() {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ]
    this.isXturn = true
    this.numTurns = 0
  }

  takeTurn(row, col) {
    this.placeToken(row, col)
    if (this.hasWinner() || this.isCatsGame()) {
      this.resetBoard()
    }
  }

  // method to place a mark
  placeToken(row, col) {
    
    // if space has token, error message
    if (this.board[row][col]) {
      console.log('error: space already has a token!')
      return
    }
    // replace empty space with token
    this.board[row][col] = this.isXturn ? 'X' : 'O'
    console.log(this.board)
    // flip flag
    this.isXturn = !this.isXturn
    this.numTurns ++

  }

  hasWinner() {
    // only check to see if hasWinner if this.numTurns >= 5
    if (this.numTurns < 5) {
      return false
    }
    // 3 tokens in a row (vert, horiz, or diag) wins game
    // whole row or col has same token
    for (let i = 0; i < this.board.length; i++) {
      const isRowWinner = this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]
      const isColWinner = this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]
      if (isRowWinner) {
        // winner winner chicken hasWinner
        this.declareWinner(this.board[i][0])
        return true
      } 
      if (isColWinner) {
        this.declareWinner(this.board[0][i])
        return true
      }
    }
    // whole diag
    const isLeftDiagWinner = this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]
    const isRightDiagWinner = this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]
    if (isLeftDiagWinner || isRightDiagWinner) {
      this.declareWinner(this.board[1][1])
      return true
    } 
    return false
  }

  declareWinner(winner) {
    console.log(`${winner} is the winner!`)
  }

  isCatsGame() {
    if (this.numTurns === 9) {
      console.log('Cat's game! Try again!')
      return true
    }
    return false
  }

  resetBoard() {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ]
    this.isXturn = true
    this.numTurns = 0
  }
}

const firstGame = new TicTacToe()
firstGame.takeTurn(0,2)
firstGame.takeTurn(2,1)
firstGame.takeTurn(1,1)
firstGame.takeTurn(1,2)
firstGame.takeTurn(2,0)
firstGame.takeTurn(0,2)
firstGame.takeTurn(2,1)
firstGame.takeTurn(1,1)
firstGame.takeTurn(1,2)
firstGame.takeTurn(2,0)

firstGame.hasWinner()


*/


    /*      
       <div className='game-board'>
        <div className='row'>
          <Space token={board[0][0]} handleClick=''/>
          <Space token={board[0][1]} handleClick=''/>
          <Space token={board[0][2]} handleClick=''/>
        </div>
        <div className='row'>
          <Space token={board[1][0]} handleClick=''/>
          <Space token={board[1][1]} handleClick=''/>
          <Space token={board[1][2]} handleClick=''/>
        </div>
        <div className='row'>
          <Space token={board[2][0]} handleClick=''/>
          <Space token={board[2][1]} handleClick=''/>
          <Space token={board[2][2]} handleClick=''/>
        </div>
      </div>
    */