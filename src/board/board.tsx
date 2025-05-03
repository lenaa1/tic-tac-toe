import grid from './../assets/grid.json';
import Lottie from 'lottie-react';
import { Cell } from '../components/Cell';
import { useEffect, useState } from 'react';
import './board.css';

export function Board() {
    const [winners, setWinner] = useState<number[] | null>(null);

    const [isComputerTurn, setComputerTurn] = useState(false);

    const [array, setArray] = useState<(string | null)[]>(Array(9).fill(null));

    function computerMove() {
        const emptyIndexes = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] === null) {
                emptyIndexes.push(i);
            }
        }
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);

        const newBoard = [...array];
        const index: string | number = emptyIndexes[randomIndex];
        newBoard[index] = 'cross';

        setArray(newBoard);
        checkWinner();
    }

    useEffect(() => {
        if (isComputerTurn && (!winners || winners.length === 0)) {
            const timer = setTimeout(() => {
                computerMove();
                setComputerTurn(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isComputerTurn]);

    const resetGame = () => {
        const newBoard = Array(9).fill(null);
        setArray(newBoard);
        setTimeout(() => {
            setWinner(null);
            newBoard[4] = 'cross';
            setArray([...newBoard]);
            setComputerTurn(false);
        }, 1500);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const newBoard = [...array];
            newBoard[4] = 'cross';
            setArray(newBoard);
            setComputerTurn(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        checkWinner();
    }, [array]);

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (array[a] && array[a] === array[b] && array[a] === array[c]) {
                setWinner([a, b, c]);
                setComputerTurn(false);
                setTimeout(() => {
                    resetGame();
                }, 3500);
                return;
            }
        }
        if (!array.includes(null) && winners == null) {
            setComputerTurn(false);
            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    };

    return (
        <div className="container">
            <div className="lottie">
                <Lottie animationData={grid} loop={false} />
            </div>
            <div className="grid">
                {array.map((el, index) => (
                    <Cell
                        winner={winners?.includes(index)}
                        status={el}
                        array={array}
                        setArray={setArray}
                        index={index}
                        isComputerTurn={isComputerTurn}
                        setComputerTurn={setComputerTurn}
                    />
                ))}
            </div>
        </div>
    );
}
