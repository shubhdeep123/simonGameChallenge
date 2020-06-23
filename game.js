var buttonColour = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".start a").click(()=>{
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Click Below");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)

        startOver();
    }
}

$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}