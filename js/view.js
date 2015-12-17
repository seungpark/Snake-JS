(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, snake) {

    this.$el = $el;
    this.board = new SnakeGame.Board ($el);
    $(window).on("keydown", this.handleKeys.bind(this));
    window.setInterval(this.step.bind(this), 150);

  };

  View.KEYS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S"
  };

  View.prototype.handleKeys = function (event) {
    var key = View.KEYS[event.keyCode];
    if (key) {
      var diff;
      if (key === "W") {
        diff = new SnakeGame.Coord([0, 1]);
      } else if (key === "E") {
        diff = new SnakeGame.Coord([0, -1]);
      } else if (key === "N") {
        diff = new SnakeGame.Coord([1, 0]);
      } else if (key === "S") {
        diff = new SnakeGame.Coord([-1, 0]);
      }
      this.board.snake.storeTurns(key);
    }
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
    this.checkApple(newsegments[0]);
    this.render(oldsegments, newsegments);
  };

  //after step, set new direction on snake

  View.prototype.render = function (oldsegments, newsegments) {
    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake");
    this.renderApple();
    //if snake didnt eat anything
    var removex = _.last(oldsegments).x;
    var removey = _.last(oldsegments).y;
    $("#" + removex).children("." + removey).removeClass("snake");

    // if (this.board.snake.remove) {
    //   var remvx = this.board.snake.remove.x;
    //   var remvy = this.board.snake.remove.y;
    // }
  };

  View.prototype.checkApple = function (coord) {
    if (coord.equals(this.board.apple.coord)) {
      this.board.generateApple();
      $(".apple").removeClass("apple");
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
