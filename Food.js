class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed = 0;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    bedroom(){
        background(bedroomImg,550,500);
    }
    garden(){
        background(gardenImg,550,500);
    }
    washroom(){
        background(washroomImg,550,500);
    }

    display(){
        var x = 80, y = 100;
        background(46,139,87);
        imageMode(CENTER);
        //image(this.image,720,220,70,70);
        fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM",600,30);
  }
  else if(lastFed == 0){
    text("Last Fed: 12 AM",600,30);
  }
  else{
    text("Last Fed: " + lastFed + "AM",600,30);
  }

        if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10==0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}