(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {

    this.$el = $el;
    this.gameover = true;
    this.score = 0;
    this.bestScore = 0;
    this.board = this.setBoard();
    $(window).on("keydown", this.handleKeys.bind(this));

  };

  View.KEYS = {
    32: "startgame",
    37: "W",
    38: "N",
    39: "E",
    40: "S"
  };

  View.prototype.setBoard = function () {
    var height = ($(window).height() * 0.9);
    var width = ($(window).width() * 0.95);
    this.$el.css("width", width);
    this.$el.css("height", height);

    this.boardHeight = (height / 100);
    this.boardWidth = (width / 100);
    return new SnakeGame.Board(
      this.$el,
      this.boardHeight,
      this.boardWidth,
      height,
      width
    );
  };

  View.prototype.handleKeys = function (event) {
    var key = View.KEYS[event.keyCode];
    if (this.gameover && key === "startgame") {
      $(".start").addClass("hidden");
      $(".end").addClass("hidden");
      this.start();
    } else if (key && key !== "startgame") {
      this.board.snake.storeTurns(key);
    }
  };

  View.prototype.start = function () {
    this.score = 0;
    this.board.resetBoard();
    this.gameover = false;
    this.interval = window.setInterval(this.step.bind(this), 180);
  };

  View.prototype.endGame = function () {
    this.gameover = true;
    window.clearInterval(this.interval);
    $(".end").removeClass("hidden");
  };


  View.prototype.step = function() {
    this.board.snake.turn();
    var oldTail = this.board.snake.segments[this.board.snake.segments.length - 1]; //array of coordinates
    this.board.snake.move();
    var newsegments = this.board.snake.segments;
    if (this.board.snake.dead) {
      this.endGame();
      return;
    } else {
      this.checkApple(newsegments[0], oldTail);
    }
    newsegments = this.board.snake.segments;
    this.render(oldTail, newsegments);
  };


  View.prototype.render = function (oldTail, newsegments) {
    $(".score").html(this.score);
    $(".best-score").html(this.bestScore);
    var removex = oldTail.x;
    var removey = oldTail.y;
    $("#" + removex).children("." + removey).removeClass("snake N S E W");

    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake " + this.board.snake.dir);
    this.renderApple();

  };

  View.prototype.checkApple = function (headCoord, growCoord) {
    if (headCoord.equals(this.board.apple.coord)) {
      this.board.generateApple();
      $(".apple").removeClass("apple");
      this.score += 100;
      this.board.snake.grow(growCoord);
      if (this.score >= this.bestScore) {
        this.bestScore = this.score;
      }
    }
  };

  View.prototype.renderApple = function () {
    var apple = this.board.apple;
    var appleX = apple.coord.x;
    var appleY = apple.coord.y;
    $("#" + appleX).children("." + appleY).addClass("apple");
  };

})();
