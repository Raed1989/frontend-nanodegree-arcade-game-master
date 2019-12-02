// Enemies our player must avoid
//var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/enemy-bug.png';
//};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function () {
//ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

let panel = document.getElementsByClassName('panel')[0];
let scoreModal = document.getElementById('scoreModal');
let score = document.getElementById('score');
let backgroundColor = document.getElementsByTagName('body')[0];
let scoreLbl = document.getElementsByTagName('h2')[0];
let scoreCalculate = 0;


class Enemy {
    constructor(x, y,s) {
        this.x = x
        this.y = y
        this.sprite = 'images/enemy-bug.png';
    // to pass differnet speed for the 3 enemies
        this.speed = s;
    }
    // to move the enemey  
    //  dt is a time delta between tick
    update(dt) {
        this.x += this.speed * dt;
        // if the enemey go outside the canvas move it to the other end :)
        if(this.x > 510){
            this.x = -100;
        }
        this.checkCollison();
     }
     // to check the collide for the enemy then reset position lower score
     checkCollison() {
        if (
            player.y + 135 >= this.y + 92 &&
            player.x + 23 <= this.x + 86 &&
            player.y + 70 <= this.y + 130 &&
            player.x + 73 >= this.x + 12) {
        resetPositoin();
        lowerscore();
        }
    }
    render() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y); }

}

// Now write your own player class
class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sprite = 'images/char-boy.png';
    }
   // handle input from kwyboard
    handleInput(dir){
        if (dir === "left"  && this.x > 0)
        {
            this.x -= 100;
        }
        else if (dir === "up" && this.y > 20)
        {
            this.y -= 90;
        }
        else if (dir === "right" && this.x <= 300)
        {
            this.x += 100;
        }
        else if  (dir === "down" && this.y <= 400)
        {
            this.y += 90;
        }
    }
    update() {
        // if the player land on the blue water higher his score and let him go back to start
        if(this.y <= 0 ){
             higherscore();
             resetPositoin();
        }
        // if the score is 100
        if(scoreCalculate === 100){
            hideCanvas();
            changeBackgroundColor();
            DisplayPanel();
        }
    }
    render() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y); }
}
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
let player = new Player(200, 420);
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(100, 60,280);
let enemy2 = new Enemy(200, 150,320);
let enemy3 = new Enemy(300, 230,400);
let allEnemies = [enemy1, enemy2,enemy3];
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// add the score to the modal 
function addscoreInsideModal() {
    scoreModal.appendChild(scoreLbl);
}

// Show modal on win
function DisplayPanel() {
    addscoreInsideModal();
    panel.style.display = "block";
}

// chane Background Color of the body 
function changeBackgroundColor() {
    backgroundColor.style.background = "#2e2e2e";
}

// to higher the score when collision
function higherscore() {
    scoreCalculate += 50;
    score.textContent = scoreCalculate;
}
// to lower score when collision

function lowerscore() {
    if(scoreCalculate > 0){
    scoreCalculate -= 50;
    score.textContent = scoreCalculate;
    }
}
// return player to its place on start

function resetPositoin() {
    player.x = 200;
    player.y = 420;
}
// Hide canvas on win
function hideCanvas(){
    document.getElementsByTagName('canvas')[0].style.display = 'none';
}
