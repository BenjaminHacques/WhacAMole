function Hole(htmlElement){
	this.hole = document.createElement("div");
	
	htmlElement.appendChild(this.hole);
	this.hole.setAttribute("class", "hole");

}
