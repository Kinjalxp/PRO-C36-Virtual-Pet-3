const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var myEngine, myWorld;

var database;
var foodS;
var foodStock = 20;
var foodObj;
var feed, addFood;
var lastFed;

var bedroomImg, gardenImg, washroomImg;
var dog, happyDogImg, dogImg, happyDog, sadDogImg; 

var gameState, readState;

function preload()
{
	happyDogImg = loadImage("images/happydog.png");
  dogImg = loadImage("images/dogImage.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sadDogImg = loadImage("images/deadDog.png");
}

function setup() {
	createCanvas(1000,500);
  
	myEngine = Engine.create();
	myWorld = myEngine.world;

  database = firebase.database();
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

    dog = createSprite(800,250,10,10);
    dog.addImage(dogImg);
    dog.scale = 0.3;


    feed = createButton("Feed the Dog");
    feed.position(900,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(1000,95);
    addFood.mousePressed(addFoods);

    readState = database.ref('gameState');
    readState.on("value",function(data){
      gameState = data.val();
    })
}

function draw() {  
  
  console.log(gameState);
  foodObj.display();
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  console.log(lastFed);

  currentTime = hour();
  if(currentTime ==(lastFed + 1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed + 2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed + 4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  // fill(255,255,254);
  // textSize(15);

  // if(lastFed>=12){
  //   text("Last Feed: "+ lastFed%12 + "PM",600,30);
  // }
  // else if(lastFed == 0){
  //   text("Last Fed: 12 AM",600,30);
  // }
  // else{
  //   text("Last Fed: " + lastFed + "AM",600,30);
  // }

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDogImg);
  }

  



  drawSprites();
}

function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
 if(foodObj.getFoodStock()< 0){
   foodObj.updateFoodStock(foodObj.getFoodStock()*0)
 }
 else{
   console.log("113");
   foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
}
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime: hour(),
    gameState: "Hungry"
  })
}

function update(state){
  database.ref("/").update({
    gameState: state
  })
}