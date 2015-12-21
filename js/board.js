(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function (figure, boardheight, boardwidth, winheight, winwidth) {
    // this.dim = 15;
    this.height = boardheight;
    this.width = boardwidth;
    this.winSize = [winheight, winwidth];
    this.figure = figure;
    this.setBoard(figure);
    this.snake = new SnakeGame.Snake(this.height, this.width);
    this.generateApple();
  };

  Board.prototype.resetBoard = function () {
    $(".snake").removeClass("snake N S W E");
    $(".apple").removeClass("apple");
    this.snake = new SnakeGame.Snake(this.height, this.width);
    this.generateApple();
  };

  Board.prototype.setBoard = function(figure) {
    for (var i = 0; i < this.height; i++) {
      figure.append("<ul id=" + i + "></ul>");
      for (var j = 0; j < this.width; j++) {
        $("#" + i).append("<li class=" + j + "></li>");
      }
    }
    console.log(this.winSize[1]);
    console.log((this.winSize[1] / (this.width + 1)) - 1);
    console.log(this.width);
    debugger
    $("ul").css("height", (this.winSize[0] / (this.height + 1)) );
    $("li").css("height", (this.winSize[0] / (this.height + 1)) - 2);
    $("ul").css("width", this.winSize[1]);
    $("li").css("width", (this.winSize[1] / (Math.floor(this.width) + 1)) - 2);
  };

  Board.prototype.randomPair = function () {
    var x = Math.floor(Math.random() * this.height);
    var y = Math.floor(Math.random() * this.width);
    var validPos = !_.any(this.snake.segments, function (coord) {
      return (coord.x === x && coord.y === y);
    });
    if (validPos) {
      return [x, y];
    }
  };

  Board.prototype.generateApple = function () {
    var newAppleCoord;
    while (!newAppleCoord) {

      newAppleCoord = this.randomPair();
    }
    // var segments = this.snake.segments;
    var apple = new SnakeGame.Apple(new SnakeGame.Coord(newAppleCoord));
    this.apple = apple;
  };




})();
