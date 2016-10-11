function Game(hpMaximum, lignes, colonnes, initialNbrTaupes){



	/* ==================================== */
	// ============= Atributes ============
	this.maxHp = hpMaximum;
	var hp = this.maxHp;
	var score = 0;
	var highscore = 0;
	this.board = new Board(document.getElementById('board'), lignes, colonnes);
	var holes;
	var intervals = new Array();
	var isEnd;
	var scorePalier; //reach this to up difficulty


	/* ==================================== */
	// ============ functions =============
	this.start = function() {
		console.log('start');
		isEnd = false;
		//initialize
		hp = this.maxHp;
		document.getElementById('score').innerHTML = score;
		document.getElementById('life').innerHTML = hp;
		document.getElementById('highscore').innerHTML = highscore;
		holes = document.getElementsByClassName('hole');
		scorePalier = 300;
		

		//go
		for (var top = 0; top < initialNbrTaupes; top++) {
			defilTaupes((Math.random() * 1000)+1000);
		}
	};

	this.reset = function() {
		isEnd = true;
		console.log('reset');
		for (var t = 0; t<intervals.length; t++) {
			if (intervals[t]) {
				window.clearInterval(intervals[t]);
			}
		};
		document.getElementById('start').style.display = "inline-block";
		score = 0;
		document.getElementById('score').innerHTML = score;
	};

	var defilTaupes = function(speed) {
		var interval = window.setInterval(
			spawnMole
		, speed);
		intervals.push(interval);
	};

	var looseHp = function() {
		if (hp - 1 > 0) {
			hp -= 1;
		} else {
			hp = 0;
			endGame();
		}
		document.getElementById('life').innerHTML = hp;
	};

	var spawnMole = function() {
		var hole;
		do {
			hole = holes[Math.floor(Math.random() * (holes.length -1))];
		} while (hole.childNodes[0]); //empecher le spawn sur une case occupé => boucle infini si le terrain est rempli
		var mole = new Mole(hole, game);

		this.setTimeout( function() {
			var m = mole.mole;
			if (hole.childNodes[0] == m) {
				hole.removeChild(m);
				if (!isEnd) {looseHp()};
			};
		}, ((Math.random()*2 + 1) *1000) );
	}

	this.addScore = function(pts) {
		if (!isEnd) {
			score += pts;
			document.getElementById('score').innerHTML = score;
			if (score>scorePalier) {
				defilTaupes((Math.random() * 1000)+1000);
				scorePalier += 600;
			}
		}
	}

	var endGame = function() {
		isEnd = true;
		for (var t = 0; t<intervals.length; t++) {
			window.clearInterval(intervals[t]);
		}
		if (score > highscore) {
			highscore = score;
			document.getElementById('highscore').innerHTML = score;
		}
		console.log('end');
	}


}
