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
let Score = document.getElementById('score');
let backgroundColor = document.getElementsByTagName('body')[0];
let scoreCalculate = 0;

class Enemy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sprite = 'images/enemy-bug.png';
        this.speed = 150;
    }
    update(dt) {
        this.x += this.speed * dt;
        if(this.x > 510){
            this.x = -100;
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
        if(this.y <= 0 ){
           scoreCalculate += 50;
           score.textContent = scoreCalculate;
            this.x = 200;
            this.y = 420;

        }
        if ( scoreCalculate === 100){
            backgroundColor.style.background = "#2e2e2e";

            panel.style.display = "block";
        }
    }
    render() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y); }
}
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
let player = new Player(200, 420);
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(100, 60);
let enemy2 = new Enemy(200, 150);
let enemy3 = new Enemy(300, 230);
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
