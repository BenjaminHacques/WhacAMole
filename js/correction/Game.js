function Game(){
	this._board = new Board(document.getElementById('board'));
	this._htmlScore = document.getElementById('score');
	this._htmlLife = document.getElementById('life');
	this._htmlHighscore = document.getElementById('highscore');
	this._speed = Game.START_SPEED;
	
	this.setLife(Game.LIFE);
	this.setScore(0);
	this.setHighscore(0);
}

Game.prototype.start = function(){
	this.generateHoles();
	// Start spawn
	this.spawn(this._speed);
};

// Generate empty holes (object & HTML)
Game.prototype.generateHoles = function(){
	for(var ii = 0; ii < Game.NB_HOLES; ii++){
		var div = document.createElement('div');
		div.className = 'hole';
		var hole = new Hole(div);
		this._board.addHole(hole);
	}
};

// Recursive method that spawns Mole in empty holes
Game.prototype.spawn = function(time){
	this._spawningInterval = setTimeout(function(){
		var holes = this._board.getEmptyHoles();
		// How Many Moles ?
		// Just for fun...
		var nbMoles = Math.floor(Math.random() * ((Game.START_SPEED - this._speed) *
			 Game.NB_MOLE_MAX / (Game.START_SPEED - Game.MAX_SPEED))) + 1;

		for(var ii = 0; ii < nbMoles && holes.length > 0; ii++){
			var nbHoles = holes.length;
			// pick a random hole
			var spawningHole = Math.floor(Math.random() * nbHoles);

			var img = document.createElement('img');
			img.src = 'img/mole.png';
			img.alt = 'MOOOOLE!';
			var mole = new Mole(img, this);
			holes[spawningHole].setMole(mole);
			// remove this hole from usable holes
			holes.splice(spawningHole, 1);
		}

		this.incSpeed();
		this.spawn(this._speed);
	}.bind(this), time);
};

// Stop spawning interval
Game.prototype.stopSpawning = function(){
	clearInterval(this._spawningInterval);
};

// Increase speed by speed INC_RATE until MAX_SPEED
Game.prototype.incSpeed = function(){
	if(this._speed >= Game.MAX_SPEED){
		this._speed -= Game.INC_RATE;
	}else{
		this._speed = Game.MAX_SPEED;
	}
};

// Reset the game but not the highscore
Game.prototype.reset = function(){
	this.stopSpawning();
	this.killEmAll();
	this.setScore(0);
	this.setLife(Game.LIFE);
	this._speed = Game.START_SPEED;
	this.spawn();
};

// Add MOLE_VALUE to the score
Game.prototype.score = function(){
	this._score += Game.MOLE_VALUE;
	this._htmlScore.innerHTML = this._score;
};

Game.prototype.setScore = function(score){
	this._score = score;
	this._htmlScore.innerHTML = this._score;
};

Game.prototype.setLife = function(life){
	this._life = life;
	this._htmlLife.innerHTML = this._life;
};

Game.prototype.setHighscore = function(hs){
	this._highscore = hs;
	this._htmlHighscore.innerHTML = this._highscore;
};

// End of the game
Game.prototype.end = function(){
	this.stopSpawning();
	if(this._score > this._highscore){
		this.setHighscore(this._score);
	}
	//alert('Vous avez perdu. Votre score est de : ' + this._score);
	this.killEmAll();
};

// When you miss a mole
Game.prototype.looseALife = function(){
	this.setLife(this._life-1);
	if(this._life === 0){
		this.end();
	}
};

// Kill all moles! (reset purpose, but can be use as a bomb!)
Game.prototype.killEmAll = function(){
	// Kill all remaining Moles!
	this._board.getMoleHoles().forEach(function(hole){
		hole.getMole().kill();
	});
};

Game.NB_HOLES = 80;
Game.MOLE_VALUE = 30;
Game.START_SPEED = 1500;
Game.WIDTH = 750;
Game.LIFE = 3;
Game.MOLE_DURATION = 3000;
Game.INC_RATE = 10;
Game.MAX_SPEED = 1000;
Game.NB_MOLE_MAX = 3;
