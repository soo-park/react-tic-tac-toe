import React from 'react';
import BoardCell from './BoardCell.js';

const BoardRow = ({onClick, row, rowNum}) => {
  return (
    <tr>
      {row.map((cell, colNum) => <BoardCell rowNum={rowNum} colNum={colNum} onClick={onClick} marking={cell} key={colNum} />)}
    </tr>
  );
}

export default BoardRow;
