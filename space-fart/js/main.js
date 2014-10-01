var duration = 20000;//10 seconds
var startTime;
var overlayDiv;
var backgroundPlayer;
var foregroundPlayer;
var starMarkup = "<div class='star'><div class='star vertical'></div><div class='star horizontal'></div></div>";
var stars = [];
var astronaut = {};
astronaut.rot = Math.random()*Math.PI*2;
var spaceship = {};

var init = function(){
	document.onwebkitpointerlockchange = pointerlockchange;
	document.onwebkitpointerlockerror = pointerlockerror;
	document.onmousemove = mousemove;
	document.onclick = click;
	createStars();
	positionPlayers();
	startTime = Date.now() - duration/4;
	//window.onkeypress = keypressed;
	//window.onkeydown = keydown;
	window.requestAnimationFrame(update);
	overlayDiv = document.getElementById("overlay");
	backgroundPlayer = new Audio();
	backgroundPlayer.loop = true;
	backgroundPlayer.volume = .2;
	backgroundPlayer.src = "sound/516100_8bit-Space-Travel.mp3";
	backgroundPlayer.autoplay = true;
	backgroundPlayer.load();
	var audioContext = new webkitAudioContext();
	var bgSource = audioContext.createMediaElementSource(backgroundPlayer);
	var filter = audioContext.createBiquadFilter();
	filter.type = 0;
	filter.frequency.value = 500;
	bgSource.connect(filter);
	filter.connect(audioContext.destination);
	//some way to slow down or 'blur' the music?

	foregroundPlayer = new Audio();
	foregroundPlayer.volume = .2;
	foregroundPlayer.src = "sound/car-beep.mp3";
	foregroundPlayer.load();
};

$(init);

var positionPlayers = function(){
	astronaut.elem = document.getElementById("astronaut");
	spaceship.elem = document.getElementById("spaceship");
	var width = window.innerWidth;
	var height = window.innerHeight;
	spaceship.xPos = Math.floor(Math.random()*width/2 + width/10);
	spaceship.yPos = Math.floor(Math.random()*height/2 + height/4);
	spaceship.elem.style.left = "" + spaceship.xPos + "px";
	spaceship.elem.style.top = "" + spaceship.yPos + "px";
	spaceship.elem.style.webkitTransform = "rotate(" + (Math.random()*360) + "deg)";
	
	astronaut.xPos = Math.floor(Math.random()*width/2 + width/2 - width/10);
	astronaut.yPos = Math.floor(Math.random()*height/2 + height/4);
	updatePlayerPos();
	updatePlayerRotation();
	astronaut.xVel = 0;
	astronaut.yVel = 0;
};

var createStars = function(){
	var numStars = Math.floor(Math.random() * 100 + 200);
	var currDiv;
	var height = window.innerHeight;
	var width = window.innerWidth;
	while(numStars--){
		currDiv = document.createElement("div");
		currDiv.innerHTML = starMarkup;
		currDiv.firstChild.style.top = "" + Math.floor(Math.random() * height) + "px";
		currDiv.firstChild.style.left = "" + Math.floor(Math.random() * width) + "px";
		stars.push(currDiv);
		document.body.appendChild(currDiv);
	};
};

var blinkStars = function(){
	if(Math.random() < .1){
		var blinkStar = stars[Math.floor(Math.random() * stars.length)];
		blinkStar.classList.add("show");
		setTimeout(blinkStar.classList.remove.bind(blinkStar.classList, "show"), Math.random()*200+300);
	}
};

var updatePlayerRotation = function(){
	astronaut.elem.style.webkitTransform = "rotate(" + astronaut.rot + "rad)";
};

var updatePlayerPos = function(){
	astronaut.elem.style.left = "" + astronaut.xPos + "px";
	astronaut.elem.style.top = "" + astronaut.yPos + "px";
};

var keypressed = function(){
	startTime = Math.min(Date.now(), startTime + 1000);
	//TODO: add velocity of player
	astronaut.xVel += Math.cos(astronaut.rot)*.3;
	astronaut.yVel += Math.sin(astronaut.rot)*.3;
	foregroundPlayer.currentTime=.60;
	foregroundPlayer.play();
};

var keydown = function(keyboardEvent){
	switch(keyboardEvent.keyIdentifier){
		case "Left":
			astronaut.rot -= .1;
			if (astronaut.rot > Math.PI*2){
				astronaut.rot -= Math.PI*2;
			}
			updatePlayerRotation();
			break;		
		case "Right":
			astronaut.rot += .1;
			if (astronaut.rot < 0){
				astronaut.rot += Math.PI*2;
			}
			updatePlayerRotation();
			break;
	}
};

var pointerlockchange = function(){
	//document.webkitPointerLockElement should not be null
	console.log("pointerlockchange");
	console.log(arguments);
	console.log(document.webkitPointerLockElement);
};

var pointerlockerror = function(){
	console.log("pointerlockerror");
	console.log(arguments);
};

var mousemove = function(mouseEvent){
	astronaut.rot += mouseEvent.webkitMovementX * .01;
	if (astronaut.rot > Math.PI*2){
		astronaut.rot %= Math.PI * 2;
	} else {
		while (astronaut.rot < 0){
			astronaut.rot += Math.PI*2;
		}
	}
	updatePlayerRotation();
};

var click = function(mouseEvent){
	document.body.webkitRequestPointerLock();
};

var update = function(){
	blinkStars();
	astronaut.xPos += astronaut.xVel;
	astronaut.yPos += astronaut.yVel;
	updatePlayerPos();
	var value = Math.max(0, Date.now() - startTime)/duration;
	overlayDiv.style.opacity = value;
	if (value >= 1){
		document.getElementById("finish").classList.add("lose");
		reset();
	} else if (Math.abs(astronaut.xPos - spaceship.xPos) < 50 &&
		Math.abs(astronaut.yPos - spaceship.yPos) < 50){
		document.getElementById("finish").classList.add("win");
		reset();
	} else {
		window.requestAnimationFrame(update);
	}
};

var reset = function(){
	//setTimeout(function(){window.location.href = window.location.href;}, 3000);
	setTimeout(function(){postParent("NextGame");}, 2000);
};
