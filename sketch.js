var menina, meninaImg;
var chao,chaoImg;
var pulando,pulandoImg;
var car, carImg;
var score=0
var chaoInvisivel;
var carGroup;
var gameState=play;
var end=0;
var play;
var record=0;


function preload(){

    //nao consegui achar uma png do sonic pulando
    carImg=loadImage("carro.png");
    meninaImg=loadImage("sonic.png");
    chaoImg=loadImage("chao.png");
    pulandoImg=loadImage("pulando_ccexpress.png");
}

function setup() {
    createCanvas(1320,900);

    carGroup = new Group()

    edges = createEdgeSprites();

    chao=createSprite(900,80,800,600);
    chao.addImage(chaoImg);
    chao.scale=4.2

    chaoInvisivel=createSprite(width/2,720,width,20);
    chaoInvisivel.visible=false;

    menina=createSprite(200,670);
    menina.addImage(meninaImg);
    menina.scale=0.3
    
    menina.debug=false
    menina.setCollider("rectangle", 0, 0, 270,100, 90);
    
}

function draw() {
    background("lightblue");

    if(menina.isTouching(carGroup))
    gameState=end;

       

    
    
    

    if(gameState==play){
        
        score+=Math.round(getFrameRate()/60);

        chao.velocityX =-(60 +score/100);
    if(chao.x<0){
        chao.x=chao.width/2
    } 
        

    if(touches.length>0||keyDown("space")&& menina.y>height-350) {
        menina.velocityY = -13;

        touches=[]
    }   
    createCar()

    textSize(15)
    fill("black")
    text("Sonic estava viajando, mas quando chegou lembrou que tinha esquecido o fogão ligado, então teve que voltar correndo. Você consegue ajudar Sonic a chegar em casa?", 20,200)


    }

    if(gameState===end){
        chao.velocityX=0
        carGroup.setVelocityXEach(0);
        carGroup.setLifetimeEach(0);

        score=0;

        stroke("white")
        textSize(70)
        fill("black")
        text("Click here to restart!", 300,250)

        textSize(70)
        fill("black")
        text("Game Over!", 400,350);

        if(record<score){
            record=score;
          }

        if(keyDown("space")){
            
        gameState=play;
            
          
        carGroup.destroyEach();
                   
          
                
          
                 
        score=0;
        }
    }

    stroke("black");
    fill("black");
    textSize(50);
    text("Score: " +score, 500,100);



    fill("black");
    textSize(35);
    text("Record: " +record, 530,150);
    
    

    gravity()    

    menina.collide(chaoInvisivel);

    drawSprites();

}


function gravity(){
    menina.velocityY+=0.5;
}



function createCar(){
    if(frameCount%200==0){
        car = createSprite(width,height-247,40,10);
        car.velocityX=-(5 +score/100)
        car.scale=0.9
        carGroup.add(car);
        car.depth=menina.depth;
        car.lifetime=268;
        car.addImage(carImg);
    }
}