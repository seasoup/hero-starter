/*

If you'd like to test your hero code locally,
run this code using node (must have node installed).

Please note that you DO NOT need to do this to enter javascript
battle, it is simply an easy way to test whether your new hero
code will work in the javascript battle.

To run:

  -Install node
  -Run the following in your terminal:

    node test_your_hero_code.js

  -If you don't see any errors in your terminal, the code works!

*/

//Get the helper file and the Game logic
var helpers = require('./helpers.js');
var Game = require('./game_logic/Game.js');

//Get my hero's move function ("brain")
var heroMoveFunction = require('./hero.js');

//The move function ("brain") the practice enemy will use
var enemyMoveFunction = function(gameData, helpers, enemy) {
  //Move in a random direction
  //var choices = ['North', 'South', 'East', 'West'];
  //return choices[Math.floor(Math.random()*4)];

   if (enemy.health < 50) {
     return helpers.findNearestHealthWell(gameData);
   } else if ( helpers.findNearestWeakerEnemy(gameData) ) {
     return helpers.findNearestWeakerEnemy(gameData);
   } else if ( helpers.findNearestEnemy(gameData) ) {
     return helpers.findNearestEnemy(gameData);
   } else {
     return helpers.findNearestHealthWell(gameData);
   }

}

//Makes a new game with a 5x5 board
var game = new Game(7);

//Add a health well in the middle of the board
game.addHealthWell(2,2);

//Add diamond mines on either side of the health well
game.addDiamondMine(2,1);
game.addDiamondMine(2,3);


game.addHealthWell(6,6);
game.addDiamondMine(5,5);

//Add your hero in the top left corner of the map (team 0)
game.addHero(0, 0, 'MyHero', 0);
game.addHero(0, 4, 'Hero 2', 0);
game.addHero(0, 2, 'Hero 3', 0);

//Add an enemy heroes (team 1)
game.addHero(4, 0, 'Enemy 1', 1);
game.addHero(4, 2, 'Enemy 2', 1);
game.addHero(4, 3, 'Enemy 3', 1);

console.log('About to start the game!  Here is what the board looks like:');

//You can run game.board.inspect() in this test code at any time
//to log out the current state of the board (keep in mind that in the actual
//game, the game object will not have any functions on it)
game.board.inspect();

//Play a very short practice game
var turnsToPlay = 100;

for (var i=0; i<turnsToPlay; i++) {
  var hero = game.activeHero;
  var direction;
  console.log('-----');
  console.log('Turn ' + i + ':');
  console.log('-----');
  if (hero.name === 'MyHero') {
    game.board.inspect(function (point) {
      var rating = String(helpers.rateTile(game, point).overall);
      if ( rating.length == 1 ) {
        rating = " " + rating + " ";
      } else if ( rating.length == 2 ) {
        rating = rating + " ";
      } else if ( rating.length > 3 ) {
        rating = rating.substring(0,2);
      }

      return rating
    });
    //Ask your hero brain which way it wants to move
    direction = heroMoveFunction(game, helpers);
  } else {
    direction = enemyMoveFunction(game, helpers, hero);
  }
  console.log(hero.name + '(' + hero.getCode() + ') tried to move ' + direction);
  console.log(hero.name + '(' + hero.getCode() + ') owns ' + hero.mineCount + ' diamond mines')
  console.log(hero.name + '(' + hero.getCode() + ') has ' + hero.health + ' health')
  game.handleHeroTurn(direction);
  if (hero.name === 'MyHero') { game.board.inspect(); }
  if (hero.dead || game.ended) { turnsToPlay=i; game.board.inspect();}
}