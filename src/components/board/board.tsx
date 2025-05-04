import grid from '../../assets/grid.json';
import Lottie from 'lottie-react';
import { Cell } from '../cell/Cell';
import { useEffect, useState } from 'react';
import './board.css';
import { useComputerMove } from '../../hooks/useComputerMove';
import { useCheckWinner } from '../../hooks/useCheckWinner';

export function Board() {
    const [winners, setWinner] = useState<number[] | null>(null);

    const [isComputerTurn, setComputerTurn] = useState<boolean>(false);

    const [array, setArray] = useState<(string | null)[]>(Array(9).fill(null));

    const [willFade, setWillFade] = useState<boolean>(false);

    const computerMove = useComputerMove({ array, setArray });

    const checkWinner = useCheckWinner({
        array,
        setArray,
        winners,
        setWinner,
        setComputerTurn,
        setWillFade
    });

    useEffect(() => {
        if (isComputerTurn && (!winners)) {
            const timer = setTimeout(() => {
                computerMove();
                setComputerTurn(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isComputerTurn]);

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

    return (
        <div className="container">
            <div className="lottie">
                <Lottie animationData={grid} loop={false} />
            </div>
            <div className={`grid ${willFade ? 'fade-out' : ''}`}>
                {array.map((el, index) => (
                    <Cell
                        winner={winners?.includes(index)}
                        status={el}
                        array={array}
                        setArray={setArray}
                        index={index}
                        isComputerTurn={isComputerTurn}
                        setComputerTurn={setComputerTurn}
                        setWillFade={setWillFade}
                    />
                ))}
            </div>
        </div>
    );
}
