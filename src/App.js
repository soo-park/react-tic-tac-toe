import React, { Component } from 'react';
import $ from 'jquery';
import Board from './Board.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      myMove: false,
      numNodes: 0,
      winner: ""
    }
    this.cellClick = this.cellClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.updateMove = this.updateMove.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
    this.getWinner = this.getWinner.bind(this);
    this.MinMaxMove = this.MinMaxMove.bind(this);
    this.recurseMinMax = this.recurseMinMax.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  cellClick(event) {
    event.preventDefault();
    let board = this.state.board;
    var cell = event.target.id;
    var row = parseInt(cell[1], 10);
    var col = parseInt(cell[2], 10);
    if (!this.state.myMove) {
      board[row][col] = false;
      this.setState({
        board: board,
        myMove: true
      });
      this.updateButtons();
      this.updateMove();
      this.makeMove();
    }

  }

  makeMove(board) {
    this.setState( {board: this.MinMaxMove(this.state.board)});
    this.setState({myMove: false});
    this.updateMove();
  }
  
  updateButtons() {
    let board = this.state.board;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
      $("#c" + i + "" + j).text(this.state.board[i][j] === false ? "x" : this.state.board[i][j] === true ? "o" : "");
      }
    }
    this.setState({board: board});
  }
  
  updateMove() {
    this.updateButtons(); 
    this.setState({ winner: this.getWinner(this.state.board) });
    this.setState({ winner: this.state.winner === 1 ? "You lose" : this.state.winner === 0 ? "You won" : this.state.winner === -1 ? "Tie" : "" });
    this.setState({ myMove: this.state.myMove? "AI's Move" : "Your move" });
  }
  
  restartGame() {
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      myMove: false,
      numNodes: 0,
      winner: ""
    })
    this.updateButtons();
  }
  
  componentWillMount() {
    if(this.state.myMove) {
      this.makeMove();
    }
  }

  getWinner(board) {
    // Check if someone won
    var vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];   
        // Check rows, columns, and diagonals
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
          if (board[i][i] !== value) {
            diagonalComplete1 = false;
          }
          if (board[2 - i][i] !== value) {
            diagonalComplete2 = false;
          }
          var rowComplete = true;
          var colComplete = true;
          for (var j = 0; j < 3; j++) {
            if (board[i][j] !== value) {
                rowComplete = false;
            }
            if (board[j][i] !== value) {
                colComplete = false;
            }
            if (board[i][j] === null) {
                allNotNull = false;
            }
          }
          if (rowComplete || colComplete) {
            return value ? 1 : 0;
          }
        }
        if (diagonalComplete1 || diagonalComplete2) {
          return value ? 1 : 0;
        }
    }
    if (allNotNull) {
      return -1;
    }
    return null;
  }
    
  MinMaxMove(board, myMove) {
    this.setState({numNodes: 0});
    return this.recurseMinMax(board, true)[1];
  }
  
  recurseMinMax(board, player) {
    this.setState({
      numNodes: this.state.numNodes++,
      winner: this.getWinner(board)
    });
    if (this.state.winner !== null) {
      switch(this.state.winner) {
        case 1:
          return [1, board]
        case 0:
          return [-1, board]
        case -1:
          return [0, board];
        default:
          return [0, board];
      }
    } else {
        var nextVal = null;
        var nextBoard = null;
        
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
            var value = this.recurseMinMax(board, !player)[0];
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
          <Board onClick={this.onClick}/>
          <input type="button" id="restart" value="Restart Game" onClick={this.restartGame}/>
          <div id="winner">{this.state.winner}</div>
        </div>
      </div>
    );
  }
}

export default App;
