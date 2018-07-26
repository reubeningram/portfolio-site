
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	//alert(dt);
	
	//The code below ensures that each bug proceeds at a constant speed while looping back to the original
	//space.
	if(this.x <= 500) {
	    this.x = this.x + (dt + this.speed); 
	} else {
		this.x = -30;
	    this.x = this.x + (dt + this.speed);
	}
	 
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



Enemy.prototype.checkCollisions = function()  {
	
	if(  (this.x >= (player.x - 65) && this.x <= player.x) &&  (this.y == player.y)){	
		document.body.style.backgroundColor = "red";	
		setTimeout(function(){ document.body.style.backgroundColor = "white"; }, 300);	
		player.hits++;
		document.getElementById("collision").innerHTML = "Collisions:  " + player.hits; 

		player.x = 200;
		player.y = 375;
	}
 
};//








var Player = function() {
    this.sprite = 'images/char-boy.png';  
	this.x = 200;
	this.y = 375;
	this.speed = 1;
	this.score = 0;
	this.hits = 0;
}


Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	 	
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(playerDirection) {
	 
	//top y = -15
	//bottom y = 400
	//left x = 0
	//right x = 400
	if(playerDirection=='up' && this.y >= 55 ) {
		this.y -= 80; 
	}

	//alert("y: " + this.y);
	if(playerDirection=='down' && this.y <= 300 ) {
		this.y += 80; 
	}

	if(playerDirection=='right' && this.x <= 300) {
		this.x += 100; 
	}

	if(playerDirection=='left' && this.x >= 100) {
		this.x -= 100; 
	}
	
	if(this.y === -25) {
	   this.increaseScore();
	   document.getElementById("score").innerHTML = "Score:  " + this.score;
	   this.x = 200;		
	   this.y = 375;
	}
};


Player.prototype.increaseScore = function() {
		this.score++;	
	
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [
 new Enemy(0, 55, 2),
 new Enemy(0, 135, 3),
 new Enemy(0, 215, 3.6)
 
 
]; 
 

 
// Place the player object in a variable called player
let player = new Player();

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
