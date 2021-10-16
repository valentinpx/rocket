const colors = ["#FFCB60", "#926D27", "#75571F", "#876A32", "#B68831"];
const path = "https://raw.githubusercontent.com/valentinpx/rocket/master/rocket.png";

var game_over = 0;
var rocket;
var img;
var stars = [];
var asteroids = [];
var score = 0;

function preload() {
  img = loadImage(path);
}

function setup() { 
  createCanvas(500, 700);
  rocket = new Rocket();
  for (i = 0; i <= 25; i++)
    stars.push(new Star());
  for (i = 0; i <= 10; i++)
    asteroids.push(new Asteroid());
} 

function draw() { 
  background("black");
  for (i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].drop();
  }
  if (game_over == 0) {
    for (i = 0; i < asteroids.length; i++) {
      asteroids[i].show();
      asteroids[i].drop();
    }
    rocket.show();
    rocket.move();
    fill("blue")
    textSize(30)
    textAlign(LEFT, LEFT);
    textFont("Courier");
    text("Score [" + score + "]", 10, 10, 450, 100);
  } else {
    fill("white")
    textSize(50)
    textAlign(CENTER, CENTER)
    textFont("Courier");
    text("Game Over\nscore: " + score, 00, 300, 500, 100)
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && rocket.dir >= -2)
    rocket.dir -= rocket.dir != 1 ? 1 : 2;
  else if (keyCode === RIGHT_ARROW && rocket.dir <= 2)
    rocket.dir += rocket.dir != -1 ? 1 : 2;
  else if (keyCode === 32 && game_over == 1) {
    game_over = 0;
    score = 0;
    for (i = 0; i < asteroids.length; i++) {
      asteroids[i].x = random(500);
      asteroids[i].y = -1 * random(2800);
    }
  }
}

function Asteroid() {
  this.x = random(500);
  this.y = -1 * random(2800);
  this.color = random(colors);

  this.show = function() {
    fill(this.color);
    rect(this.x, this.y, 50, 50);
  }

  this.drop = function() {
    if (this.y >= 500 && this.y <= 650 &&
      this.x >= rocket.abs_x - 50 && this.x <= rocket.abs_x + 50)
      game_over = 1;
    this.y += 10;
    if (this.y > 700) {
      this.x = random(500);
      this.y = -1 * random(2800);
      score += 10;
    }
  }
}

function Star() {
  this.y = -1 * random(100);
  this.x = random(500);
  this.size = random(20);

  this.show = function() {
    fill("white");
    rect(this.x, this.y, this.size, this.size);
  }

  this.drop = function() {
    this.y += this.size;
    if (this.y > 700) {
      this.y = -1 * random(100);
      this.x = random(500);
      this.size = random(20);
    }
  }
}

function Rocket() {
  this.abs_x = 0
  this.x = 0;
  this.dir = 0;

  this.show = function() {
    this.abs_x = 225 + this.x;
    image(img, this.abs_x, 550, 50, 100);
    // rect(this.abs_x, 550, 50, 100);
  }

  this.move = function() {
    if (this.x < -225)
      this.x = 225;
    else if (this.x > 225)
      this.x = -225;
    this.x += 5 * this.dir;
  }
}