import React from 'react';
import BoardRow from './BoardRow.js';

const Board = ({board, onClick}) => {
  return (
    <table>
      <tbody>
        {board.map((row, rowNum) => <BoardRow row={row} onClick={onClick} rowNum={rowNum} key={rowNum} />)}
      </tbody>
    </table>
  );
}

export default Board;
