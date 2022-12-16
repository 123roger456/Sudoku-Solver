import React from 'react'
import { useEffect, useState } from "react";
import { solve, validate } from '../Functions/Functions';
import axios from "axios";
function Grid() {
  const g = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
  ]
const res = false 
    const getDeepCopy = (arr) => {
      return JSON.parse(JSON.stringify(arr));
    }
  const [exArr, setExArr] = useState(getDeepCopy(g));
  console.log(process.env)
  const options = {
    
    method: 'GET',
    url: 'https://sudoku-board.p.rapidapi.com/new-board',
    params: {diff: '2', stype: 'list', solu: 'true'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ,
      'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com'
    }
  };


  const newGrid = () => {
    let temp = []
      axios.request(options).then(function (response) {
          console.log(response.data.response["unsolved-sudoku"]);
          temp = response.data.response["unsolved-sudoku"]
          for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
              if (temp[i][j] === 0){
                g[i][j] = "."
              }else{
                g[i][j] = temp[i][j].toString()
              }
            }
          }
          setExArr(getDeepCopy(g))
          setGrid(g)
      }).catch(function (error) {
          console.error(error);
      });
  }   
      
      const [grid, setGrid] = useState(getDeepCopy(exArr))
      const setValue = (r, c, e) =>{
        const bp = e.nativeEvent.data
    
        const val = parseInt(e.target.value) || -1
        if (val >= 1 && val <= 9){
          grid[r][c] = val
        } 
        else if (bp == null){
          grid[r][c] = "."
        }
        else{
          alert("Wrong input");
          return
        }
        setGrid(getDeepCopy(grid))
      }

      const validateBtn = () => {
        console.log(validate(getDeepCopy(grid)))
        const [res, i, j, complete] = validate(getDeepCopy(grid))
        if (res && complete){
          console.log("Completed")
          alert("Completed")
        }
        else if (res){
          console.log("All good")
          alert("All good, please continue to solve")
        }else{
          const wrongCell = document.getElementById("cell "+i+" "+j)
          const defaultColor = wrongCell.style.backgroundColor
          wrongCell.style.backgroundColor = "red"
          setTimeout(() => wrongCell.style.backgroundColor = defaultColor, 5000)
        }
      } 
    

  return (
    <div className="grid">
      <table>
        <tbody>
      {
        [0,1,2,3,4,5,6,7,8].map((row, rIndex) => {
          return <tr key = {rIndex} className={(row +1)%3 === 0? "borderR":""}>

          {[0,1,2,3,4,5,6,7,8].map((col, cIndex) => {
            return <td key={cIndex} className={(col +1)%3 === 0? "borderC":""}>
              <input id={"cell "+row+" "+col} className="cell" onChange={(event) => setValue(row, col, event)} value={grid[row][col] === "." ? '' : grid[row][col]} disabled={exArr[row][col] !== '.'} />
            </td>
          })}
          </tr>
        })

        }
        </tbody>
      </table>
        <button className='button' onClick={() => setGrid(solve(getDeepCopy(exArr)))}>Solver option</button>
        <button className='button' onClick={() => newGrid()}>New Grid</button>
        <button className='button' onClick={() => validateBtn()}>Validate Sudoku</button>
      </div>
  )
}

export default Grid


