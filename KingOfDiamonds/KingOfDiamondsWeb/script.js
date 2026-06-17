let button = document.getElementById("clickButton");
button.onclick = clickButton;
let round = 0;
let bot1;
let bot2;
let bot3;
let playerLives = 5;
let bot1Lives = 5;
let bot2Lives = 5;
let bot3Lives = 5;

function updateLives(){
 document.getElementById("playerLives").innerHTML="Player Lives:"+"❤️".repeat(playerLives);
 document.getElementById("bot1Lives").innerHTML="Bot1 Lives:"+"❤️".repeat(bot1Lives);
 document.getElementById("bot2Lives").innerHTML="Bot2 Lives:"+"❤️".repeat(bot2Lives);
 document.getElementById("bot3Lives").innerHTML="Bot3 Lives:"+"❤️".repeat(bot3Lives);
}
updateLives();
function clickButton(){
 let userNumber = Number(document.getElementById("userNumber").value);
 let total = userNumber;
 let count = 1.0;
 if(bot1Lives>0){
  bot1 = Math.floor(Math.random()*101);
  total += bot1;
  count++;
 }
 if(bot2Lives>0){
  bot2 = Math.floor(Math.random()*101);
  total += bot2;
  count++;
 }
 if(bot3Lives>0){
  bot3 = Math.floor(Math.random()*101);
  total += bot3;
  count++;
 }

 let spiderNumber = ((total)/count)*0.8;
 let playerDiff = Math.abs(spiderNumber-userNumber);
 let bot1Diff = bot1Lives>0?Math.abs(spiderNumber-bot1):999999;
 let bot2Diff = bot2Lives>0?Math.abs(spiderNumber-bot2):999999;
 let bot3Diff = bot3Lives>0?Math.abs(spiderNumber-bot3):999999;

 let minDiff = Math.min(playerDiff,bot1Diff,bot2Diff,bot3Diff);

 if(userNumber<1 || userNumber>100){
   alert("ENTER VALID NUMBER FROM 0-100");
 }
 else{
   round++;
   document.getElementById("round").innerHTML="Round:"+round;
   document.getElementById("playerNumber").innerHTML="Player:"+userNumber;
   document.getElementById("bot1Number").innerHTML="Bot1:"+bot1;
   document.getElementById("bot2Number").innerHTML="Bot2:"+bot2;
   document.getElementById("bot3Number").innerHTML="Bot3:"+bot3;
   document.getElementById("spiderNumber").innerHTML="Spider Number:"+spiderNumber.toFixed(2);

   if(minDiff==playerDiff){
     if(bot1Lives>0){
       bot1Lives--;
     }
     if(bot2Lives>0){
       bot2Lives--;
     }
     if(bot3Lives>0){
       bot3Lives--;
     }
     document.getElementById("roundWinner").innerHTML="Round Winner: Player🎉";
   }
   else if(minDiff==bot1Diff){
     if(playerLives>0){
       playerLives--;
     }
     if(bot2Lives>0){
       bot2Lives--;
     }
     if(bot3Lives>0){
       bot3Lives--;
     }
     document.getElementById("roundWinner").innerHTML="Round Winner: Bot1";

   }
   else if(minDiff==bot2Diff){
     if(playerLives>0){
       playerLives--;
     }
     if(bot1Lives>0){
       bot1Lives--;
     }
     if(bot3Lives>0){
       bot3Lives--;
     }
      document.getElementById("roundWinner").innerHTML="Round Winner: Bot2";
   }
   else if(minDiff==bot3Diff){
     if(playerLives>0){
       playerLives--;
     }
     if(bot1Lives>0){
       bot1Lives--;
     }
     if(bot2Lives>0){
       bot2Lives--;
     }
      document.getElementById("roundWinner").innerHTML="Round Winner: Bot3";
   }
   updateLives();
   if(playerLives==0){
      alert("You Lost🥲\n Game Over");
      location.reload();
   }
   if(bot1Lives==0){
      document.getElementById("bot1Number").innerHTML="Bot1:Eliminated"
   }
   if(bot2Lives==0){
      document.getElementById("bot2Number").innerHTML="Bot2:Eliminated"
   }
   if(bot3Lives==0){
      document.getElementById("bot3Number").innerHTML="Bot3:Eliminated"
   }

   if(bot1Lives==0 && bot2Lives==0 && bot3Lives==0){
      alert("You Won🎉!!");
      location.reload();
   }
   if(playerLives==0 && bot2Lives==0 && bot3Lives==0){
      alert("You Lost🥲\n Bot1 Won");
      location.reload();
   }
   if(playerLives==0 && bot1Lives==0 && bot3Lives==0){
      alert("You Lost🥲\n Bot2 Won");
      location.reload();
   }
   if(playerLives==0 && bot1Lives==0 && bot2Lives==0){
      alert("You Lost🥲\n Bot3 Won");
      location.reload();
   }
 }
}

