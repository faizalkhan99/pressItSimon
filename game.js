var gamePattern = []; //Keeps track of pattern
var buttonColors = ["red", "blue", "green", "yellow"]; // available patterns
var userClickedPattern = []; // keeps track of user pattern
var level = 0; // indicates level
var highScore = 0;
var started = false; // indicates if game is on going

btnSound = new Audio("sounds/buttonSound.wav");
bg_music = new Audio("sounds/bg_music.wav");
levelUpSound = new Audio("sounds/yay.mp3");


/*
  Event listener for colored buttons
*/
$(".btn").click(function (event) {
    if (started === true) { // Only if game is currently running
        var userChosenColour = this.id; // takes id on clicked button from user
        userClickedPattern.push(userChosenColour);  // adds it to userPattern array
        animatePress(userChosenColour); // animation effect
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1); // checks if correct pattern
    }
});

/*
  Event listener for go button to start/restart game
*/
$(".goButton").click(function (event) {
    if (started === false) { // runs first time of new game only
        nextSequence(); // starts sequence;
        started = true;
        $(".goButton").hide(); // hides go button
        bg_music.play();
        bg_music.loop = true;
        bg_music.volume = 0.5;
        btnSound.play();
    }
});

/*
  checks answer game pattern vs userPattern to see if
  the pattern is followed
*/
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Checks if user follows game pattern
        if (userClickedPattern.length === gamePattern.length) { // completed pattern
            setTimeout(function () {
                nextSequence(); // wait one second and add to sequence
            }, 1000);
        }
    }
    else { // failed
        playSound("wrong"); // play wrong sound
        animateGameOver(); // animation for game ended
        $("h1").text("Game Over, Press Restart to Play Again");
        $(".goButton").text("Restart"); //change go -> restart
        startOver() //resets game
    }
}

/*
Plays specific sound for each button
*/
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


/*
Adds next sequence to game Pattern and
*/
function nextSequence() {
    userClickedPattern = []; // clears user pattern
    level++;
    $("h1").text("Level " + level); //update level

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); // add random to color
    playPattern(); // play updated gamePattern to user

}

/*
  Plays complete game pattern for user each level
*/
function playPattern() {
    var i = 0, buttonTimeInterval = 1000;

    if (level > 0 && level <= 3) { //difficulty: foetus 1

        $(".difficulty").text("Difficulty: Foetus");
    }

    else if (level > 3 && level <= 6) {   //difficulty: baby 4
        buttonTimeInterval = 800;

        $(".difficulty").text("Difficulty: Baby");
    }
    else if (level > 6 && level <= 9) { //difficulty: easy 7
        buttonTimeInterval = 600;

        $(".difficulty").text("Difficulty: Easy");
    }
    else if (level > 9 && level <= 12) { //difficulty: normal 10
        buttonTimeInterval = 400;

        $(".difficulty").text("Difficulty: Normal");
    }
    else if (level > 12 && level <= 15) { //difficulty: hard 13
        buttonTimeInterval = 200;

        $(".difficulty").text("Difficulty: Hard");
    }
    else if (level > 15 && level <= 18) { //difficulty: hardcore 16
        buttonTimeInterval = 100;

        $(".difficulty").text("Difficulty: Hardcore");
    }
    else if (level > 18) {    //difficulty: ga*d faad difficult 19
        buttonTimeInterval = 50;

        $(".difficulty").text("Difficulty: Gaand faad difficult");
    }
    if (level === 4 || level === 7 || level === 10 || level === 13 || level === 16 || level === 19) {
        diff_Shake();
        levelUpSound.play();
    }

    const intervalId = setInterval(function () {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        i += 1;
        if (i === gamePattern.length) {
            clearInterval(intervalId);
        }
    }, buttonTimeInterval);


}

/*
  Clears levels and gamePattern
*/
function startOver() {
    if (level > highScore) { // Sets high score
        highScore = level - 1;
        $("h3").text("High Score: " + (2 * highScore));
    }
    level = 0;
    gamePattern = [];
    started = false;
    $(".goButton").show();
}

/*
  Indicates the game is over to the user
*/
function animateGameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

/*
  Animates button clicked effect
*/
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);

}

function diff_Shake() {
    $("p").addClass("diff-text");
    setTimeout(function () {
        $("p").removeClass("diff-text");
    }, 500);
}
