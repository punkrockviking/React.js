import React, { Component } from 'react';
import './App.css';


// components
/*
- buttons
- board
  - spaces
- message board
- turn tracker
*/

// visually distinguish the last move made

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
    const { isXturn } = this.props
    return (
      <div>
        <div>
          Your move: 
        </div>
        <div>
          {isXturn ? 'X' : 'O'}
        </div>
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const { buttonText, handleClick, style } = this.props
    // console.log('click handler', handleClick)
    return (
      <div className={style} onClick={handleClick}>
        {buttonText}
      </div>
    )
  }
}

//class App extends React.Compnent
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
      winner: false
    }

    this.resetBoard = this.resetBoard.bind(this)
    this.placeToken = this.placeToken.bind(this)
    this.undo = this.undo.bind(this)

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

        <div className='title' >
          Tic-Tac-Toe
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
            />
            <MessageBoard messageText={this.state.message} />
          </div>
          <div className='column3'>
            <TurnTracker isXturn={this.state.isXturn} />
          </div>
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
      console.log('Cat's game! Play again!')
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