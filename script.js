function startGame() {
    myGameArea.start();
        myGameArea.draw(redSquare);
      }
      function updateGameArea(){
        myGameArea.wallpaper(wallpaper)
        redSquare.x+=redSquare.speedx
        redSquare.y+=redSquare.speedy


        myGameArea.draw(redSquare)
      }

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height =500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10); //ogni 20 ms chiamo il metodo updateGameArea

    },
    draw: function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
      },
      wallpaper: function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
      }

    }
    var redSquare = {
        width: 20,
        height: 20,
        x: 10,
        y: 120,
        color: "red",
        speedx : 0,
        speedy : 0
      }
      var wallpaper = {
        width: 1200,
        height: 4000,
        x: 0,
        y: 0,
        color: "white"
      }
      let v=1
      function funz1(){
        redSquare.speedy -= v;
      }
      function funz2(){
        redSquare.speedy += v;
      }
      function funz3(){
        redSquare.speedx -= v;
      }
      function funz4(){
        redSquare.speedx += v;
      }