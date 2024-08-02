console.log("In Script");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart_button");

const win_condition=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let current_player = "X";
let running = false;

// initializeGame();

function initializeGame(){
    console.log("in game");
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    
    restartBtn.addEventListener("click", restartGame);
    
    statusText.textContent = `${current_player}'s Turn`;
    running = true;

}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex]!= "" || !running){
        return;
    }
    
    updateCell(this,cellIndex);
    
    checkWinner();
}

function updateCell(cell, index){
    options[index] = current_player;
    cell.textContent = current_player;
}

function changePlayer(){
    current_player = (current_player == "X") ? "O" : "X";
    statusText.textContent = `${current_player}'s Turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i<win_condition.length; i++){
        const condition = win_condition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${current_player} Won`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }

}

function restartGame(){
    current_player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${current_player}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

initializeGame();