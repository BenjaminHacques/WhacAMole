function Mole(htmlElement, game){
	this._htmlElement = htmlElement;
	this._game = game;
	this._hole = null;
	this._hit = false;

	this.addListener();
	this.flee();
}

// Set the mole to flee after MOLE_DURATION seconds
// Loose a life if it hasn't been hit
Mole.prototype.flee = function(){	
	// Flee after 1 sec
	setTimeout(function(){
		if(!this.isHit()){
			(new Audio('sound/laugh.mp3')).play();
			this.kill();
			this._game.looseALife();
		}
	}.bind(this), Game.MOLE_DURATION);
};

Mole.prototype.hit = function(){
	this._hit = true;
};

Mole.prototype.isHit = function(){
	return this._hit;
};

Mole.prototype.setHole = function(hole){
	this._hole = hole;
};

Mole.prototype.getHole = function(){
	return this._hole;
};

Mole.prototype.getHtmlElement = function(){
	return this._htmlElement;
};

Mole.prototype.kill = function(){
	this._hole.empty();
	this.hit();
};

// Kill the mole when you click on it
// Add score
Mole.prototype.addListener = function(){
	var self = this;
	this._htmlElement.addEventListener('click', function(e){
		(new Audio('sound/hit.mp3')).play();
		self.kill();
		self._game.score();
	});
};