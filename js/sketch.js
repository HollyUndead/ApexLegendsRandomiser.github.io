// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let width1 = 0;
// document.documentElement.clientWidth * 1.5;
let height1 =0;
//  document.documentElement.clientHeight * 1.5;

function setup() {
  // createCanvas(width1, height1);
  // for (let i = 0; i < 10; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }
  // walls.push(new Boundary(-1, -1, width, -1));
  // walls.push(new Boundary(width, -1, width, height));
  // walls.push(new Boundary(width, height, -1, height));
  // walls.push(new Boundary(-1, height, -1, -1));
  particle = new Particle();
}

function draw() {
  width1 = document.documentElement.clientWidth;
  height1 = document.documentElement.clientHeight;
  createCanvas(width1, height1);
  walls = [];
  walls.push(new Boundary(-1, -1, width, -1));
  walls.push(new Boundary(width, -1, width, height));
  walls.push(new Boundary(width, height, -1, height));
  walls.push(new Boundary(-1, height, -1, -1));
  background(0, 0, 0);
  // for (let wall of walls) {
  //   wall.show();
  // }
  let x1 = noise(xoff)*width;
  let y1 = noise(yoff)*height
  particle.update(x1, y1);
  // particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);

  xoff += 0.004;
  yoff += 0.004;
}
