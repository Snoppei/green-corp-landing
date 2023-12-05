
const COLORS = ["255,255,255", "216,251,255", "119,129,137"]; // белый, сиреневый, тень 
const SNOWFLAKE_DENSITY = 100;
function generateDecimalBetween(left, right) {
    return (Math.random() * (left-right) + right).toFixed(2);
}

class Snowflake {
    constructor(canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
    init() {
        this.shadow = COLORS[2];
        this.coral = COLORS[1];
        this.white = COLORS[0];
        this.alpha = 0.2;
        this.size = generateDecimalBetween(4, 6);;
        this.translateX = generateDecimalBetween(0, this.canvasWidth);
        this.translateY = generateDecimalBetween(0, this.canvasHeight);
        this.velocity = generateDecimalBetween(20, 30);
        this.movementX = generateDecimalBetween(0, 4) / this.velocity;
        this.movementY = generateDecimalBetween(-10, -1) / this.velocity;
    }
    move() {
        this.translateX -= this.movementX;
        this.translateY -= this.movementY;
        if (this.translateY > this.canvasHeight + this.size*2 || this.translateX < 0 - this.size*2 || this.translateX > this.canvasWidth + this.size*2) {
            this.init();
            this.translateY = -this.size*2;
        }
    }
}

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }
    start() {
        this.canvasSize();
        this.generateSnowflakes();
        this.animate();
    }
    canvasSize() {
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }
    generateSnowflakes() {
        this.snowflakesList = [];
        for(let i = 0; i < SNOWFLAKE_DENSITY; i++) {
            this.snowflakesList.push(new Snowflake(this.canvas));
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight); //
        this.snowflakesList.forEach(e => {
            e.move();
            this.ctx.translate(e.translateX, e.translateY);
            this.ctx.beginPath();
            this.ctx.arc(4, 4, e.size, 0, Math.PI*2);
            this.ctx.fillStyle = "rgba(" + e.shadow + "," + e.alpha + ")";
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(2, 2, e.size, 0, Math.PI*2);
            this.ctx.fillStyle= "rgba(" + e.coral + "," + 1 + ")";
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(0, 0, e.size, 0, Math.PI*2);
            this.ctx.fillStyle = "rgba(" + e.white + "," + 1 + ")";
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            // this.ctx.closePath();
            // this.ctx.beginPath();
            // this.ctx.arc(1, 1, e.size, 0, Math.PI*2);
            // this.ctx.fillStyle= "rgba(" + e.coral + "," + e.alpha + ")";
            // this.ctx.fill();
            // this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            // this.ctx.closePath();
            // this.ctx.beginPath();
            // this.ctx.arc(0, 0, e.size, 0, Math.PI*2);
            // this.ctx.fillStyle = "rgba(" + e.white + "," + e.alpha + ")";
            // this.ctx.fill();
            // this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            // this.ctx.closePath();
            
        });
        requestAnimationFrame(this.animate.bind(this));
    }
}

const canvasBack = new CanvasBackground("orb=canvas");
canvasBack.start();