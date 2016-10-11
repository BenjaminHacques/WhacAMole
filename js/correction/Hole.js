function Hole(htmlElement){
	this._mole = null;
	this._htmlElement = htmlElement;
}

Hole.prototype.getMole = function(){
	return this._mole;
};

Hole.prototype.setMole = function(mole){
	this._mole = mole;
	mole.setHole(this);
	this._htmlElement.appendChild(mole.getHtmlElement());
};

Hole.prototype.empty = function(){
	this._mole = null;
	this._htmlElement.innerHTML = '';
};

Hole.prototype.isEmpty = function(){
	return this._mole === null;
};

Hole.prototype.getHtmlElement = function(){
	return this._htmlElement;
};