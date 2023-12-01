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

function initializeGame() {
    selected_background = "mario";
    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + selected_background;
    }
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
}

function displayBoard() {
    document.getElementById("main").innerHTML = ""; 
    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
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
    var temp = shuffled[empty_id];
    shuffled[empty_id] = shuffled[clickable_id];
    shuffled[clickable_id] = temp;

    moves++;

    displayBoard();
}
