var groundImg, sonicImg, spikeImg, sunImg, gameOverImg, restartImg;
var ground, sonic;
var stage;
var gameState = "PLAY";
var spikeGroup, sunGroup;
var score = 0;
var gameOver, restart;
var spike;
var eatSound, outSound;





function preload(){
  groundImg = loadImage("ground.jpg");
  spikeImg = loadImage("spike.png");
  sonicImg = loadImage("sonic.png");
  sunImg = loadImage("sun.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  eatSound = loadSound("eat.mp3");
  outSound = loadSound("out.mp3");
  
}

function setup() {
  createCanvas(600,600)
  ground = createSprite(200,200,400,400);
  ground.addImage(groundImg);
  ground.velocityX = -4;
  
  sonic = createSprite(40,400);
  sonic.addImage(sonicImg);
  sonic.scale = 0.3;
  
  stage = createSprite(40,444,2000,10);
  stage.velocityX = -4;
  
  gameOver = createSprite(300,170);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,270);
  restart.addImage(restartImg);
  restart.scale = 0.5
  

  spikeGroup = new Group();
  sunGroup = new Group();
  
}

function draw() {
  

  
      if(gameState === "PLAY"){
        if (stage.x < 0){
     stage.x = stage.width/2;
    }
        
        if (ground.x < 0){
     ground.x = ground.width/2;
    }
        
  
  if(keyDown("space")&& sonic.y >= 300){
    sonic.velocityY = -12;
  }
  sonic.velocityY = sonic.velocityY +0.8;
        
        if(sunGroup.isTouching(sonic)) {
          eatSound.play();
          sunGroup.destroyEach();
          score = score+2;   
        }
        
        if(spikeGroup.isTouching(sonic)){
          outSound.play();
          gameState = "END";
        }
        
          spawnSpikes();
  
          spawnSuns();
        
        gameOver.visible = false;
        restart.visible = false;

      }
  
  if(gameState === "END") {
    
    
    score = 0;
    sunGroup.destroyEach();
    spikeGroup.destroyEach();
    ground.velocityX = 0;
    sonic.velocityY = 0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    
    
  }
  

  stage.visible = false;
  
  sonic.collide(stage);

    if(mousePressedOver(restart)) {
      reset();
    }

  
 drawSprites();
  
  stroke("black");
  textSize(20);
  text("SCORE : " + score, 480,30);

}


function spawnSpikes() {
  if (frameCount % 200 === 0) {
    var spike = createSprite(600,420,40,10);
    spike.addImage(spikeImg);
    spike.velocityX = -7;
    spike.scale = 0.5;
    
    spike.lifetime = 700;
    
    spikeGroup.add(spike);
  }
}

function spawnSuns() {
  if (frameCount % 300 === 0) {
    var sun = createSprite(600,120,40,10);
    sun.y = Math.round(random(180,260));
    sun.addImage(sunImg);
    sun.velocityX = -6;
    sun.scale = 0.2;
    
    sun.lifetime = 700;
    
    sunGroup.add(sun);
  }
}

function reset(){
  gameState = "PLAY";
  ground.velocityX = -4;
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
  
}


