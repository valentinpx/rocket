var rocket;
var stars = [];

function setup() { 
  createCanvas(500, 700);
  rocket = new Rocket();
  for (i = 0; i <= 25; i++)
    stars.push(new Star());
} 

function draw() { 
  background("black");
  for (i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].drop();
  }
  rocket.show();
  rocket.move();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && rocket.dir >= -2) {
    rocket.dir -= 1;
  } else if (keyCode === RIGHT_ARROW && rocket.dir <= 2) {
    rocket.dir += 1;
  }
}

function Star() {
  this.y = -1 * random(10);
  this.x = random(500);
  this.size = random(20);

  this.show = function() {
    fill("white");
    rect(this.x, this.y, this.size, this.size);
  }

  this.drop = function() {
    this.y += 1 / this.size * 100;
    if (this.y > 700) {
      this.y = -1 * random(10);
      this.x = random(500);
      this.size = random(20);
    }
  }
}

function Rocket() {
  this.x = 0;
  this.dir = 0;

  this.show = function() {
    fill("grey");
    rect(225 + this.x, 550, 50, 100);
  }

  this.move = function() {
    if (this.x < -225)
      this.x = 225;
    else if (this.x > 225)
      this.x = -225;
    this.x += 5 * this.dir;
  }
}