const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const vec2 = (x, y) => {
    return {x: x, y: y};
}

function Ball(pos, vel, rad) {
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;

    this.update = () => {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    };

    this.draw = () => {
        ctx.fillStyle = "#faf7f2";
        ctx.strokeStyle = "#faf7f2";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };
}

const collisionWithEdge = (ball) => {
    if(ball.pos.y + ball.rad >= canvas.height) {
        ball.vel.y *= -1;
    };
    if(ball.pos.y - ball.rad <= 0) {
        ball.vel.y *= -1;
    };
    if(ball.pos.x + ball.rad >= canvas.width) {
        ball.vel.x *= -1;
    };
    if(ball.pos.x - ball.rad <= 0) {
        ball.vel.x *= -1;
    };
}

const ball = new Ball(vec2(200, 200), vec2(5, 5), 20);

const gameUpdate = () => {
    ball.update();
    collisionWithEdge(ball)
}

const gameDraw = () => {
    ball.draw();
}

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(gameLoop);
    
    gameUpdate();
    gameDraw();
}

gameLoop();

