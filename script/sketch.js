const defaultFOV = 60;

var canvas;

var walls = [];
var ray;
var player;
var walls;

const sceneW = window.innerWidth / 2;
const sceneH = window.innerHeight;
const diagonal = Math.sqrt(sceneW*sceneW + sceneH*sceneH);
let sliderFOV;

function setup()
{
   //Canvas
   canvas = createCanvas(window.innerWidth, window.innerHeight);

   //Walls
   buildWalls();

   //Player
   player = new Player();
   player.updateFOV(defaultFOV);
}

function draw()
{
   //Clear
   background(0);

   //Physics
   processKeyboard();

    //Rendering environment
    for (let wall of walls)
    {
       wall.draw();
    }
    player.draw();

   //Raycasting
   const scene = player.drawSight(walls);
   const w = sceneW / scene.length;
   const wallH = sceneH * sceneH * 0.2;

   push();
   translate(sceneW, 0);
   for (let i = 0; i < scene.length; i++)
   {
      noStroke();
      const sq = scene[i] * scene[i];
      const wSq = sceneW * sceneW;
      const b = map(sq, 0, wSq, 255, 50);
      const h = wallH / scene[i]; //map(scene[i], 0, sceneW, sceneH, 50);
      fill(b);
      rectMode(CENTER);
      rect(i * w + w / 2, sceneH / 2, w + 1, h);
   }
   pop();
}

function buildWalls()
{
   const side = 10;

   //Borders

   //Top border
   walls.push(new Wall(
      createVector(0, 0), //TL
      createVector(sceneW, 0), //TR
      createVector(sceneW, side), //LR
      createVector(0, side), //LL
      color(255, 255, 255)
   ));
   //Right border
   walls.push(new Wall(
      createVector(sceneW - side, 0), //TL
      createVector(sceneW, 0), //TR
      createVector(sceneW, sceneH), //LR
      createVector(sceneW - side, sceneH), //LL
      color(255, 255, 255)
   ));
   //Bottom border
   walls.push(new Wall(
      createVector(0, sceneH - side), //TL
      createVector(sceneW, sceneH - side), //TR
      createVector(sceneW, sceneH), //LR
      createVector(0, sceneH), //LL
      color(255, 255, 255)
   ));
   //Left border
   walls.push(new Wall(
      createVector(0, 0), //TL
      createVector(side, 0), //TR
      createVector(side, sceneH), //LR
      createVector(0, sceneH), //LL
      color(255, 255, 255)
   ));

   //Inner walls

   //Top left
   //w:580, h:800
   walls.push(new Wall(
      createVector(sceneW/7.25, sceneH/16.0), //TL
      createVector(sceneW/4.83, sceneH/16.0), //TR
      createVector(sceneW/4.36, sceneH/2.96), //LR
      createVector(sceneW/7.25, sceneH/2.66), //LL
      color(255, 255, 255)
   ));
   walls.push(new Wall(
      createVector(sceneW/7.25, sceneH/16.0), //TL
      createVector(sceneW/4.83, sceneH/16.0), //TR
      createVector(sceneW/4.36, sceneH/2.96), //LR
      createVector(sceneW/7.25, sceneH/2.66), //LL
      color(255, 255, 255)
   ));
}

function processKeyboard()
{
   if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) //Left arrow or A
   {
      player.moveSide(-2);
   }
   if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) //Right arrow or D
   {
      player.moveSide(2);
   }
   if (keyIsDown(UP_ARROW) || keyIsDown(87)) //Up arrow or W
   {
      player.moveForward(2);
   }
   if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) //Down arrow or S
   {
      player.moveForward(-2);
   }
}
function mouseDragged(event)
{
   if (event.movementX == 0) return;

   if (event.movementX > 0)
   {
      player.rotate(event.movementX / 100);
   }
   else if (event.movementX < 0)
   {
      player.rotate(event.movementX / 100);
   }
}

window.onresize = function()
{
   return; //Disallow resize

   var w = window.innerWidth;
   var h = window.innerHeight;  
   canvas.size(w,h);
   width = w;
   height = h;
};