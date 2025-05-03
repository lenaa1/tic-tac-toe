type ComputerMoveProps = {
    array: (string | null)[];
    setArray: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

export function useComputerMove({array, setArray} : ComputerMoveProps) {
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
    }

    return computerMove;
}
