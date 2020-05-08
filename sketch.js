var flag = 0;
var player;
var background;
//var ground;
var bookGroup;
var playerAnimation;
var enemyGroup;
var bookImg;
var y = 0;
var gameState = "serve";
var goingDown = 1;
var goingUp = 0;
var playerYPosition;
var score = 0;
var monster1Img, monster2Img,monster3Img, monster4Img,monster5Img, monster6Img;
var healthBoosterImg, jetpackBoosterImg;
var reset;



function preload(){
  playerAnimation = loadAnimation("Images/frame1.png","Images/frame2.png","Images/frame3.png","Images/frame4.png","Images/frame5.png","Images/frame6.png","Images/frame7.png","Images/frame8.png");
  playerAnimation2 = loadAnimation("frames/frame1.png", "frames/frame2.png", "frames/frame3.png", "frames/frame4.png", "frames/frame5.png", "frames/frame6.png", "frames/frame7.png", "frames/frame8.png");
  
  bookImg = loadImage("Images/book.png");
  
  monster1Img = loadImage("monsterImg/monster1.png");
  monster2Img = loadImage("monsterImg/monster2.png");
  monster3Img = loadImage("monsterImg/monster3.png");
  monster4Img = loadImage("monsterImg/monster4.png");
  monster5Img = loadImage("monsterImg/monster5.png"); 
  monster6Img = loadImage("monsterImg/monster6.png");

  healthBoosterImg = loadImage("Boosters/LifeBooster.png");
  jetpackBoosterImg = loadImage("Boosters/jetpack.png");
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  reset = createSprite(displayWidth/2,displayHeight/2, 50, 50);
  player = createSprite(displayWidth/2, displayHeight/2,50,50);
  player.addAnimation("running",playerAnimation);
  player.addAnimation("left running", playerAnimation2);
  player.scale = 0.3;
  player.debug = true; 
  bookGroup = new Group();
  enemyGroup = new Group();
  playerYPosition = player.y;

  //ground = createSprite(displayWidth/2, displayHeight-10,displayWidth,10);
  
   
}

function draw() {
  background(90,255,255);

  if(gameState==="serve"){
    textSize(15);
    fill(0);
    text("PRESS SPACE TO START GAME",camera.position.x-100, camera.position.y);
    text("USE ARROW KEYS TO CONTROL THE PLAYER! TO ESCAPE THE SCHOOL",camera.position.x-240, camera.position.y+50);
    player.visible = false;
    reset.visible = false;
  }
  if(gameState==="play"){
    camera.position.y = player.y;
    player.visible = true;
    reset.visible = false;
    console.log("spawning the books");   
    spawnBooks();
    spawnEnemy();
    player.collide(bookGroup);
    if(player.isTouching(enemyGroup)){
      gameState = "end";
      reset.visible = true;
    }
    textSize(30);
    fill ("Green")
    text("Score:"+score,camera.position.x+400,camera.position.y-200);
  }
  else if(gameState === "end"){
    player.visible = false;
    enemyGroup.destroyEach();
    bookGroup.destroyEach();
    reset.y = camera.position.y;
    reset.visible = true;
    text("gameOver",camera.position.x, camera.position.y);
    if(mousePressedOver(reset)){
       gameState = "serve";
      // reset.visible = false;
       score = 0;   
    }
  }
  
  drawSprites();
}

function spawnBooks(){
  if(frameCount % 10 === 0){
    var x = floor(random(10,displayWidth-100));
    y = y-100;
    var book = createSprite(x,y,200,10);
    book.scale = 0.5;
    book.addImage('float',bookImg);
    book.debug = true;
    book.setCollider("rectangle", 0,0,book.width-10,book.height-10);
    //book.velocityY = 3;
    bookGroup.add(book);
  }

}
function keyPressed(){
  //when you press the spacebar player will jump 
   if(keyCode===UP_ARROW){
     player.velocityY = -20;
     player.velocityX = 0;
     score = score+10;
     flag = 1;
    
   }
  if(keyCode=== LEFT_ARROW){
    player.velocityX = -5;
    player.velocityY = 0;
    player.changeAnimation("left running", playerAnimation2);
    flag = 1;
  }
  
  if(keyCode===RIGHT_ARROW){
    player.velocityX = 5;
    player.velocityY = 0;
    player.changeAnimation("running", playerAnimation);
    flag = 1;
  }
  if(keyCode===32){
    gameState = "play";
  }
  if(keyCode=== DOWN_ARROW){
    player.velocityY = 10;
  }
}

function keyRealeased(){
  player.velocityY = 0;
  player.velocityX = 0;
  playerYPosition = player.y;
  flag = 0;
}

function spawnEnemy(){
  if(frameCount % 100 === 0){
    var x = floor(random(10,displayWidth-100));
    y = y-100;
    var enemy = createSprite(x,y,20,40);
    enemyGroup.add(enemy);
    
    var rand = Math.round(random(1,6));
     switch(rand){
       case 1: enemy.addImage(monster1Img);
       break;
       case 2: enemy.addImage(monster2Img);
       break;
       case 3: enemy.addImage(monster3Img);
       break;
       case 4: enemy.addImage(monster4Img);
       break;
       case 5: enemy.addImage(monster5Img);
       break;
       case 6: enemy.addImage(monster6Img);
       break;
       default: break;
     }
  }
}

