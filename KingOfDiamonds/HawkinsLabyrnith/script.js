
// Game Variables

let currentDice = 0;
let playerHealth = 150;
let vecnaHealth = 5;
let vecnaStarted = false;
let vecnaTimer;

// Player Position

let player =
{
row:4,
col:0
};

// Visited Cells

let visited = [21];

// Unlock Values

let cellValues = [];

for(let i=0;i<25;i++)
{
cellValues.push(Math.floor(Math.random()*10)+1);
}

// Cell Types
// 65% REAL
// 35% UPSIDE DOWN

let cellTypes = [];

for(let i=0;i<25;i++)
{
  let randomType =Math.floor(Math.random()*100)+1;

  if(randomType<=65)
  {
    cellTypes.push("REAL");
  }
  else
  {
    cellTypes.push("UPSIDE DOWN");
  }

}

// Exit Door

let exitCell;
do
{
  exitCell =Math.floor(Math.random()*25)+1;
}
while(exitCell==21);

// Create Board

for(let i=1;i<=25;i++)
{
  document.getElementById("board").innerHTML +="<button id='cell"+i+"' onclick='cellClicked("+i+")'>?</button>";
}

// Starting Cell

document.getElementById("cell21").innerHTML="&#128512";//😀
//document.getElementById("cell21").style.backgroundColor = "green";
// Draw Player

function drawPlayer()
{
  let cellNumber =player.row*5 +player.col + 1;
  let currentType =cellTypes[cellNumber-1];

  if(currentType=="REAL")
  {
    document.getElementById("cell"+cellNumber).innerHTML="&#128526";//😎
  }
  else
  {
    document.getElementById("cell"+cellNumber).innerHTML="&#128560";//😨
  }
}

// Show Adjacent Values

function showAdjacentValues()
{
  let text ="Valid Moves:<br>";

  let directions =
  [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1]
  ];

  for(let i=0;i<directions.length;i++)
  {
    let newRow =player.row + directions[i][0];

    let newCol =player.col +directions[i][1];

    if(newRow>=0 && newRow<5 && newCol>=0 && newCol<5)
    {
        let cellNumber =newRow*5 +newCol + 1;

        let value = cellValues[cellNumber-1];

        text +="Cell " +cellNumber +" : " +value +"<br>";
    }
  }

  document.getElementById("adjacentInfo").innerHTML=text;
}

showAdjacentValues();
// Roll Dice

let rollButton =document.getElementById("rollButton");

rollButton.onclick =
function()
{
  currentDice =Math.floor(Math.random()*10)+1;
  document.getElementById("diceResult").innerHTML ="Dice: " + currentDice;
};

// Cell Click

function cellClicked(cell)
{
  if(currentDice==0)
  {
    alert("Roll Dice First");
    return;
  }
  let oldRow =player.row;
  let oldCol =player.col;
  let cellValue =cellValues[cell-1];
  let cellType =cellTypes[cell-1];
  document.getElementById("unlockLabel").innerHTML ="Unlock Number: "+ cellValue;

  player.row =Math.floor((cell-1)/5);
  player.col =(cell-1)%5;

  let rowDiff =Math.abs(player.row-oldRow);
  let colDiff =Math.abs(player.col-oldCol);
 if((rowDiff==0 && colDiff==1) || (rowDiff==1 && colDiff==0))
 {
    if(cellValue<=currentDice)
    {
        if(vecnaStarted==false)
        {
            vecnaStarted=true;
            vecnaTimer =setInterval(
            function()
            {
                if(playerHealth>0)
                {
                    vecnaHealth++;

                    document.getElementById("vecnaHp").innerHTML ="Vecna Health: "+ vecnaHealth;
                }
            },
            1000);
        }

        visited.push(cell);

        for(let i=1;i<=25;i++)
        {
            if(visited.includes(i))
            {
                document.getElementById("cell"+i).innerHTML="";
            }
            else
            {
                document.getElementById("cell"+i).innerHTML="?";
            }
        }
        if(cellType=="REAL")
        {
            document.getElementById("cell"+cell).style.backgroundColor ="green";
        }
        else
        {
            document.getElementById("cell"+cell).style.backgroundColor ="red";
            playerHealth =playerHealth - 10;
        }
        document.getElementById("healthLabel").innerHTML ="Player Health: "+ playerHealth;
        document.getElementById("world").innerHTML ="World: "+ cellType;
        drawPlayer();

        showAdjacentValues();
        currentDice = 0;

        document.getElementById("diceResult").innerHTML ="Dice: 0";

        if(playerHealth<=0)
        {
            clearInterval(vecnaTimer);
            alert("GAME OVER");

            location.reload();
        }
        if(cell==exitCell)
        {
            clearInterval(vecnaTimer);
            document.getElementById("cell"+cell).innerHTML="&#128682";//🚪
            if(playerHealth>vecnaHealth)
            {
              alert("YOU WIN");
            }
            else
            {
              alert("VECNA WINS");
            }
            location.reload();
        }
        if(playerHealth<vecnaHealth)
           {
             clearInterval(vecnaTimer);
             alert("YOU LOST /n GAME OVER");
             location.reload();
           }
    }
    else
    {
       player.row =oldRow;
       player.col =oldCol;
        alert("Requirement = "+ cellValue);
       currentDice=0;
    }
 }
 else
 {
  player.row =oldRow;
  player.col =oldCol;
  alert("INVALID MOVE");
 }

}