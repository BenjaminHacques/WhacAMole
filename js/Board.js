function Board(htmlElement, nbrLines, nbrCols){
	// instantiate holes in lines
	for (var l = 0; l < nbrLines; l++) {
		var line = document.createElement("div");
		htmlElement.appendChild(line);
		for (var h = 0; h < nbrCols; h++) {
			new Hole(line);
		}
	}
}
