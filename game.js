// colours array

var buttonColours = ["red", "blue", "green", "yellow"];

// array of randomly generated colours pattern

var gamePattern = [];

// array of clicked colours pattern

var userClickedPattern = [];

// press animation function

var level;

function animatePress(currentColour){
    var clickedButton = $("#"+ currentColour);
    clickedButton.addClass("pressed");
        
    setTimeout(function(){
        clickedButton.removeClass("pressed");
    }, 100)
};

// play sound function

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// next sequence function

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

// button click function

$(".btn").click(function(){
    if(gameNotStarted){
        gameOver();
    }
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// start game 
var gameNotStarted = true;
$(document).keydown(function(){
    if(gameNotStarted){
        level = 0;
        nextSequence();
        gameNotStarted = false;        
    }
});

// game over

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    gameNotStarted = true;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

// check answer

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel === gamePattern.length - 1){
            setTimeout(function(){
                nextSequence();                
            }, 1000)
        }
    } else {
        gameOver();
    }
}