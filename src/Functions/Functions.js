const solve = (board) => {
  console.log(board)
    solver(board);
    return board
}

function solver(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === '.') {
        for (let c = 1; c <= 9; c++) {
          if (isValid(board, i, j, c.toString())) {
            board[i][j] = c + "";
            if (solver(board) === true) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(board, row, col, c) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === c) {
      return false;
    }
    if (board[i][col] === c) {
      return false;
    }
    let firstRow = 3 * Math.floor(row / 3);
    let firstCol = 3 * Math.floor(col / 3);
    if (board[firstRow + Math.floor(i / 3)][firstCol + i % 3] === c) {
      return false;
    }
  }
  return true;
}

export {solve}