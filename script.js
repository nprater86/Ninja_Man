//World Creation
var worldGenerator = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2],
    [2,3,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,3,2],
    [2,1,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,1,2],
    [2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2],
    [2,2,2,2,1,2,2,2,0,2,0,2,2,2,1,2,2,2,2],
    [0,0,0,2,1,2,2,2,0,2,0,2,2,2,1,2,0,0,0],
    [2,2,2,2,1,2,0,0,0,0,0,0,0,2,1,2,2,2,2],
    [0,0,0,0,1,0,0,2,2,4,2,2,0,0,1,0,0,0,0],
    [2,2,2,2,1,2,0,2,0,0,0,2,0,2,1,2,2,2,2],
    [0,0,0,2,1,2,0,2,2,2,2,2,0,2,1,2,0,0,0],
    [0,0,0,2,1,2,0,0,0,0,0,0,0,2,1,2,0,0,0],
    [2,2,2,2,1,2,0,2,2,2,2,2,0,2,1,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,1,2],
    [2,3,1,2,1,1,1,1,1,0,1,1,1,1,1,2,1,3,2],
    [2,2,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,2,2],
    [2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2],
    [2,1,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
var world = document.getElementById('world');

var score = 0;
var scoreDisplay = document.getElementById('score');

function displayWorld(){
    var output = '';

    for(var i = 0; i < worldGenerator.length; i++){
        output += `<div class="row">`;
        for(var j = 0; j < worldGenerator[i].length; j++) {
            if(worldGenerator[i][j] === 0){
                output += `<div class="blank"></div>`;
            } else if(worldGenerator[i][j] === 1) {
                output += `<div class="coin"></div>`
            } else if(worldGenerator[i][j] === 2 || worldGenerator[i][j] === 4) {
                output += `<div class="brick"></div>`
            } else if(worldGenerator[i][j] === 3) {
                output += `<div class="cherry"></div>`
            }
        }
        output += `</div>`;
    }
    world.innerHTML = output;
}

displayWorld();

//Pacman Position and Move Pacman
var pacman = document.getElementById('pacman');
var pacmanX = 9;
var pacmanY = 17;
pacman.style.top = `${pacmanY*40}px`;
pacman.style.left = `${pacmanX*40}px`;

document.addEventListener("keydown", movePacman);

function movePacman() {
    if (event.keyCode === 40 && worldGenerator[pacmanY+1][pacmanX] != 2 && worldGenerator[pacmanY+1][pacmanX] != 4){ //move down
        pacmanY++;
        pacman.style.top = `${pacmanY*40}px`;
        pacman.style.transform = `rotate(90deg)`;
    } else if(event.keyCode === 38  && worldGenerator[pacmanY-1][pacmanX] != 2){ //move up
        pacmanY--;
        pacman.style.top = `${pacmanY*40}px`;
        pacman.style.transform = `rotate(-90deg)`;
    } else if(event.keyCode === 39  && worldGenerator[pacmanY][pacmanX+1] != 2 && pacmanX < 18){ //move right
        pacmanX++;
        pacman.style.left = `${pacmanX*40}px`;
        pacman.style.transform="scaleX(1)";
    } else if(event.keyCode === 37 && worldGenerator[pacmanY][pacmanX-1] != 2 && pacmanX > 0){ //move left
        pacmanX--;
        pacman.style.left = `${pacmanX*40}px`;
        pacman.style.transform = "scaleX(-1)";
    } else if(event.keyCode === 39  && pacmanX === 18 && pacmanY === 10){ //move to left of screen if goes through right corridor
        pacmanX = 0;
        pacman.style.left = `${pacmanX*40}px`;
        pacman.style.transform="scaleX(1)";
    } else if(event.keyCode === 37  && pacmanX === 0 && pacmanY === 10){ //move to right of screen if goes through left corridor
        pacmanX = 18;
        pacman.style.left = `${pacmanX*40}px`;
        pacman.style.transform = "scaleX(-1)";
    }
    eatCoin();
    movePink();
    moveRed();
    moveYellow();
    checkDead();
    checkWin()
}

//eat coin

function eatCoin() {
    if(worldGenerator[pacmanY][pacmanX] === 1){
        score++;
        worldGenerator[pacmanY][pacmanX] = 0;
        scoreDisplay.innerHTML = score;
    } else if(worldGenerator[pacmanY][pacmanX] === 3){
        score += 50;
        worldGenerator[pacmanY][pacmanX] = 0;
        scoreDisplay.innerHTML = score;
    }
    displayWorld();
}

//Pink position and movement
var pink = document.getElementById('pink');
var pinkX = 9;
var pinkY = 11;
pink.style.top = `${pinkY*40}px`;
pink.style.left = `${pinkX*40}px`;

function movePink(){ //randomly moves in one direction with every keypress
    var direction = Math.floor(Math.random()*4+1);

    if (pinkX === 9 && pinkY === 11){
        pinkY--;
        pink.style.top = `${pinkY*40}px`;
    } else if (pinkX === 9 && pinkY === 10) {
        pinkY--;
        pink.style.top = `${pinkY*40}px`; //move pink out of box before AI takes over
    } else if(direction === 1 && worldGenerator[pinkY+1][pinkX] != 2 && worldGenerator[pinkY+1][pinkX] != 4){ //move Pink down
        pinkY++;
        pink.style.top = `${pinkY*40}px`;
    } else if (direction === 2 && worldGenerator[pinkY-1][pinkX] != 2){ //move Pink up
        pinkY--;
        pink.style.top = `${pinkY*40}px`;
    } else if (direction  === 3 && worldGenerator[pinkY][pinkX+1] != 2 && pinkX*40 < 360) {//move Pink right
        pinkX++;
        pink.style.left = `${pinkX*40}px`;
        pink.style.transform="scaleX(1)";
    } else if (direction === 4 && worldGenerator[pinkY][pinkX-1] != 2 && pinkX*40 > 0) {//move Pink left
        pinkX--;
        pink.style.left = `${pinkX*40}px`;
        pink.style.transform = "scaleX(-1)";
    }
}

//Red position and movement
var red = document.getElementById('red');
var redX = 8;
var redY = 11;
red.style.top = `${redY*40}px`;
red.style.left = `${redX*40}px`;

function moveRed(){ //chases pacman based on distance (difference in X and Y)
    var diffX = pacmanX - redX;
    var diffY = pacmanY - redY;

    if (redX === 8 && redY === 11){//move red out of middle
        redX++;
        red.style.left = `${redX*40}px`;
        red.style.transform = "scaleX(-1)";
    } else if (redX === 9 && redY === 11) {//move red out of middle
        redY--;
        red.style.top = `${redY*40}px`;
    } else if(redX === 9 && redY === 10) {//move red out of middle
        redY--;
        red.style.top = `${redY*40}px`; //AI takes over
    } else if (Math.abs(diffY) > Math.abs(diffX)){ //move through Y if diffY is larger than diffX
        if(diffY > 0){ //move down
            if (worldGenerator[redY+1][redX] === 4 || worldGenerator[redY+1][redX] === 2){ //if moving down is blocked, move right or left instead
                if(diffX > 0 && worldGenerator[redY][redX+1] != 2){
                    redX++;
                    red.style.left = `${redX*40}px`;
                    red.style.transform = "scaleX(-1)";
                } else if(diffX < 0  && worldGenerator[redY][redX-1] != 2){
                    redX--;
                    red.style.left = `${redX*40}px`;
                }
            } else {
                redY++;
                red.style.top = `${redY*40}px`;
            }
        } else if (diffY < 0){
            if (worldGenerator[redY-1][redX] === 2){ //if moving up is blocked, move right or left instead
                if(diffX > 0 && worldGenerator[redY][redX+1] != 2){
                    redX++;
                    red.style.left = `${redX*40}px`;
                    red.style.transform = "scaleX(-1)";
                } else if(diffX < 0  && worldGenerator[redY][redX-1] != 2){
                    redX--;
                    red.style.left = `${redX*40}px`;
                }
            } else {
                redY--;
                red.style.top = `${redY*40}px`;
            }
        }
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
        if(diffX > 0) {
            if(worldGenerator[redY][redX+1] === 2){
                if(diffY > 0 && worldGenerator[redY+1][redX] != 2 && worldGenerator[redY+1][redX] != 4){
                    redY++;
                    red.style.top = `${redY*40}px`;
                } else if (diffY < 0 && worldGenerator[redY-1][redX] != 2){
                    redY--;
                    red.style.top = `${redY*40}px`;
                }
            } else {
                redX++;
                red.style.left = `${redX*40}px`;
                red.style.transform = "scaleX(-1)";
            }
        } else if(diffX < 0) {
            if(worldGenerator[redY][redX-1] === 2){
                if(diffY > 0 && worldGenerator[redY+1][redX] != 2 && worldGenerator[redY+1][redX] != 4){
                    redY++;
                    red.style.top = `${redY*40}px`;
                } else if (diffY < 0 && worldGenerator[redY-1][redX] != 2){
                    redY--;
                    red.style.top = `${redY*40}px`;
                }
            } else {
                redX--;
                red.style.left = `${redX*40}px`;
            }
        }
    }
}

//yellow position and movement
var yellow = document.getElementById('yellow');
var yellowX = 10;
var yellowY = 11;
yellow.style.top = `${yellowY*40}px`;
yellow.style.left = `${yellowX*40}px`;

function moveYellow(){
    var diffX = pacmanX - yellowX;
    var diffY = pacmanY - yellowY;
    var direction = Math.floor(Math.random()*4+1);

    if (yellowX === 10 && yellowY === 11){//move red out of middle
        yellowX--;
        yellow.style.left = `${yellowX*40}px`;
    } else if (yellowX === 9 && yellowY === 11) {//move red out of middle
        yellowY--;
        yellow.style.top = `${yellowY*40}px`;
    } else if(yellowX === 9 && yellowY === 10) {//move red out of middle
        yellowY--;
        yellow.style.top = `${yellowY*40}px`; //AI takes over
    } else if(Math.abs(diffY) > 4 || Math.abs(diffX) > 4){
        if(direction === 1 && worldGenerator[yellowY+1][yellowX] != 2 && worldGenerator[yellowY+1][yellowX] != 4){ //move yellow down
            yellowY++;
            yellow.style.top = `${yellowY*40}px`;
        } else if (direction === 2 && worldGenerator[yellowY-1][yellowX] != 2){ //move yellow up
            yellowY--;
            yellow.style.top = `${yellowY*40}px`;
        } else if (direction  === 3 && worldGenerator[yellowY][yellowX+1] != 2 && yellowX*40 < 360) {//move yellow right
            yellowX++;
            yellow.style.left = `${yellowX*40}px`;
        } else if (direction === 4 && worldGenerator[yellowY][yellowX-1] != 2 && yellowX*40 > 0) {//move yellow left
            yellowX--;
            yellow.style.left = `${yellowX*40}px`;
        }
    } else {
        if (Math.abs(diffY) > Math.abs(diffX)){ //move through Y if diffY is larger than diffX
            if(diffY > 0){ //move down
                if (worldGenerator[yellowY+1][redX] === 4 || worldGenerator[yellowY+1][yellowX] === 2){ //if moving down is blocked, move right or left instead
                    if(diffX > 0 && worldGenerator[yellowY][yellowX+1] != 2){
                        yellowX++;
                        yellow.style.left = `${yellowX*40}px`;
                    } else if(diffX < 0  && worldGenerator[yellowY][yellowX-1] != 2){
                        yellowX--;
                        yellow.style.left = `${yellowX*40}px`;
                    }
                } else {
                    yellowY++;
                    yellow.style.top = `${yellowY*40}px`;
                }
            } else if (diffY < 0){
                if (worldGenerator[yellowY-1][yellowX] === 2){ //if moving up is blocked, move right or left instead
                    if(diffX > 0 && worldGenerator[yellowY][yellowX+1] != 2){
                        yellowX++;
                        yellow.style.left = `${yellowX*40}px`;
                    } else if(diffX < 0  && worldGenerator[yellowY][yellowX-1] != 2){
                        yellowX--;
                        yellow.style.left = `${yellowX*40}px`;
                    }
                } else {
                    yellowY--;
                    yellow.style.top = `${yellowY*40}px`;
                }
            }
        } else if (Math.abs(diffX) > Math.abs(diffY)) {
            if(diffX > 0) {
                if(worldGenerator[yellowY][yellowX+1] === 2){
                    if(diffY > 0 && worldGenerator[yellowY+1][yellowX] != 2 && worldGenerator[yellowY+1][yellowX] != 4){
                        yellowY++;
                        yellow.style.top = `${yellowY*40}px`;
                    } else if (diffY < 0 && worldGenerator[yellowY-1][yellowX] != 2){
                        yellowY--;
                        yellow.style.top = `${yellowY*40}px`;
                    }
                } else {
                    yellowX++;
                    yellow.style.left = `${yellowX*40}px`;
                }
            } else if(diffX < 0) {
                if(worldGenerator[yellowY][yellowX-1] === 2){
                    if(diffY > 0 && worldGenerator[yellowY+1][yellowX] != 2 && worldGenerator[yellowY+1][yellowX] != 4){
                        yellowY++;
                        yellow.style.top = `${yellowY*40}px`;
                    } else if (diffY < 0 && worldGenerator[yellowY-1][yellowX] != 2){
                        yellowY--;
                        yellow.style.top = `${yellowY*40}px`;
                    }
                } else {
                    yellowX--;
                    yellow.style.left = `${yellowX*40}px`;
                }
            }
        }
    }
    console.log("diffY: "+diffY);
    console.log("diffX: "+diffX);
}

//game over

function checkDead(){
    if (pinkY === pacmanY && pinkX === pacmanX){
        document.getElementById('gameOver').style.display = 'initial';
        document.removeEventListener("keydown", movePacman);
        document.addEventListener("keydown", reset);
    } else if (redY === pacmanY && redX === pacmanX){
        document.getElementById('gameOver').style.display = 'initial';
        document.removeEventListener("keydown", movePacman);
        document.addEventListener("keydown", reset);
    } else if (yellowY === pacmanY && yellowX === pacmanX) {
        document.getElementById('gameOver').style.display = 'initial';
        document.removeEventListener("keydown", movePacman);
        document.addEventListener("keydown", reset);
    }
}

function checkWin(){
    if(score === 354){
        document.getElementById('youWin').style.display = 'initial';
        document.removeEventListener("keydown", movePacman);
        document.addEventListener("keydown", reset);
    }
}

function reset(){
    pacmanX = 9;
    pacmanY = 17;
    pacman.style.top = `${pacmanY*40}px`;
    pacman.style.left = `${pacmanX*40}px`;
    pacman.style.transform="scaleX(1)";
    pinkX = 9;
    pinkY = 11;
    pink.style.top = `${pinkY*40}px`;
    pink.style.left = `${pinkX*40}px`;
    redX = 8;
    redY = 11;
    red.style.top = `${redY*40}px`;
    red.style.left = `${redX*40}px`;
    yellowX = 10;
    yellowY = 11;
    yellow.style.top = `${yellowY*40}px`;
    yellow.style.left = `${yellowX*40}px`;

    worldGenerator = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2],
        [2,3,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,3,2],
        [2,1,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,1,2],
        [2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2],
        [2,2,2,2,1,2,2,2,0,2,0,2,2,2,1,2,2,2,2],
        [0,0,0,2,1,2,2,2,0,2,0,2,2,2,1,2,0,0,0],
        [2,2,2,2,1,2,0,0,0,0,0,0,0,2,1,2,2,2,2],
        [0,0,0,0,1,0,0,2,2,0,2,2,0,0,1,0,0,0,0],
        [2,2,2,2,1,2,0,2,0,0,0,2,0,2,1,2,2,2,2],
        [0,0,0,2,1,2,0,2,2,2,2,2,0,2,1,2,0,0,0],
        [0,0,0,2,1,2,0,0,0,0,0,0,0,2,1,2,0,0,0],
        [2,2,2,2,1,2,0,2,2,2,2,2,0,2,1,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2],
        [2,1,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,1,2],
        [2,3,1,2,1,1,1,1,1,0,1,1,1,1,1,2,1,3,2],
        [2,2,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,2,2],
        [2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2],
        [2,1,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];
    score = 0;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('youWin').style.display = 'none';
    document.removeEventListener("keydown", reset);
    document.addEventListener("keydown", movePacman);
    displayWorld();
}