var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(".btn").on("click",function(){
    var choosenColor=this.id;
    userClickedPattern.push(choosenColor);
    playSound(choosenColor);
    animatePress(choosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$("body").keydown(function(){
    if(started===false){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern=[];

    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}