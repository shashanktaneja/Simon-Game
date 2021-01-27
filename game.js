
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
var index = 0;

function nextSequence(){

    var randomNumber = Math.floor(Math.random()*4); //0-3
    var randomChosenColour = buttonColours[randomNumber];   
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();

    level++;
    $("h1").html("Level "+level);

    index = 0;
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(index);
    index++;
});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

//checking if the game has started

$(document).keydown(function(){
    if(!started){
        $("h1").html("Level "+level);
        nextSequence();    
        started = true;
    }
});

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("success");
        if(currentLevel+1 === level){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern = [];
        }
    }
    else{
        // console.log("wrong");
        var error = new Audio("sounds/wrong.mp3");
        error.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}