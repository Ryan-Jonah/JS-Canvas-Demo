let gamePieces = [];
let speedLow    = 1;
let speedHigh   = 10;

// Get Bootstrap Colours
let colourDocStyle  = getComputedStyle(document.body);
let colourPrimary   =  colourDocStyle.getPropertyValue('--bs-primary');
let colourSecondary =  colourDocStyle.getPropertyValue('--bs-secondary');
let colourSuccess   =  colourDocStyle.getPropertyValue('--bs-success');
let colourInfo      =  colourDocStyle.getPropertyValue('--bs-info');
let colourWarning   =  colourDocStyle.getPropertyValue('--bs-warning');
let colourDanger    =  colourDocStyle.getPropertyValue('--bs-danger');
let colourLight     =  colourDocStyle.getPropertyValue('--bs-light');
let colourDark      =  colourDocStyle.getPropertyValue('--bs-dark');

let bsColors = [
    colourPrimary, 
    colourSecondary,
    colourSuccess,
    colourInfo,
    colourWarning,
    colourDanger,
    colourLight,
    colourDark
]
  
const myGameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
      this.canvas.width = 1520;
      this.canvas.height = 700;
      this.canvas.id = "gameCanvas";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
}

function startGame() {
    myGameArea.start();

    generatePieces(500, 25, 25);
    
    document.getElementById("startButton").remove(); 
}

class square {
    constructor(width, height, color, x, y, xSpeed, ySpeed) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        
        this.update = function () {
            updateMovement(this);
            let gameContext = myGameArea.context;
            gameContext.fillStyle = color;
            gameContext.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}

function updateMovement(component) {
    component.x += component.xSpeed;
    component.y += component.ySpeed;
    
    if (component.x + component.width >= myGameArea.canvas.width) {
        component.xSpeed *= -1;
    }
    if (component.x <= 0) {
        component.xSpeed *= -1;
    }
    if (component.y + component.height >= myGameArea.canvas.height) {
        component.ySpeed *= -1;
    }
    if (component.y <= 0) {
        component.ySpeed *= -1;
    }
}

function generatePieces(count, width, height) {

    //Create number of square objects and adds them to gamePieces array
    for (let squareCount = 0; squareCount < count; squareCount++) {
        let randIndex = Math.floor(Math.random() * 7);
        let color = bsColors[randIndex];
        gamePieces.push(
            new square(
                width, 
                height, 
                color, 
                getRndInteger(1, myGameArea.canvas.width/2),  //xPos
                getRndInteger(1, myGameArea.canvas.height/2), //yPos
                getRndInteger(speedLow, speedHigh),             //xSpd
                getRndInteger(speedLow, speedHigh)              //ySpd
            )
        );   
    }
}

function updateGameArea() {
    myGameArea.clear();

    for (let gamePiece = 0; gamePiece < gamePieces.length; gamePiece++) {
        gamePieces[gamePiece].update();
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
