import React from 'react';

const Board = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td><button className="place" id="c00" onClick={props.onClick}></button></td>
          <td><button className="place" id="c01" onClick={props.onClick}></button></td>
          <td><button className="place" id="c02" onClick={props.onClick}></button></td>
        </tr>
        <tr>
          <td><button className="place" id="c10" onClick={props.onClick}></button></td>
          <td><button className="place" id="c11" onClick={props.onClick}></button></td>
          <td><button className="place" id="c12" onClick={props.onClick}></button></td>
        </tr>
        <tr>
          <td><button className="place" id="c20" onClick={props.onClick}></button></td>
          <td><button className="place" id="c21" onClick={props.onClick}></button></td>
          <td><button className="place" id="c22" onClick={props.onClick}></button></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Board;
