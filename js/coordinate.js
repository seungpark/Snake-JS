(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var Coord = SnakeGame.Coord = function (pos, dir) {
    this.x = pos[0];
    this.y = pos[1];
    this.pos = pos;
  };


  Coord.prototype.plus = function (delta) {
    //delta is change of pos (-1, 0)
    this.x += delta.x;
    this.y += delta.y;
    return this;
  };

  // Coord.prototype.isOpposite = function (diff, snakesegments) {
  //   debugger
  //   this = head of snake Coord class
  //   diff = coord [0,+-1]
  //   // if (this.dir === "N" && newDir === "S"){
  //   //   return true;
  //   // } else if (this.dir === "S" && newDir === "N") {
  //   //   return true;
  //   // } else if (this.dir === "W" && newDir === "E") {
  //   //   return true;
  //   // } else if (this.dir === "E" && newDir === "W") {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // };

  Coord.prototype.equals = function (newCoord) {
    return (_.isEqual(newCoord.pos, this.pos));
  };



  // [snakegame.coord.x, snakegame.coord.y] === [x,y]



})();
