import cross from '../../assets/cross.json';
import oval from '../../assets/oval.json';
import Lottie from 'lottie-react';
import './cell.css';

type CellProps = {
    status: string | null;
    array: (string | null)[];
    setArray: React.Dispatch<React.SetStateAction<(string | null)[]>>;
    index: number;
    isComputerTurn: boolean;
    setComputerTurn: React.Dispatch<React.SetStateAction<boolean>>;
    winner: boolean | undefined;
    setWillFade: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Cell({
    status,
    array,
    setArray,
    index,
    isComputerTurn,
    setComputerTurn,
    winner,
    setWillFade
}: CellProps) {
    function handleClick(index: number) {
        if (array[index] == null && !isComputerTurn) {
            const newBoard = [...array];
            newBoard[index] = 'oval';
            setArray(newBoard);
            setComputerTurn(true);
        }
    }


    let cell;

    if (array[index] == 'oval') {
        cell = <Lottie animationData={oval} loop={false} />;
    } else if (array[index] == 'cross') {
        cell = <Lottie animationData={cross} loop={false} />;
    }

    return (
        <div className="cell" onClick={() => handleClick(index)}>
            {status != null ? (
                <div
                    style={{
                        width: 70,
                        height: 70,
                    }}
                    className={winner ? 'blink' : ''}
                    onAnimationEnd={() => {
                        setWillFade(true);
                      }}
                >
                    {cell}
                </div>
            ) : (
                <div style={{ width: 85, height: 85 }}></div>
            )}
        </div>
    );
}
