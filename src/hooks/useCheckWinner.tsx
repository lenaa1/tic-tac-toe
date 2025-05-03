type CheckWinnerProps = {
    array: (string | null)[];
    setArray: React.Dispatch<React.SetStateAction<(string | null)[]>>;
    winners: number[] | null;
    setWinner: React.Dispatch<React.SetStateAction<number[] | null>>;
    setComputerTurn: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCheckWinner({
    array,
    setArray,
    winners,
    setWinner,
    setComputerTurn,
}: CheckWinnerProps) {
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

    return checkWinner;
}
