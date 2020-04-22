var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
  userClickedPattern.length = 0;
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#level-title").text("Level "+level);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio('sounds/'+randomChosenColour+'.mp3');
  audio.play();
  // level += 1;
  // console.log(gamePattern);
  // console.log(userClickedPattern);
}
function animatePress(currentColour){
  // console.log($("#" + currentColour));
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
}

$(".btn").click(function(){
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  btn_audio = new Audio('sounds/' + userChosenColour + '.mp3');
  btn_audio.play();
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});


$(document).keypress(function(){
  if(!started){
    nextSequence();
  }
  started = true;
})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success " + currentLevel + " " + level);
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    failSound = new Audio('sounds/wrong.mp3');
    failSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 200);
    console.log("Failure");
    StartOver();
    $("h1").text("Press any key to Restart");
  }
}

function StartOver(){
  level = 0;
  gamePattern.length = 0;
  started = false;
}
