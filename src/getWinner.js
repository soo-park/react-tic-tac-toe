export default function getWinner(board) {
  // Check if someone won
  var vals = [true, false];
  var allNotNull = true;
  for (var k = 0; k < vals.length; k++) {
      var value = vals[k];
      
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