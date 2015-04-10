// Enemies our player must avoid
var Enemy = function(yinit, speed, xinit, exit) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xinit;
    this.y = yinit;
    this.speed = speed;
    this.exit = exit;
    this.xenter = xinit;
    this.yenter = yinit;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.exit) {
        this.x = this.x + (dt * this.speed);
    }
    else {
        this.x = this.xenter;
    }
    //detect collisions and reset player
    for (enemy in allEnemies) {
        if (player.x >= allEnemies[enemy].x && player.x <= allEnemies[enemy].x + 75) {
            if (player.y >= allEnemies[enemy].y - 50 && player.y <= allEnemies[enemy].y + 75) {
                player.x = 200;
                player.y = 400;
            }
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initx, inity) {
    this.sprite = 'images/char-boy.png';
    this.x = initx;
    this.y = inity;
}

Player.prototype.update = function(dt) {
    if (this.x < 0 ) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    //reset if player reaches goal
    if (this.y < -10) {
        this.x = 200;
        this.y = 400;
    }
    if (this.y > 400) {
        this.y = 400;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.x = this.x - 30;
            break;
        case 'up':
            this.y = this.y - 30;
            break;
        case 'right':
            this.x = this.x + 30;
            break;
        case 'down':
            this.y = this.y + 30;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(150, 100, -200, 800),
    new Enemy(75, 200, -150, 550),
    new Enemy(225, 150, -350, 700),
    new Enemy(225, 400, -600, 1200)
    ];

var player = new Player(200, 400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
