import React, { Component } from 'react';
import Board from './Board.js';
import getWinner from './getWinner.js';

class App extends Component {
  constructor(props) {
    super(props);
    var numRows = 5; // later on a user input
    this.state = {
      board: this.emptyBoard(numRows),
      numRows: numRows, 
      myMove: false,
      numNodes: 0,
      winner: ""
    }
    this.cellClick = this.cellClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  emptyBoard(numRows) {
    var board = [];
    for (let i = 0; i < numRows; i++) {
      var row = [];
      for (let j = 0; j < numRows; j++) {     
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }

  cellClick(event) {
    event.preventDefault();
    let board = this.state.board;
    let cell = event.target.id;
    let row = parseInt(cell[1], 10);
    let col = parseInt(cell[2], 10);

    if (getWinner(this.state.board) === null) {
      if (board[row][col] === null) {
        this.state.myMove ? board[row][col] = false : board[row][col] = true
        this.setState({
          board: board,
          myMove: !this.state.myMove,
          numNodes: 0
        });
      } else {
        alert("Click an empty cell");
      }
    }
    this.setBoard();
  }

  checkWinner() {
    if (getWinner(this.state.board) === null) {
      return null;
    } else if (getWinner(this.state.board) === 0){
      return "You won";
    } else if (getWinner(this.state.board) === 1) {
      return "AI won";
    } else if (getWinner(this.state.board) === -1){
      return "Game ended tie";
    } else {
      return "Error";
    }
  }

  restartGame() {
    this.setState({
      board: this.emptyBoard(this.state.numRows),
      myMove: true,
      numNodes: 0,
      winner: ""
    })
  }

  componentWillMount() {
    this.restartGame();
  }

  setBoard() {
    this.setState({
      winner: this.checkWinner()
    });
    this.boardAfterComputerPlay();
  }

  boardAfterComputerPlay() {
    this.setState({numNodes: 0});
    let board = this.cloneBoard(this.state.board);
    this.computerMakeMove(board);
  }

  cloneBoard (existingArray) {
    var numRows = existingArray.length;
    var newBoard = [];
    for (var i = 0; i < numRows; i++) {
      var newLine = [];
      for (var j = 0; j < numRows; j++) {
        newLine.push(j);
      }
      newBoard.push(newLine);
    }
    return newBoard;
  }

  // use minmax algorighm to build the perfect AI
  // AI win is +1 person win is -1
  computerMakeMove(board, player = true) {
    var numRows = board.length;
    this.setState({numNodes: this.state.numNodes++});
    var winner = this.checkWinner();
    if (winner !== null) {
      switch(winner) {
        case 1:
          // AI wins
          return [1, board]
        case 0:
          // opponent wins
          return [-1, board]
        case -1:
          // Tie
          return [0, board];
        default:
          return [0, board];
      }
    } else {
        // Next states
        var nextVal = null;
        var nextBoard = null;
        
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numRows; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
            var value = this.computerMakeMove(board, !player)[0];
            if ((player && (nextVal === null || value > nextVal)) || (!player && (nextVal === null || value < nextVal))) {
              nextBoard = board.map(function(arr) {
                  return arr.slice();
              });
              nextVal = value;
            }
            board[i][j] = null;
          }
        }
      }
      return [nextVal, nextBoard];
    }
  }
  
  render() {
    return (
      <div>
        <div className="wrapper">
          <div id="move">{this.state.myMove ? "Your move" : "AI's move"}</div>
          <Board onClick={this.cellClick} board={this.state.board}/>
          <input type="button" id="restart" value="Restart Game" onClick={this.restartGame}/>
          <div id="winner">{this.state.winner}</div>
        </div>
      </div>
    );
  }
}

export default App;
