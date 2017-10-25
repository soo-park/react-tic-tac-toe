import React, { Component } from 'react';
import Board from './Board.js';
import getWinner from './getWinner.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      myMove: true,
      numNodes: 0,
      winner: ""
    }
    this.cellClick = this.cellClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  cellClick(event) {
    event.preventDefault();
    let board = this.state.board;
    let cell = event.target.id;
    let row = parseInt(cell[1], 10);
    let col = parseInt(cell[2], 10);

    if (getWinner(this.state.board) === null) {
      if (board[row][col] === null) {
        this.state.myMove ? board[row][col] = true : board[row][col] = false
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
    // refactor to switch statement if(winner !== null)
    if (getWinner(this.state.board) === null) {
      return null;
    } else if (getWinner(this.state.board) === 0){
      return "AI won";
    } else if (getWinner(this.state.board) === 1) {
      return "You won";
    } else if (getWinner(this.state.board) === -1){
      return "Game ended tie";
    } else {
      return "Error";
    }
  }

  restartGame() {
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
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
    var newBoard = [];
    for (var i = 0; i < 3; i++) {
      var newLine = [];
      for (var j = 0; j < 3; j++) {
        newLine.push(j);
      }
      newBoard.push(newLine);
    }
    return newBoard;
  }

  // use minmax algorighm to build the perfect AI
  computerMakeMove(board, player = false) {
    let winner = this.checkWinner();
    if (winner === null) {
      let scores = [];
      let moves = [];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
          }
        }
      }

      if (moves.length < 10) {
        console.log(scores, moves, this.state.board);
      }
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
