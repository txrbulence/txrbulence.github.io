function tutorial() {
    alert('Thanks for playing my game! Use the mouse to move your paddle (the left paddle)')
}

//draws the canvas, ball, and paddles
function drawEverything() {
    //makes the canvas black
    colorRect(0,0,canvas.width,canvas.height,'black');

    if(showingMainMenu) {
        canvasContext.fillStyle = 'white'
        .playButton

    }

    if(showingWinScreen) {
        canvasContext.fillStyle = 'white'

        if(player1Score >= winningScore) {
            canvasContext.fillText("Left Player Won!", canvas.width/2,250);
        }
         else if(player2Score >= winningScore) {
            canvasContext.fillText("Bobby beat you this time . . .", canvas.width/2, 250)
        }
        canvasContext.fillText('Click LMB to continue!', canvas.width/2, 175);
        return;
    }

    ballX = ballX + 5;

    drawNet()

    //this is the left player paddle
    colorRect(0,paddle1Y,paddleThickness,100, 'white');

    //this is the right player paddle
    colorRect(canvas.width-10,paddle2Y,paddleThickness ,100, 'white');

    //next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.textAlign = 'center';
    canvasContext.font = ' 20px pixeled';
    canvasContext.fillText(player1Score, 100, 100, 120);
    canvasContext.fillText(player2Score, canvas.width-100, 100, 120);
}
