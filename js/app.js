// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.collide();
    this.x += this.speed * dt;

    if(this.x > 505) {
      this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// reset method will be used to place an enemy object in the scene
// at a random position and with a random speed
Enemy.prototype.reset = function() {
  this.x = -101 - 101 * Math.floor(3* Math.random());
  this.line = Math.floor(3* Math.random()) + 1;
  this.y = 83*this.line - 30;
  this.speed = 100 + Math.floor(300*Math.random());

}


// collide method checks for collisions between enemy and player
Enemy.prototype.collide = function() {
  // compute the distance between current enemy and player
  // if it's less than 80px I consider that they collide
  var dist = Math.abs(player.x - this.x);
  if (dist < 80 && this.line === player.line) {
    player.reset();
    return;
  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.reset();
};


// reset method is used to (re)place the player at the starting position
Player.prototype.reset = function() {
  this.x = 202;
  this.line = 5;
  this.y = this.line*83 - 30;

}


Player.prototype.update = function(dt) {

  // if the player reached the water it is reset to original position
  if (this.y <= -30) {
    this.reset();
  }
}

Player.prototype.handleInput = function(direction) {
  switch(direction) {
    case 'left':
      this.x = (this.x <= 101 ? 0 : this.x - 101);
      break;
    case 'right':
      this.x = (this.x > 303 ? 404 : this.x + 101);
      break;
    case 'up':
      this.line = (this.line === 0 ? 0 : this.line - 1);
      break;
    case 'down':
      this.line = (this.line === 5 ? 5 : this.line + 1);
      break;
  }
  this.y = this.line * 83 -30;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

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
