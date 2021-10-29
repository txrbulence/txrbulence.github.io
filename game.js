var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
var losingScore = 0;
var winningScore = 7;

var showingMainMenu = true;
var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleThickness = 9;
const paddleHeight = 100;

//calculate the player's mouse position
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt) {
    if(showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

//this makes the program run
window.onload = function() {
    tutorial();
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
    function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y-(paddleHeight/2);
    });

}

function ballReset() {
    if(player1Score >= winningScore ||
        player2Score >= winningScore) {
            showingWinScreen = true;
    }

    ballSpeedX = +2;   
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddleHeight/2);
    if(paddle2YCenter < ballY-25) {
        paddle2Y = paddle2Y += 6;
    } else if(paddle2YCenter > ballY+35) {
        paddle2Y = paddle2Y -= 6;
    
    }
}

//moves the ball, and paddles
function moveEverything() {
    if(showingWinScreen) {
        return;
    }

    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0) {
        if(ballY > paddle1Y &&
            ballY < paddle1Y+paddleHeight) {
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY
                    -(paddle1Y+paddleHeight/2);
                     ballSpeedY = deltaY * 0.35;
        } else {       
            player2Score++; //must be BEFORE ballReset()
            ballReset();
        }     
    }
    if(ballX > canvas.width) {
        if(ballY > paddle2Y &&
            ballY < paddle2Y+paddleHeight) {
                ballSpeedX = -15;

                var deltaY = ballY
                    -(paddle2Y+paddleHeight/2);
                     ballSpeedY = deltaY * 0.35;
        } else {       
            player1Score++; //must be BEFORE ballReset()
            ballReset();
        }     
    }    
    if(ballY < 0) {
        ballSpeedY= +5;
    }
    if(ballY > canvas.height) {
        ballSpeedY = -15;
    }
}

function drawNet() {
    for(var i=0;i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'white');
    }
}


function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = 'drawColor';
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();
}

//draws a rectangle, properties are customizable
function colorRect(leftX,topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height); 
}
