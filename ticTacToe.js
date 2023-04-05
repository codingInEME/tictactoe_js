
let reset = false;

let icons = [["✓", "rgb(107, 162, 245)"], ["X", "rgb(245, 107, 107)"]];
let board;
let player;
let gameEnd;
let move_count;
let win_index = [[-1, -1], [-1, -1], [-1, -1]];
let win_color = "rgb(107, 245, 165)";

function resetGame() {
    board = [
        [[-1], [-1], [-1]],
        [[-1], [-1], [-1]],
        [[-1], [-1], [-1]]
    ];
    player = 0;
    gameEnd = false;
    move_count = 0;
    reset = true;

    for (let i = 0; i < 3; i++) { // resetting the icon displayed on buttons
        for (let j = 0; j < 3; j++) {
            let id = '?' + i + j;
            let button = document.getElementById(id);
            button.textContent = "";
            button.style.backgroundColor = "blanchedalmond";
            button.style.border = "0.04em solid #000000";
        }
    }

    document.getElementById("start/reset").textContent = "Reset";
}

function display(button_id) {
    if (!reset) // cant make a move until play/reset button is pressed
        return 0;
    if (gameEnd)
        return 0;

    let row = button_id[1];
    let col = button_id[2];

    const button = document.getElementById(button_id);
    if (board[row][col] != -1) // if box is already marked then it is not marked again
        return 0;

    button.textContent = icons[player][0]; // setting the icon of button based on current player
    button.style.color = icons[player][1];
    button.style.textShadow = "0 0 0.03em #000000, 0 0 0.06em #000000";
    move_count++; // tracks total amount of moves made

    if (hasWon(button)) {
        displayWin();
        gameEnd = true;
    }
    else if (move_count >= 9) { // nested under win condition, if moves are full and no win, it is a draw
        alert("Game is a draw!");
        gameEnd = true;
    }

    player = (player + 1) % 2; // player value oscillates from 0 to 1
}

function displayWin() {
    let button;
    for (let i = 0; i < 3; i++) { // changing the color of won buttons to wining color
        button = document.getElementById('?' + win_index[i][0] + win_index[i][1]);
        button.style.backgroundColor = win_color;
        button.style.border = "0.02em solid #ffa845";
    }
    alert("Player " + icons[player][0] + " has won!");
}

function hasWon(button) {

    // value contains a two digit number having row first and column as second digit
    let row = button.value[1]; // to isolate the left value
    let col = button.value[2]; // to isolate the right most value
    board[row][col] = player; // updating board with player mark
    let check;

    // checking for any win situation
    // case 1: any one row is same
    for (let i = 0; i < 3; i++) {
        check = 0;
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == player) {
                check++;
                win_index[j] = [i, j];
            }
        }
        if (check >= 3)
            return true;
    }

    // case 2: any one column is same
    for (let j = 0; j < 3; j++) {
        check = 0;
        for (let i = 0; i < 3; i++) {
            if (board[i][j] == player) {
                check++;
                win_index[i] = [i, j];
            }
        }
        if (check >= 3)
            return true;
    }

    // case 3: major diagonal is same
    check = 0;
    for (let i = 0; i < 3; i++) {
        if (board[i][i] == player)
            check++;
    }
    if (check >= 3) {
        win_index = [[0, 0], [1, 1], [2, 2]];
        return true;
    }

    // case 4: minor diagonal is same
    check = 0;
    for (let i = 0; i < 3; i++) {
        if (board[i][2 - i] == player)
            check++;
    }
    if (check >= 3) {
        win_index = [[0, 2], [1, 1], [2, 0]];
        return true;
    }

    return false; // if all cases fail false is returned
}