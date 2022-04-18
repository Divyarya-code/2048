import React, { useState } from 'react';
import Tile from './Tile';
import Cell from './Cell';
import { Board } from '../helper';
import useEvent from '../hooks/useEvent';
import GameOverlay from './GameOverlay';


const BoardView = () => {
    const [board, setBoard] = useState(new Board());

    const handlekeyDown = (event) => {
        if(board.hasWon()){
            return;
        }

        if(event.keyCode >= 37 && event.keyCode <= 40){
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvent("keydown",handlekeyDown);

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex}/>
                })}
            </div>
        )
    });

    const tiles = board.tiles.filter((tile)=>tile.value !== 0).map((tile,index)=>{
        return <Tile tile={tile} key={index}/>
    })

    const resetGame = () => {
        setBoard(new Board());
    }

    return (
        <div>
            <div className='Rules'>
                <h1> How To Play </h1>
                <p>Use your arrow keys to move the tiles.</p>
                <p>When two tiles with the same number touch, they merge into one!</p>
                <p>Reach max Tile Value 2048 to win the game.</p>

            </div>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>New Game</div>
                <div className='score-box'>
                    <div className='score-title'>SCORE</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className='board'>
                {cells}
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
        </div>
    )
};


export default BoardView