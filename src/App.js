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
    } else {
      this.checkWinner();
      this.forceUpdate();
    }

    this.computerMakeMove(this.state.board);
  }

  checkWinner() {
    // refactor to switch statement if(winner !== null)
    if (getWinner(this.state.board) !== null){
      this.setState({winner: "AI won"});
    } else if (getWinner(this.state.board) === 1) {
      this.setState({winner: "You won"});
    } else if (getWinner(this.state.board) === -1){
      this.setState({winner: "Game ended tie"});
    } else {
      this.setState({winner: "Error"});
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

  computerMakeMove(board) {
    var numNodes = this.state.numNodes;
    var player = this.state.myMove ? 1: 0;
    numNodes++;
    
    var winner = this.checkWinner(board);
    if (winner !== null) {
      var nextVal = null;
      var nextBoard = null;
    
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
            var value = this.computerMakeMove(board, !player)[0];
            if ((player && (nextVal === null || value > nextVal)) || 
                (!player && (nextVal === null || value < nextVal))) {
              nextBoard = board.map(function(arr) {
                  return arr.slice();
              });
              nextVal = value;
            }
            board[i][j] = null;
          }
        }
      }
      this.setState({
        numNodes: numNodes,
        myMove: !this.state.myMove
      });
    }
    return [nextVal, nextBoard];
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
