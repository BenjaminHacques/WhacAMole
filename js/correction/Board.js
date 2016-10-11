function Board(htmlElement){
	this._holes = [];
	this._htmlElement = htmlElement;
	this.setWidth(Game.WIDTH);
	this.setHeight(80);
}

Board.prototype.addHole = function(hole){
	this._holes.push(hole);
	this._htmlElement.appendChild(hole.getHtmlElement());
};

Board.prototype.removeHole = function(hole){
	var idx = this._holes.indexOf(hole);
	if(idx !== -1){
		this._holes.splice(idx, 1);
		this._htmlElement.removeChild(hole.getHtmlElement());
	}
};

// Get holes without moles
Board.prototype.getEmptyHoles = function(){
	var holes = [];

	for(var ii =0; ii < this._holes.length; ii++){
		if(this._holes[ii].isEmpty()){
			holes.push(this._holes[ii]);
		}
	}

	return holes;
};

// Get holes with moles
Board.prototype.getMoleHoles = function(){
	var holes = [];

	for(var ii =0; ii < this._holes.length; ii++){
		if(!this._holes[ii].isEmpty()){
			holes.push(this._holes[ii]);
		}
	}

	return holes;
};

Board.prototype.setWidth = function(w){
	this._width = w;
	this._htmlElement.style.width = w + 'px';
};

Board.prototype.setHeight = function(h){
	this.height = h;
	this._htmlElement.style.height = h + 'px';
};