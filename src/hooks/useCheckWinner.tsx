type CheckWinnerProps = {
    array: (string | null)[];
    setArray: React.Dispatch<React.SetStateAction<(string | null)[]>>;
    winners: number[] | null;
    setWinner: React.Dispatch<React.SetStateAction<number[] | null>>;
    setComputerTurn: React.Dispatch<React.SetStateAction<boolean>>;
    setWillFade: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCheckWinner({
    array,
    setArray,
    winners,
    setWinner,
    setComputerTurn,
    setWillFade,
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

        let hasWinner = false;

        for (let line of lines) {
            const [a, b, c] = line;
            if (array[a] && array[a] === array[b] && array[a] === array[c]) {
                setWinner([a, b, c]);
                WinAnimation(3000);
                hasWinner = true;
                break;
            }
        }

        if (!hasWinner && !array.includes(null) && winners == null) {
            setWillFade(true);
            WinAnimation(2000);
        }
    };

    function WinAnimation(time: number) {
        setComputerTurn(false);
        setTimeout(() => {
            resetGame();
            setWillFade(false);
        }, time);
    }

    return checkWinner;
}
