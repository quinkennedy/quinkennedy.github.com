var duration = 10000;//10 seconds
var startTime;
var overlayDiv;
var backgroundPlayer;
var foregroundPlayer;

var init = function(){
	startTime = Date.now() - duration/2;
	window.onkeypress = keypressed;
	window.requestAnimationFrame(update);
	overlayDiv = document.getElementById("overlay");
	backgroundPlayer = new Audio();
	foregroundPlayer = new Audio();
	foregroundPlayer.src = "sound/car-beep.mp3";
	foregroundPlayer.load();
};

$(init);

var keypressed = function(){
startTime = startTime + 500;
//TODO: play horn sound
foregroundPlayer.currentTime=.60;
foregroundPlayer.play();
};

var update = function(){
	var value = Math.max(0, Date.now() - startTime)/duration;
	overlayDiv.style.opacity = value;
	if (value >= 1){
		document.getElementById("finish").classList.add("lose");
		reset();
	} else if (value <= 0){
		document.getElementById("finish").classList.add("win");
		reset();
	} else {
		window.requestAnimationFrame(update);
	}
	if (backgroundPlayer.ended || backgroundPlayer.src == ''){
		var backgroundAudio = ["Traffic_Jam-Yo_Mama-1164700013-3.wav",
			"coast-guard-horn-2.mp3",
			"car-honking.mp3"];
		backgroundPlayer.src = "sound/"+backgroundAudio[Math.floor(Math.random()*backgroundAudio.length)];
		backgroundPlayer.load();
		setTimeout(function(){backgroundPlayer.play();}, 300+Math.random()*2000);
	}	
};

var reset = function(){
	//setTimeout(function(){window.location.href = window.location.href;}, 3000);
	setTimeout(function(){postParent("NextGame");}, 2000);
};
