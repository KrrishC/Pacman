var backgroundImage, pacman, leftpacman, uppacman, downpacman, rightpacman
var score, clue1, clue2, clue3, clue4, clue5
var clue1Img,clue2Img,clue3Img,clue4Img,clue5Img
var ghost1,ghost2,ghost3,ghost4
var ghost1Img,ghost2Img,ghost3Img,ghost4Img
var cluecollected =0;
var evidence, evidenceImg
var blood, pointer, culprit
var bloodImg, pointerImg, culpritImg

function preload() {
  backgroundImage = loadImage('./assets/pacman_bg.png');
  rightpacman = loadAnimation('./assets/pacman.png');
  uppacman = loadAnimation('./assets/uppacman.png');
  downpacman = loadAnimation('./assets/downpacman.png');
  leftpacman = loadAnimation('./assets/leftpacman.png');
  clue1Img = loadImage('./assets/clue.png');
  clue2Img = loadImage('./assets/clue.png');
  clue3Img = loadImage('./assets/clue.png');
  clue4Img = loadImage('./assets/clue.png');
  clue5Img = loadImage('./assets/clue.png');
  ghost1Img = loadImage('./assets/ghost.png');
  ghost2Img = loadImage('./assets/ghost.png');
  ghost3Img = loadImage('./assets/ghost.png');
  ghost4Img = loadImage('./assets/ghost.png');
  evidenceImg = loadImage('./assets/evidence.png')
  culpritImg = loadImage('./assets/culprit.png')
  pointerImg = loadImage('./assets/pointer.png')
  bloodImg = loadImage('./assets/blood.png')





}

function setup() {
 
  canvas = createCanvas(windowWidth, windowHeight);
  pacman = createSprite( width/2,height/2+45);
  pacman.addAnimation('right',rightpacman);
  pacman.addAnimation('left',leftpacman);
  pacman.addAnimation('down',downpacman);
  pacman.addAnimation('up',uppacman);

  clue1 = createSprite(width/2-500,height/2-325);
  clue1.addImage(clue1Img);
  clue2 = createSprite(width/2+500,height/2-325);
  clue2.addImage(clue2Img)
  clue3 = createSprite(width/2+500,height/2+140);
  clue3.addImage(clue3Img)
  clue4 = createSprite(width/2-250,height/2+140);
  clue4.addImage(clue4Img)
  clue5 = createSprite(width/2,height/2+230); 
  clue5.addImage(clue5Img)

  clue1.scale = 0.1;
  clue2.scale = 0.1;
  clue3.scale = 0.1;
  clue4.scale = 0.1;
  clue5.scale = 0.1;

  pacman.scale = 0.1;

  score = 0;
  cluecollected = 0;

  ghost1 = createSprite(width/2,height/2-325);
  ghost1.scale = 0.1;
  ghost1.addImage(ghost1Img);
  
  ghost2 = createSprite(width/2,height/2+415);
  ghost2.scale = 0.1;
  ghost2.addImage(ghost2Img);

  ghost3 = createSprite(width/2+395,height/2-50);
  ghost3.scale = 0.1;
  ghost3.addImage(ghost3Img);

  ghost4 = createSprite(width/2-395,height/2-50);
  ghost4.scale = 0.1;
  ghost4.addImage(ghost4Img);
  
  evidence = createSprite(width/2,height/2-50);
  evidence.scale = 0.1
  evidence.addImage(evidenceImg);
  evidence.visible = false;
  
  culprit = createSprite(width/2+260,height/2-50);
    culprit.addImage(culpritImg);
    culprit.scale = 0.6
    culprit.visible = false;

    pointer = createSprite(width/2+50,height/2-50);
    pointer.addImage(pointerImg);
    pointer.scale = 0.4
    pointer.visible = false;

    blood = createSprite(width/2+375,height/2+105);
    blood.addImage(bloodImg);
    blood.scale = 0.6
    blood.visible = false;

 
}

function draw() {
  background(backgroundImage); 
  drawSprites();
  score = score+ Math.round(getFrameRate()/60);

  

  if(keyDown(RIGHT_ARROW)) {
    pacman.velocityX = +2
    pacman.changeAnimation('right',rightpacman)
  }

  if(keyDown(LEFT_ARROW)) {
    pacman.velocityX = -2
    pacman.changeAnimation('left',leftpacman)
  }

  if(keyDown(UP_ARROW)) {
    pacman.velocityY = -2
    pacman.changeAnimation('up',uppacman)
  }

  if(keyDown(DOWN_ARROW)) {
    pacman.velocityY = +2
    pacman.changeAnimation('down',downpacman)
  }

  fill("yellow");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);

  fill("yellow");
  textSize(40);
  text(`Clues Collected:${cluecollected}`, width - 200, 100);
  textAlign(CENTER, CENTER);



  if(pacman.isTouching(ghost1) || pacman.isTouching(ghost2) || pacman.isTouching(ghost3) || pacman.isTouching(ghost4)) {
    
    background(0);
    textSize(25);
    fill('red')
    text('Case Unsolved :(', width/2,height/2)
    pacman.velocityX = 0;
    pacman.velocityY = 0;
  }

  if(pacman.isTouching(clue1)) {
    clue1.destroy();
    cluecollected = cluecollected+1;
  }

  if(pacman.isTouching(clue2)) {
    clue2.destroy();
    cluecollected = cluecollected+1;
  }
  
  if(pacman.isTouching(clue3)) {
    clue3.destroy();
    cluecollected = cluecollected+1;
  }

  if(pacman.isTouching(clue4)) {
    clue4.destroy();
    cluecollected = cluecollected+1;
  }

  if(pacman.isTouching(clue5)) {
    clue5.destroy();
    cluecollected = cluecollected+1;
  }

  if(cluecollected == 5) {
    evidence.visible = true;
    textSize(60);
    fill('red')
    text('Quickly Find the Evidence!',width/2,height/2-360)
  }

  if (pacman.isTouching(evidence)) {
    background(255);
    textSize(60);
    fill('red')
    text('Case Solved!', width/2,height/2)
    blood.visible = true;
    culprit.visible = true;
    pointer.visible = true;
    
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    
  
  }
  //drawSprites();
  
}






