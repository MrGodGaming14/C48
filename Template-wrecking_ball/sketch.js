const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;

var engine,world;

var wizard, wizardimage;
var backgroundimage, bg;

var pew, pewImage;

var monster, monsterImage, monsterGroup;

var rope;

var bullet, bulletGroup;

var monsterDestroyedAnimation;

var score=0;
var gameState = start

var wizardDed;

function preload(){
	backgroundimage = loadImage("images/castlebackground.png");
	wizardimage = loadAnimation("images/wizardgif/frame0.png", "images/wizardgif/frame1.png", "images/wizardgif/frame2.png", "images/wizardgif/frame3.png", "images/wizardgif/frame4.png", "images/wizardgif/frame5.png", "images/wizardgif/frame6.png", "images/wizardgif/frame7.png")
	
	monsterImage = loadAnimation("images/monstergif/monster1.png", "images/monstergif/monster2.png" )

	pewImage = loadImage("images/Pewpew.png");

	boomSound = loadSound("Boom.wav")
	gameOver = loadSound("GameoverOne.wav");

	wizardDed = loadImage("images/wizardgif/frame1.png");
	monsterDestroyedAnimation = loadAnimation("images/fire-0/fire-0.png", "images/fire-0/fire-1.png", "images/fire-0/fire-2.png", "images/fire-0/fire-3.png", "images/fire-0/fire-4.png", "images/fire-0/fire-5.png");
}


function setup() {

	
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	bg = createSprite(windowWidth/2, windowHeight/2);
	bg.velocityX=-3;
	bg.addImage(backgroundimage);
	bg.scale = 1;

	wizard = createSprite(width/2 - 500, height/2 + 200, 5, 5);
	wizard.addAnimation("running", wizardimage);
	
	pew = Bodies.circle(width/2 - 500 + 80, height/2 + 200 - 170, 100, {isStatic: false, density: 1, frictionAir: 0.01});
	World.add(world, pew);

	

	//rope = new Rope(pew, {x: 654, y: 508} )
	//console.log(width/2 - 500 + 80, height/2 + 200 - 170)

	monsterGroup = new Group()

	bulletGroup = new Group()
}

function draw() {
Engine.update(engine)
  background(backgroundimage);
  if(bg.x < 0){
	  bg.x = windowWidth/2;

  }
  //console.log(pew.position.x, pew.position.y); 

 // if (touching(pew,monsterGroup)){
	//  monster.addAnimation(wizardDestroyedAnimation);
	//  console.log("line number 65");
 //}


  	if(keyDown("space")){
		  bullet = createSprite(wizard.x + 100, wizard.y- 100, 20, 5);
		  
		  //Matter.Body.applyForce(,pew.position,{x:85,y:-105});
		  bullet.shapeColor="red";
		  bullet.velocityX =4;
		  bullet.velocityY=3;
		  bullet.addImage(pewImage);
		  bullet.scale=0.4;
		  bulletGroup.add(bullet);
	  }

	  

  //rope.display();
spawnMonster();

if(bulletGroup.isTouching(monsterGroup)){
	console.log("I have been touched together!")

	monster.addAnimation("monster", monsterDestroyedAnimation);
	monster.scale=0.5

	boomSound.play();
	score++;
}



drawSprites();
textSize(30);
fill("black");
text("Score: " +score,displayWidth-400, 50)

if(monsterGroup.isTouching(wizard)){
	bg.velocityX=0;
	textSize(60)
	fill("red");
	text("You Died", displayWidth-500, displayHeight-300);
	gameOver.play()
}

ellipseMode(CENTER);
//image(pewImage, pew.position.x, pew.position.y, 100, 100)
}




function mouseDragged(){
Matter.Body.setPosition(pew,{x:mouseX, y:mouseY});

	}

//function mouseReleased(){
//	rope.fly();
//	console.log("Hi, I have launched!")
//}



function spawnMonster(){
 if(frameCount % 250 === 0){
monster = createSprite(windowWidth+10, windowHeight-200, 5, 5);
monster.velocityX = -5;
monster.addAnimation("monster", monsterImage)
monster.lifetime = windowWidth/5;
monsterGroup.add(monster);

 }
}





			
