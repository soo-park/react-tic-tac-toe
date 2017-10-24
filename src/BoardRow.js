import React from 'react';

const BoardRow = ({row, col, marking, onClick}) => {
  let id = "c" + row + col;
  return (
    <td><button className="place" id={id} onClick={onClick}>{marking === true ? "o" : marking === false ? "x": null}</button></td>
  )
};

export default BoardRow;
