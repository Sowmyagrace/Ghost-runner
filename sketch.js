var ghostimg,ghost,climberimg,doorimg,tower,towerimg,ghostimg2,climberGroup,doorGroup,invblockGroup,sound;
var score=0;
var gameState="play";
function preload(){
  ghostimg=loadAnimation("ghost-standing.png");
  ghostimg2=loadAnimation("ghost-jumping.png");
  towerimg=loadImage("tower.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  sound=loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600);
  sound.loop();
  
  
  tower=createSprite(300,300);
  tower.addImage(towerimg);
  tower.velocityY=1;
  
  ghost=createSprite(300,300,20,40);
  ghost.addAnimation("ghost",ghostimg);
  ghost.addAnimation("ghostjump",ghostimg2);
  ghost.scale=0.4;
  
  climberGroup=new Group();
  doorGroup=new Group();
  invblockGroup= new Group();
}
function draw(){
  background(0);
  
  if(gameState==="play")
    {
      score=score+Math.round(getFrameRate()/60);
  if(tower.y>400)
    {
      tower.y=300;
    }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown("space"))
    {
      ghost.velocityY=-10;
 //     ghost.changAnimation("ghostjump",ghostimg2);
    }
  ghost.velocityY=ghost.velocityY+0.7;
  spawndoors();
       if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invblockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
      sound.stop();
    }
    
  drawSprites();
      fill("red");
      text("score "+score,500,50);
    }    
  if (gameState === "end"){
    stroke("yellow");
    
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    score=0;
  }

  
}
function spawndoors(){
  if(frameCount%240===0){
    
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invblock= createSprite(200,15);
    invblock.width = climber.width;
    invblock.height = 2;
    
     door.x = Math.round(random(120,400));
     climber.x = door.x;
    invblock.x=door.x;
      
    door.addImage(doorimg);
    climber.addImage(climberimg);
    
    door.velocityY=1;
    climber.velocityY=1;
    invblock.velocityY=1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invblock.lifetime = 800;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invblock.debug=true;
    invblockGroup.add(invblock);
    
  }
}
