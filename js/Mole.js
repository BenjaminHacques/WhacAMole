function Mole(htmlElement, game){
	// Element
	this.mole = document.createElement("img");


	htmlElement.appendChild(this.mole);
	this.mole.setAttribute("src", "img/mole.png");

	this.mole.addEventListener("mousedown", function() {
		game.addScore(30);
		this.parentNode.removeChild(this);
	});
}
