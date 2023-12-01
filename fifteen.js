var moves = 0;

var ids = [
    "one", "two", "three", "four",
    "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

var shuffled = ids.slice();

var ids_numeric = {
    "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16
};

var selected_background;

var movement = [
    [0, 1, 1, 0],  
    [0, 1, 1, 1],  
    [0, 1, 1, 1], 
    [0, 0, 1, 1],  
    [1, 1, 1, 0], 
    [1, 1, 1, 1],  
    [1, 1, 1, 1],  
    [1, 0, 1, 1],  
    [1, 1, 1, 0],  
    [1, 1, 1, 1],  
    [1, 1, 1, 1],  
    [1, 0, 1, 1],  
    [1, 1, 0, 0],  
    [1, 1, 0, 1],  
    [1, 1, 0, 1],  
    [1, 0, 0, 1]  
];

// Add a variable to track if the game has started
let gameStarted = false;



function initializeGame() {
    // Select a random background on startup
    var backgrounds = ["mario", "kitty"];
    selected_background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + selected_background;
    }
    // Remove the hover effect initially
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('active'));

    // Set the selected background in the dropdown
    document.getElementById("backgroundSelector").value = selected_background;
}

// Function to change the background based on selection
function changeBackground() {
    selected_background = document.getElementById("backgroundSelector").value;

    // Update the tiles with the selected background without starting the game
    updateBackground();
}

// Create a new function to update the background without starting the game
function updateBackground() {
    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + selected_background;
    }

    // Remove the hover effect
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('active'));
}


function shuffleBoard() {
    shuffled = ids.slice();
    var sixteen = 15;

    for (var i = 0; i < 500; i++) {
        var movement_id = Math.floor((Math.random() * 4));

        while (movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        var move_to;

        switch (movement_id) {
            case 0:
                move_to = sixteen - 4;break;

            case 1:
                move_to = sixteen + 1;break;

            case 2:
                move_to = sixteen + 4;break;

            case 3:
                move_to = sixteen - 1; break;
        }

        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();
    // add hover effect after shuffling
    document.querySelectorAll('.tile').forEach(tile => tile.classList.add('active'));
    gameStarted = true; 
}

function displayBoard() {
    const mainElement = document.getElementById("main");
    mainElement.style.transition = "transform 0.5s ease";
    mainElement.innerHTML = ""; 
    const tilesHTML = [];
    for (var i = 0; i < shuffled.length; i++) {
        var tileHTML;
        if (shuffled[i] == "") {
            tileHTML = '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            tileHTML = '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
        tilesHTML.push(tileHTML);
    }

    // Update the board with tiles HTML
    mainElement.innerHTML = tilesHTML.join("");

    // Reapply hover effect class to numbered tiles
    const numberedTiles = document.querySelectorAll('.tile:not(#sixteen)');
    numberedTiles.forEach(tile => tile.classList.add('active'));

    for (var j = 0; j < 4; j++) {
        var clickable_id;

        if (movement[shuffled.indexOf("")][j] == 1) {
            clickable_id = shuffled.indexOf("") + (j === 2 ? 4 : (j === 3 ? -1 : (j === 0 ? -4 : 1)));
            document.getElementById(shuffled[clickable_id]).className += " clickable";
            document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
        }
    }
}

function swapPieces(clickable_id, empty_id) {
    var temp = shuffled[empty_id]; // put empty into temp
    // look up shuffled
    shuffled[empty_id] = shuffled[clickable_id]; // put tile into empty
    shuffled[clickable_id] = temp; // put empty in original tile position

    moves++;

    displayBoard();
}
