import React from 'react';
import BoardRow from './BoardRow.js';

const Board = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <BoardRow row={0} col={0} onClick={props.onClick} marking={props.board[0][0]}/>
          <BoardRow row={0} col={1} onClick={props.onClick} marking={props.board[0][1]}/>
          <BoardRow row={0} col={2} onClick={props.onClick} marking={props.board[0][2]}/>
        </tr>
        <tr>
          <BoardRow row={1} col={0} onClick={props.onClick} marking={props.board[1][0]}/>
          <BoardRow row={1} col={1} onClick={props.onClick} marking={props.board[1][1]}/>
          <BoardRow row={1} col={2} onClick={props.onClick} marking={props.board[1][2]}/>
        </tr>
        <tr>
          <BoardRow row={2} col={0} onClick={props.onClick} marking={props.board[2][0]}/>
          <BoardRow row={2} col={1} onClick={props.onClick} marking={props.board[2][1]}/>
          <BoardRow row={2} col={2} onClick={props.onClick} marking={props.board[2][2]}/>
        </tr>
      </tbody>
    </table>
  );
}

export default Board;
