var player;
var straightPlayerImage,leftPlayerImage,rightPlayerImage;

var ground,groundImage;

var obstacle,obstaclesGroup;
var obstacle1Image,obstacle2Image,obstacle4Image;

PLAY=0;
END=1;
SERVE=2;

var gameState=SERVE;

var distance=0;

function preload(){
  groundImage=loadImage("ground.png");
  
  straightPlayerImage=loadImage("straightPlayer.png");
  leftPlayerImage=loadImage("leftPlayer.png");
  rightPlayerImage=loadImage("rightPlayer.png");
  
  obstacle1Image=loadImage("obstacle.png");
  obstacle2Image=loadImage("obstacle2.png");
  obstacle4Image=loadImage("obstacle4.png");

  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  ground=createSprite(windowWidth,windowHeight);
  ground.addImage(groundImage);
  ground.scale=(height+width)/300
  player=createSprite(width/2,height/5); 
  player.addImage(straightPlayerImage);
  
  leftArrow=createSprite(0,height);
  rightArrow=createSprite(width,height);
  downArrow=createSprite(width/2,height)

  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImage);
  restart=createSprite(width/2,(height/2)+50);
  restart.addImage(restartImage);
  obstaclesGroup=createGroup();
}

function draw(){
  background(0);
  if(gameState===PLAY){
    distance=0;
    distance=Math.round(frameCount/10)
    gameOver.visible=false;
    restart.visible=false;
    ground.visible=true;
   // player.debug=true;
    player.setCollider("rectangle",-3,-2,25,30);
    spawningObstacles();
    ground.velocityY=-6;
    if (ground.x < 0||ground.x>width){
        ground.x = ground.width/2;
      }
    if (ground.y < 0){
        ground.y = ground.height/2;   
    } 
    if(keyDown("right")||touches.x<width/2){
      player.addImage(rightPlayerImage);
      ground.velocityX=-6; 
      obstaclesGroup.setVelocityXEach(-6);
    }
    if(keyDown("left")||touches.x>width/2){
      player.addImage(leftPlayerImage);
      ground.velocityX=6; 
      obstaclesGroup.setVelocityXEach(6);
    }
    if(keyDown("down")){
      player.addImage(straightPlayerImage);
      ground.velocityX=0;
      obstaclesGroup.setVelocityXEach(0);
    }  
   
  }else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    ground.visible=true;
    frameCount=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityYEach(0);
    ground.velocityX=0;
    ground.velocityY=0;
    obstaclesGroup.setLifetimeEach(-1);
    if(keyDown("space")||touches.length>0){
      gameState=PLAY;
      obstaclesGroup.destroyEach();
      player.addImage(straightPlayerImage);
    }
  }else if(gameState===SERVE){
    distance=0;
    textSize(20);
    text("Press 'space'or touch to start",width/3,height/2);
    text("press spce or touch when gameover",width/3.5,height/1.75);
    text("use arrow key or touch blocks to move",width/4,height/1.5);
    gameOver.visible=false;
    restart.visible=false;
    ground.visible=false;
    ground.velocityX=0;
    ground.velocityY=0;
    if(keyDown("space")||touches.length>0){
      gameState=PLAY;
      player.addImage(straightPlayerImage);
      }
  }
  if(player.isTouching(obstaclesGroup)){
    gameState=END;
    }
    drawSprites();
    textSize(20);
    text("distance :"+distance,width/1.2,height/7);
    distance=distance+Math.round(frameCount/100);
}

function spawningObstacles(){
  var rand=Math.round(random(1,3))
  if(frameCount%10===0){
    var obstacle=createSprite(0,height,20,20);
   // console.log(rand);
    obstacle.velocityX=ground.velocityX;
    obstacle.velocityY=ground.velocityY;
    obstacle.x=Math.round(random(0,width))
    obstacle.lifetime=height/obstacle.velocityY;
    if(rand===1){
      obstacle.addImage(obstacle1Image);
    }
    else if(rand===2){
      obstacle.addImage(obstacle2Image);
    }
    else {
      obstacle.addImage(obstacle4Image);
     // obstaclesGroup.setColliderEach("rectacgle",0,0,10,20);
    }
     obstaclesGroup.add(obstacle);
    // obstacle.debug=true;
     obstacle.setCollider("rectangle",0,0,20,20);
  }
}