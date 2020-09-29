  var sword,swordImage
  var alien1,alien2
  var alien1Image,alien2Image
  var fruit1,fruit2,fruit3,fruit4
  var fruit1Image,fruit2Image,fruit3Image,fruit4Image
  var score=0
  var cloudsGroup,fruitsGroup
  var gameOverImage
  var gameState="play"
  var gameOver
  var gameoverSound
  var fruitSound
  

  function preload(){
    swordImage=loadImage("sword.png")
   alien1=loadImage("alien1.png")
    alien2=loadImage("alien2.png")
    fruit1Image=loadImage("fruit1.png")
    fruit2Image=loadImage("fruit2.png")
    fruit3Image=loadImage("fruit3.png")
    fruit4Image=loadImage("fruit4.png")
    gameOverImage=loadImage("gameover.png")
    gameoverSound=loadSound("gameover.mp3")
    fruitSound=loadSound("knifeSwooshSound.mp3")
    
  }

  function setup() {
    createCanvas(600,400)
    sword=createSprite(200,200,20,20)
    sword.addImage("swordImage",swordImage)
    sword.debug=true

    sword.scale=0.7
aliensGroup=createGroup();
    fruitsGroup=createGroup();
    gameOver=createSprite(200,200,20,20)
    gameOver.addImage("gameOverImage",gameOverImage)
    gameOver.visible=false
   
  }




  function draw(){
  background("lightblue")
    text("score:"+score,530,40)
    if(gameState=="play"){
       if(fruitsGroup.isTouching(sword)){
        score=score+1
         fruitSound.play()
     fruitsGroup.destroyEach()
    }
    if(aliensGroup.isTouching(sword)) {
     gameoverSound.play()
      gameState="end"
      
    }
    sword.x=mouseX
    sword.y=mouseY
    alien()
    fruit()
    }
  else if(gameState=="end"){
    fruitsGroup.destroyEach()
      aliensGroup.destroyEach()
      aliensGroup.setVelocityXEach(0)
      fruitsGroup.setVelocityXEach(0)
   sword.destroy()
    gameOver.visible=true
  }

    drawSprites();
  }

  function alien() {
    if(frameCount %100==0){
      var position2=Math.round(random(1,2))
      var alien=createSprite(500,400,20,20)
       if(position2==1){
        alien.x=400
        alien.velocityX=-(7+score/4)
      }
      else if(position2==2) {
        alien.x=10
        alien.velocityX=(7+score/4)
      }
      var rand = Math.round(random(1,2))
      switch (rand) {
        case 1:
          alien.addImage(alien1)
          break;
          case 2:
          alien.addImage(alien2)
          break;
      }
      alien.lifetime=1000
      alien.y=Math.round(random(1,500))
      aliensGroup.add(alien)
    }
  }
  function fruit() {
    if(frameCount%60==0) {
      var position=Math.round(random(1,2))
      var fruit=createSprite(100,200,50,50)
      if(position==1){
        fruit.x=400
        fruit.velocityX=-(7+score/4)
      }
      else if(position==2) {
        fruit.x=10
        fruit.velocityX=(7+score/4)
      }
      
      var rand = Math.round(random(1,4))
      switch (rand){
        case 1:
          fruit.addImage(fruit1Image)
          break;
          case 2:
          fruit.addImage(fruit2Image)
          break;
          case 3:
          fruit.addImage(fruit3Image)
          break;
          case 4:
          fruit.addImage(fruit4Image)
          break;
      }
      fruit.lifetime=1000
      fruit.scale=0.2
      fruit.y=Math.round(random(100,600))
      fruitsGroup.add(fruit)
    }
  }
