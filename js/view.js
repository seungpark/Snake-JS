(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {

    this.$el = $el;
    this.gameover = true;
    this.score = 0;
    this.bestScore = 0;
    this.board = new SnakeGame.Board($el);
    $(window).on("keydown", this.handleKeys.bind(this));


  };

  View.KEYS = {
    32: "startgame",
    37: "W",
    38: "N",
    39: "E",
    40: "S"
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
    this.interval = window.setInterval(this.step.bind(this), 100);
  };

  View.prototype.endGame = function () {
    this.gameover = true;
    window.clearInterval(this.interval);
    $(".end").removeClass("hidden");
    // document.getElementById("start-screen").showModal();
  };


  View.prototype.step = function() {
    // store old segments of snake
    // and then move
    // and then store new segments of snake
    // and then render passing old and new
    this.board.snake.turn();

    var oldsegments = _.clone(this.board.snake.segments); //array of coordinates
    this.board.snake.move();
    var newsegments = _.clone(this.board.snake.segments);
    if (this.board.snake.dead) {
      this.endGame();
      return;
    } else {
      this.checkApple(newsegments[0], _.last(oldsegments));
    }
    newsegments = _.clone(this.board.snake.segments);
    this.render(oldsegments, newsegments);
  };

  //after step, set new direction on snake

  View.prototype.render = function (oldsegments, newsegments) {
    $(".score").html(this.score);
    $(".best-score").html(this.bestScore);
    debugger
    var removex = _.last(oldsegments).x;
    var removey = _.last(oldsegments).y;
    $("#" + removex).children("." + removey).removeClass("snake");
    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake");
    this.renderApple();
    //if snake didnt eat anything

    // if (this.board.snake.remove) {
    //   var remvx = this.board.snake.remove.x;
    //   var remvy = this.board.snake.remove.y;
    // }
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
      // this.board.snake.grow();
    }
  };

  View.prototype.renderApple = function () {
    var apple = this.board.apple;
    var appleX = apple.coord.x;
    var appleY = apple.coord.y;
    $("#" + appleX).children("." + appleY).addClass("apple");
  };



})();
