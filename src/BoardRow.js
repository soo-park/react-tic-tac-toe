import React from 'react';

const BoardRow = ({row, col, marking, onClick}) => {
  let id = "c" + row + col;
  return (
    // onClick={onClick} after fixing the bug on minmax react
    <td><button className="place" id={id}>{marking === true ? "o" : marking === false ? "x": null}</button></td>
  )
};

export default BoardRow;
