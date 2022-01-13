function startGame() {
  myGameArea.start();
  animatedObject.loadImages();
  myGameArea.draw(redSquare);
  bushObject.loadImages();
}
function updateGameArea() {
  myGameArea.wallpaper(wallpaper);
  redSquare.x += redSquare.speedX;
  redSquare.y += redSquare.speedY;
  myGameArea.clear();
  animatedObject.update();
  myGameArea.draw(redSquare);
  myGameArea.drawGameObject(animatedObject);
  myGameArea.drawGameObject(bushObject);
  animatedObject.update();
}
var myGameArea = {

  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1900;
    this.canvas.height = 948;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 10);
  },

  draw: function (component) {
    this.context.fillStyle = component.color;
    this.context.fillRect(component.x, component.y, component.width, component.height);
  },
  wallpaper: function (component) {
    this.context.fillStyle = component.color;
    this.context.fillRect(component.x, component.y, component.width, component.height);
  },
  drawGameObject: function (gameObject) {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    )
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}



var redSquare = {
  width: 50,
  height: 50,
  x: 10,
  y: 120,
  color: "red",
  speedX: 0,
  speedY: 0
}
var wallpaper = {
  width: 1200,
  height: 4000,
  x: 0,
  y: 0,
  color: "#f1f1f1"
}
var animatedObject = {
  speedX: 0,
  speedY: 0,
  width: 60,
  height: 60,
  x: 10,
  y: 120,
  imageList: [], //Vettore che conterrà tutte le immagini caricate
  contaFrame: 0, //Tiene conto di quanti frame sono passati
  actualFrame: 0, //Specifica quale frame disegnare
  tryX: 0,
  tryY: 0,




  update: function () {
    this.tryY = this.y + this.speedY;
    this.tryX = this.x + this.speedX;

    //Prima di spostarmi realmente verifico che non ci siano collisioni
    this.crashWith(bushObject);
    this.contaFrame++;
    if (this.contaFrame == 10) {
      this.contaFrame = 0;
      this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
      //console.log(this.actualFrame);
      this.image = this.imageList[this.actualFrame];
    }
  },
  crashWith: function(otherobj) {
    var myleft = this.tryX;
    var myright = this.tryX + this.width;
    var mytop = this.tryY;
    var mybottom = this.tryY + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;

    //NON HO COLLISIONI SE: Un oggetto è sopra oppure sotto oppure a destra oppure a sinistra dell’altro
    if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      this.x = this.tryX; //Se non ho collisioni sposto realmente l’oggetto
      this.y = this.tryY;
    }
    else //HO COLLISIONI MA PER ORA NON FACCIO NIENTE
    {
    }
  },



  loadImages: function () {
    
    for (imgPath of running) {
      var img = new Image(this.width, this.height);
      img.src = imgPath;
      console.log(img);
      this.imageList.push(img);
      //console.log(img);
    }
    this.image = this.imageList[this.actualFrame];
  }
};
var bushObject = {
  width: 100,
  height: 50,
  x: 100,
  y: 270 - 50,

  loadImages: function() {
    this.image = new Image(this.width, this.height);
    this.image.src = "/png/Bush-1.png";
  
  }
};




let v = 2


document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    animatedObject.speedX = -v;
    
  }
  if (event.key == "d") {
    animatedObject.speedX = v;
  }
  if (event.key == "w") {
    animatedObject.speedY = -v;
  }
  if (event.key == "s") {
    animatedObject.speedY = v;
  }
})
document.addEventListener("keyup", (event) => {
  if (event.key == "a") {
    animatedObject.speedX = 0;

  }
  if (event.key == "d") {
    animatedObject.speedX = 0;
  }
  if (event.key == "w") {
    animatedObject.speedY = 0;
  }
  if (event.key == "s") {
    animatedObject.speedY = 0;
  }
})