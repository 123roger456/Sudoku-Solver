import React, {useState} from "react";
const solve = (board) => {
  
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

const validate = (board) => {
    const set = new Set()
    let complete = true
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            const value = board[i][j]
            if(value !== "."){
                const rowString = `${value} at row ${i}`
                const colString = `${value} at col ${j}`
                const boxString = `${value} at box ${Math.floor(i/3)}, ${Math.floor(j/3)}`
                if(set.has(rowString) || set.has(colString) || set.has(boxString)){
                    return [false,i,j, complete]
                }else{
                    set.add(rowString)
                    set.add(colString)
                    set.add(boxString)
                }
            }
            else{
              complete = false
            }
        }
    }

    return [true, -1, -1, complete]
}

export {solve, validate}