
var soundElement, //To use the sound effect to bounce the ball
	score=0,
	prevScore=0, //For update the DOM(score) when needed
	setTimeoutFunction, //For clear it //When "the loss"
	xPositionBall, //Position of ball on horizontal (axe X)
	yPositionBall=200, //Position of ball on virtical (axe Y)
	horizontalSpeed=1, //Speed on the X-axe
	verticalSpeed=2, //Speed on the Y-axe
	positionOfObstacle=100, //Pisiton for margin left of the obstacle
	distanceBudgeTheObstacle=0, //Distance Budge
	lo=0,
	nextScoreFourRepairSpeed=300, //In this score we will raise the level, (and we add +300 more)
	hhorizontalSpeed,
	level=1;

xPositionBall=Math.floor((Math.random() * 300))+15;
document.getElementById('obstacle').style.marginLeft= positionOfObstacle+"px";
document.getElementById('level').innerHTML = "Level:  "+level;


//This function for testing the high speed (dev)
function addScoreAndLevelTestDev() {
	score+=100;
}


// function of play sound effect
soundElement= document.getElementById('iball');
function playSoundEffect() {
		soundElement.play();
}


// Events.. moving the obstacle to left/right
function moveControlObstacle(event) {

	if(event.keyCode==39 && positionOfObstacle<220){  //tight
		distanceBudgeTheObstacle=20;
	}else if(event.keyCode==37 && positionOfObstacle>0){ //left
		distanceBudgeTheObstacle=-20;
	}else{
		distanceBudgeTheObstacle=0;
	}

	if(event.keyCode==32){ //apply speed to score and level (for dev)
		addScoreAndLevelTestDev();
	}



	positionOfObstacle=positionOfObstacle+distanceBudgeTheObstacle;
	document.getElementById('obstacle').style.marginLeft= positionOfObstacle+"px";


}


//Speed repair (bullet speed) every +300-in-score(nextScoreFourRepairSpeed) // &Increase the level (+1)
function repairSpeedAndLevel() {

		hhorizontalSpeed=verticalSpeed+1;
		if(hhorizontalSpeed>=horizontalSpeed){ // Edit speed vertical
			if(verticalSpeed>=0){
				verticalSpeed++; //if the upward movement
			}else{
				verticalSpeed--; //if the downward movement
			}
			
		
		}else{ // Edit speed horizontal

			if(horizontalSpeed>=0){
				horizontalSpeed++; // + to left
			}else{
				horizontalSpeed--; // + to right
			}
			
		}

		nextScoreFourRepairSpeed+=300;
		level++; //Level +1
		document.getElementById('level').innerHTML = "Level:  "+level;

}


// 3émé function. fonction pour la ball
function movingBall() {

	score=score+(1/20);
	let floorScore=Math.floor(score);
	if(prevScore<floorScore){ //Update the score only when it is changing (To update DOM when needed)
		document.getElementById('stayScore').innerHTML = floorScore;
		prevScore=floorScore;
	}

	if(Math.floor(score)>=nextScoreFourRepairSpeed){ //Apply when needed
		repairSpeedAndLevel();
	}


	document.getElementById('ball').style.marginLeft= xPositionBall+"px";
	document.getElementById('ball').style.marginTop= yPositionBall+"px";
	
	setTimeoutFunction =setTimeout(movingBall,2);


	if(yPositionBall<=0){
		verticalSpeed=-verticalSpeed;
		playSoundEffect();
	}else if (yPositionBall>=528){
		
		if(positionOfObstacle-25<=xPositionBall && positionOfObstacle+140-9>=xPositionBall && yPositionBall<=530){
			verticalSpeed=-verticalSpeed;
			playSoundEffect();
		}else{
			
			if(lo<=50){
			verticalSpeed=2;
			lo++;
			}else{
				verticalSpeed=0;
				clearTimeout(setTimeoutFunction)
				alert("GAME OVER -__- Clic F5");
	
				}
			}
		}




		if(xPositionBall<=0 || xPositionBall>=328){
			horizontalSpeed=-horizontalSpeed;
			playSoundEffect();
		}



	xPositionBall=xPositionBall+horizontalSpeed;
	yPositionBall=yPositionBall+verticalSpeed;

}

movingBall();
