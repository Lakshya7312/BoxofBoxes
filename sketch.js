// CREATE GLOBAL VARIABLES
// For Engine, World, Bodies and any other that you have in mind to make your coding life easier.
// remember to create an array of boxes.
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
function setup() {
    createCanvas(400, 400);

    // Create an instance of Engine, World
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    // A slider is already created for you here. This slider will dictate the gravity of the world
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 10);
 
    // Create a ground rectangle that would hold all the boxes and add it to the world.
    var ground_option={
        isStatic:true,
    }
    ground = Bodies.rectangle(200,390,width,20,ground_option);
    World.add(world,ground);
    console.log(ground.position.x);
    console.log(ground.position.y);
}
 
function mousePressed() {
    if (mouseY < 350) {
       boxes.push(new Box(mouseX, mouseY, random(10, 50), random(10, 50)));
    }
}
 
function draw() {
   background(51);
   noStroke();
   fill(170);
   rectMode(CENTER);
   rect(ground.position.x, ground.position.y, width, 20);
    // This is the value of your gravity. You can optionally show it to the viewer.
    var fVal = gSlider.value();
 
    // Use a for loop to show all the boxes
    for (var i = 0; i < boxes.length; i++){
        boxes[i].show();
    }
}
 

// You can either create a file for the class Box or build a simple function that creates one box at a time.
// I have gone for the second option.
function Box(x, y, w, h, options) {
        
    // add options such as friction and restitution. Experiment with the values
    var options = {
     'firction':0.8,
     'restitution':1.0,
    }
    this.body = Bodies.rectangle(x,y,w,h,options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 

    this.show = function () {
     var pos = this.body.position;
     var angle = this.body.angle;
     push();
     translate(pos.x, pos.y);
     rotate(angle);
     stroke("black");
     strokeWeight(2);
     rectMode(CENTER);
     rect(0, 0, this.w, this.h);
     pop();

    }
}