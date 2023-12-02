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
var shuffleMoves = [];


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
    var backgrounds = ["mario", "kitty", "flower", "tswift"];
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

    // Load the audio element
    const audio = document.getElementById('backgroundMusic');
    audio.load();

    // Reset moves count and display
    moves = 0;
    document.getElementById('moves').innerText = moves;

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

        audio.play();
        document.querySelectorAll('.tile').forEach(tile => tile.classList.add('active'));

        gameStarted = true;
    }

    displayBoard();
    stopTimer(); // Reset the timer
    seconds = 0; // Reset the seconds count to zero
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = formatTime(seconds);
    startTimer(); // Start the timer
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

    const emptyIndex = shuffled.indexOf("");

    for (var i = 0; i < shuffled.length; i++) {
        if (i !== emptyIndex) {
            const rowDiff = Math.floor(emptyIndex / 4) - Math.floor(i / 4);
            const colDiff = (emptyIndex % 4) - (i % 4);

            if (rowDiff === 0 || colDiff === 0) {
                document.getElementById(shuffled[i]).classList.add('clickable');
                document.getElementById(shuffled[i]).setAttribute("onclick", "swapPieces(" + i + ", " + emptyIndex + ")");
            }
        }
    }
}
// function changeWebsiteBackground() {
//     const selectedBackground = document.getElementById("WebBackgroundSelector").value;
//     document.body.style.backgroundImage = `url('path/to/${selectedBackground}.gif')`;
// }

function formatTime(seconds) {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }

function swapPieces(clickable_id, empty_id) {
    const emptyIndex = shuffled.indexOf("");
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const clickedRow = Math.floor(clickable_id / 4);
    const clickedCol = clickable_id % 4;

    if (emptyRow === clickedRow || emptyCol === clickedCol) {
        let currentIndex = emptyIndex;
        while (currentIndex !== clickable_id) {
            let moveIndex;
            if (emptyRow === clickedRow) {
                if (emptyCol < clickedCol) {
                    moveIndex = currentIndex + 1;
                } else {
                    moveIndex = currentIndex - 1;
                }
            } else if (emptyCol === clickedCol) {
                if (emptyRow < clickedRow) {
                    moveIndex = currentIndex + 4;
                } else {
                    moveIndex = currentIndex - 4;
                }
            }

            const temp = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[moveIndex];
            shuffled[moveIndex] = temp;

            currentIndex = moveIndex;
            emptyIndex = currentIndex;
            emptyRow = Math.floor(emptyIndex / 4);
            emptyCol = emptyIndex % 4;

            moves++;
        }
    }

    displayBoard();
}



function isPuzzleSolved() {
    for (let i = 0; i < shuffled.length - 1; i++) {
        if (shuffled[i] !== ids[i]) {
            return false;
        }
    }

    // Game is solved
    stopTimer(); // Stop the timer when the game is complete
    endGameNotification(); // Function to handle end-of-game notification
    return true;
}

function endGameNotification() {
    // Display an image or modify the appearance of the page to notify the end of the game
    // For example, change the background color to indicate success
    document.body.style.backgroundColor = 'lightgreen';
}

