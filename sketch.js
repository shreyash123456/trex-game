var trex,treximage,edges,ground,groundimage,invisibleground,cloud,cloudimg,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score=0,gameover,gameoverimg,restart,rimg,jump,die,checkpoint;
var gamestate="play",cloudsgroup,obstaclesgroup,trexcollide,  message="this is a message",highscore=0;
function preload(){
  treximage=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadAnimation("ground2.png")
  cloudimg=loadAnimation("cloud.png");
  obstacle1=loadAnimation("obstacle1.png");
  obstacle2=loadAnimation("obstacle2.png");
  obstacle3=loadAnimation("obstacle3.png")
  obstacle4=loadAnimation("obstacle4.png");
  obstacle5=loadAnimation("obstacle5.png");
  obstacle6=loadAnimation("obstacle6.png");
  trexcollide=loadAnimation("trex_collided.png");
  gameoverimg=loadAnimation("gameOver.png");
  rimg=loadAnimation("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound ("checkPoint.mp3");
}
function setup(){
  trex=createSprite(50,350,50,60);
  trex.addAnimation("running",treximage);
  trex.scale=0.5;
  ground=createSprite(200,380,400,20);
  ground.addAnimation("run",groundimage);
  
  invisibleground=createSprite(200,390,400,10)
  
  gameover=createSprite(200,150,50,50);
  gameover.addAnimation("A",gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
  
  restart=createSprite(200,200,50,50);
  restart.addAnimation("B",rimg);
  restart.scale=0.5;
  restart.visible=false;
 
  //for making invisibleground invisible
  invisibleground.visible=false;
  
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  
trex.debug=true
  trex.setCollider("rectangle",0,0,80,80);
  trex.addAnimation("collided",trexcollide);
  
  
 // console.log(message)
}

function draw(){
  console.time();
  background("white");
  drawSprites();
  textSize(15);
  text("highscore:"+highscore,120,50);
  
  
 if(highscore<score){
   highscore=score;
 }
 
 // console.log(message)
  
  text("score"+score,250,50);
  if(gamestate==="play"){
  ground.velocityX=-(5+3*score/100);
    score=score+ Math.round(frameRate()/50);
    spawncloud();
    obstacles();
    if(keyDown("space")&&trex.y>350){
      trex.velocityY=-9;
      jump.play();
    }
    trex.velocityY=trex.velocityY+0.5;
  //console.log(trex.y)
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(obstaclesgroup.isTouching(trex)){
      gamestate="end";
      die.play();
      //trex.velocityY=-9;
     // jump.play();
    }
    if(score%100===0&&score>0 ){
      checkpoint.play();
    }
  }
else if(gamestate==="end"){
  ground.velocityX=0;
  cloudsgroup.setVelocityXEach(0);
  obstaclesgroup.setVelocityXEach(0);
  trex.velocityY=0;
  cloudsgroup.setLifetimeEach(-1);
  obstaclesgroup.setLifetimeEach(-1);
  trex.changeAnimation("collided",trexcollide);
  gameover.visible=true;
  restart.visible=true;
  if(mousePressedOver(restart)){
    console.log("press restart")
    reset();
  }
}
   trex.collide(invisibleground);
 // console.info("information")
  //console.error("error")
  //console.warn("warning")
// console.count("drawframeiscalled")
  for(var i=0;i<100;i=i+50){
   // console.log("runningloop");
  }
 // console.timeEnd();
}
function spawncloud(){
  if(frameCount%80===0){
    cloud=createSprite(400,100,50,50);
    cloud.velocityX=-5;
    cloud.addAnimation("clouds",cloudimg);
    cloud.y=random(1,300);
    cloudsgroup.add(cloud);
    
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
   // console.log(cloud.depth);
   // console.log(trex.depth); 
    cloud.lifetime=80;
  }
}
function obstacles(){
  if(frameCount%90===0){
 obstacle=createSprite(400,355,50,50);
  obstacle.velocityX=-5;
    obstacle.scale=0.7;
    obstacle.lifetime=80;
    obstaclesgroup.add(obstacle);
    
  var rand=Math.round(random(1,6));
  
   // console.log(rand);
    switch(rand){
      case 1:obstacle.addAnimation("obstacle1",obstacle1);
        break;
      case 2:obstacle.addAnimation("a",obstacle2);
        break;
      case 3:obstacle.addAnimation("b",obstacle3);
        break;
      case 4:obstacle.addAnimation("c",obstacle4);
        break;
      case 5:obstacle.addAnimation("d",obstacle5);
        break;
      case 6:obstacle.addAnimation("e",obstacle6);
        break;
        default:break;
    
    }
  }
}
function reset(){
  gamestate="play";
  gameover.visible=false;
  restart.visible=false;
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  score=0;
}
