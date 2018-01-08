let sudokuPuzzles = [
    {
        unsolved: [
            [null, null, null, 2, 6, null, 7, null, 1],
            [6, 8, null, null, 7, null, null, 9, null],
            [1, 9, null, null, null, 4, 5, null, null],
            [8, 2, null, 1, null, null, null, 4, null],
            [null, null, 4, 6, null, 2, 9, null, null],
            [null, 5, null, null, null, 3, null, 2, 8],
            [null, null, 9, 3, null, null, null, 7, 4],
            [null, 4, null, null, 5, null, null, 3, 6],
            [7, null, 3, null, 1, 8, null, null, null]
        ],
        solved: [
            [4, 3, 5, 2, 6, 9, 7, 8, 1],
            [6, 8, 2, 5, 7, 1, 4, 9, 3],
            [1, 9, 7, 8, 3, 4, 5, 6, 2],
            [8, 2, 6, 1, 9, 5, 3, 4, 7],
            [3, 7, 4, 6, 8, 2, 9, 1, 5],
            [9, 5, 1, 7, 4, 3, 6, 2, 8],
            [5, 1, 9, 3, 2, 6, 8, 7, 4],
            [2, 4, 8, 9, 5, 7, 1, 3, 6],
            [7, 6, 3, 4, 1, 8, 2, 5, 9]
        ]
    }
];

function scanPuzzle(row, rowLength) {

    let uniqueNumbers = [],
        foundNumbers = [];

    for(var columnIndex = 0; columnIndex < rowLength; columnIndex++) {

    for(var rowIndex = 0; rowIndex < rowLength; rowIndex++) {

        foundNumbers = scanGrid(row, rowIndex, columnIndex, rowLength);

        uniqueNumbers = scanRow(row[columnIndex], foundNumbers, columnIndex, rowLength);

        uniqueNumbers = scanColumn(row, uniqueNumbers, rowIndex, rowLength);

        //if value is null/empty
        if(row[columnIndex][rowIndex] === null) {

            if(uniqueNumbers.length > 1) {


            } else {

                uniqueNumbers = uniqueNumbers[0];
                
            }

            row[columnIndex][rowIndex] = uniqueNumbers;

        } 
        //if value is an array of possibilities
        else if(Array.isArray(row[columnIndex][rowIndex])) {

            uniqueNumbers = uniqueNumbers[0];

            row[columnIndex][rowIndex] = uniqueNumbers;

        }

    } 

}

    return row;

}

function scanGrid(row, rowIndex, columnIndex, rowLength) {

    var foundNumbers = [],
        rowFrom = 0,
        rowTo = 0,
        columnFrom = 0,
        columnTo = 0;

    for(var gridIndexColumn = 0; gridIndexColumn < rowLength / 3; gridIndexColumn++) {

        for(var gridIndexRow = 0; gridIndexRow < rowLength / 3; gridIndexRow++) {
            
            if(row[gridIndexColumn][gridIndexRow] !== null) {

                foundNumbers.push(row[gridIndexColumn][gridIndexRow]);

            }

        }

    }

    return foundNumbers;

}

function scanRow(row, foundNumbers, columnIndex, rowLength) {

    var uniqueNumbers = [];

    console.log(foundNumbers);

    for(var rowValue = 0; rowValue < rowLength; rowValue++) {

        if(row.indexOf(rowValue + 1) === -1 && foundNumbers.indexOf(rowValue + 1) === -1) {

            uniqueNumbers.push(rowValue + 1);
            
        } 

    }

    return uniqueNumbers;

}

function scanColumn(column, uniqueNumbers, rowIndex, rowLength) {

    //scan columns for any matches to numbers which aren't found
    for(var scanColumns = 0; scanColumns < rowLength; scanColumns++) {

        //scan columns, any matching unique numbers will be omitted
        if(uniqueNumbers.indexOf(column[scanColumns][rowIndex]) > -1) {

            uniqueNumbers = uniqueNumbers.filter(index => index !== column[scanColumns][rowIndex]);
        
        }

    }

    return uniqueNumbers;

}

function checkValid(column, rowLength) {

    var tempArray = [];

    for(var rowIndex = 0; rowIndex < rowLength; rowIndex++) {

        if(column[rowIndex] === undefined) {

            return false;

        } 

    }

    return true;
    
}

let solvePuzzle = (puzzle) => {

    var rowLength = puzzle[0].length;
    
    scanPuzzle(puzzle, rowLength);
    scanGrid(puzzle, rowLength);

    console.log(puzzle);

    return puzzle;
}

console.log(solvePuzzle(sudokuPuzzles[0].unsolved) == sudokuPuzzles[0].solved);

// sudokuPuzzles.forEach(

//     (puzzle, index) => {

//         console.log(

//             `===== TEST ${index + 1} =====\nResult: ${solvePuzzle(puzzle.unsolved) === puzzle.solved}`,
//             solvePuzzle(puzzle.unsolved),
//             puzzle.unsolved,
//             puzzle.solved

//         )
//     }
    
// );

