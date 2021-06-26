//if we click on the start/reset
var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("startreset").onclick=function(){
  //if we are playing
  if(playing==true){
    location.reload();
  }
  //if not
  else{
    //set score to zero
    playing=true;
    score=0;
    document.getElementById("scorevalue").innerHTML=score;
    //show countdown box
    show("timeremaining");
    timeremaining=60;
    document.getElementById("timeremainingvalue").innerHTML=timeremaining;

    //hide gameOver
    hide("gameOver");

    //change button to reset
    document.getElementById("startreset").innerHTML="Reset Game";

    //reduce time
    startCountdown();

    //generate Q and Ans
    generateQA();
  }


}
//clicking on an answer box
for(i=1;i<5;i++){
  document.getElementById("box"+i).onclick=function(){
    //check if we are playing
    if(playing==true){
      //yes
      if(this.innerHTML==correctAnswer){
        //correctAnswer
        //score increse
        score++;
        document.getElementById("scorevalue").innerHTML=score;
        //hide wrong answer and show correct answers
        hide("wrong");
        show("correct");
        setTimeout(function(){
          hide("correct");
        },1000);

        //generate Q and A
        generateQA();
      }
      else{
        //wrong answers
        hide("correct");
        show("wrong");
        setTimeout(function(){
          hide("wrong");
        },1000);
      }
    }
  }
}

function startCountdown(){
  action=setInterval(function(){
    timeremaining-=1;
    document.getElementById("timeremainingvalue").innerHTML=timeremaining;
    if(timeremaining==0){
      //game over
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML="<p>Game Over!</p><p>Your score is"+score+".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing=false;
      document.getElementById("startreset"),innerHTML="Start Game";

    }
  },1000);
}

function stopCountdown(){
  clearInterval(action);
}

function hide(Id){
  document.getElementById(Id).style.display="none";
}

function show(Id){
  document.getElementById(Id).style.display="block";
}

function generateQA(){
  var x=1+Math.round(9*Math.random());
  var y=1+Math.round(9*Math.random());
  correctAnswer=x*y;
  document.getElementById("question").innerHTML=x+"*"+y;
  var correctposition=1+Math.round(3*Math.random());
  document.getElementById("box"+correctposition).innerHTML=correctAnswer;
//fill other boxes with wrong answer
  var answers=[correctAnswer];
  for(i=1;i<5;i++){
    if(i!=correctposition){
      var wrongAnswer;
      do{
        wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
      }while(answers.indexOf(wrongAnswer)>-1)
      document.getElementById("box"+i).innerHTML=wrongAnswer;
    }
  }


}
