/*

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")

  The "move" function should accept two arguments that the website will be passing in:
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)


// // The "Northerner"
// // This hero will walk North.  Always.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   return 'North';
// };

// // The "Blind Man"
// // This hero will walk in a random direction each turn.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   var choices = ['North', 'South', 'East', 'West'];
//   return choices[Math.floor(Math.random()*4)];
// };

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 50) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestWeakerEnemy(gameData);
//   }
// };

// // The "Safe Diamond Miner"
var move = function(gameData, helpers) {
  var myHero = gameData.activeHero,
      myHealth = myHero.health;

  //myHero.health = 100;
  // a tile with mine and well adjacent
  var campTile = helpers.tileWithMineAndWellAdjacent( gameData );

  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      return true;
    }
  });

  // get stats for nearest ally
  var allyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === myHero.team;
  });

  // get stats for nearest enemy
  var enemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team !== myHero.team;
  });

  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;

  var nearlyDeadEnemy = helpers.findNearlyDeadEnemy( gameData );
  var distanceToNearlyDeadEnemy = nearlyDeadEnemy.distance || 10;

  var nearestEnemy = helpers.findNearestEnemy ( gameData );
  var distanceToNearestEnemy = nearestEnemy ? nearestEnemy.distance : 10;

  var nearlyDeadAlly = helpers.findNearestNearlyDeadAlly( gameData );
  var distanceToNearlyDeadAlly = nearlyDeadAlly.distance || 10;

  var nearestAlly = helpers.findNearestNearlyDeadAlly( gameData );
  var distanceToNearestAlly = nearestAlly.distance || 10;

  var nearestNonTeamMine = helpers.findNearestNonTeamDiamondMine(gameData);
  var distanceToNearestNonTeamMine = nearestNonTeamMine.distance || 10;

  var nearestNotMine = helpers.findNearestDiamondMine(gameData);
  var distanceToNearestNotMine = nearestNonTeamMine.distance || 10;

  var nearestBones = helpers.findNearestBones(gameData);
  var distanceToNearestBones = nearestBones.distance || 10;


  if ( campTile && campTile.distance <= 2 ) {
    if ( myHealth > 60 ) {
      if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
      if ( distanceToNearlyDeadEnemy === 2 && nearlyDeadEnemy.health <= 20 ) { return nearlyDeadEnemy.direction; }
      if ( enemyStats.distance == 1 ) { return enemyStats.direction; }
      if ( distanceToNearestBones == 1 ) { return nearestBones.direction; }
      if ( enemyStats.distance == 2 && enemyStats.health > myHero.health) { return helpers.reverse( enemyStats.direction ); }

      if ( campTile.distance > 0 ) { return campTile.direction; }
      if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
      if ( distanceToNearestNotMine == 1 ) { return nearestNotMine.direction; }
      if ( distanceToNearestEnemy == 1 ) { return nearestEnemy.direction; }
      if ( distanceToNearestBones == 1 ) { return nearestBones.direction; }
      if ( distanceToNearestAlly == 1 && nearestAlly.health < 100 ) { return nearestAlly.direction; }
      if ( distanceToHealthWell == 1 ) { return directionToHealthWell; }
    }
  }

  if ( myHealth <= 30 ) {
    if ( distanceToHealthWell === 1 ) { return directionToHealthWell; }
    if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
    if ( distanceToNearlyDeadEnemy === 2 && nearlyDeadEnemy.health <= 20 ) { return nearlyDeadEnemy.direction; }
    if ( enemyStats.distance == 2 ) { return helpers.reverse( enemyStats.direction ); }
    return directionToHealthWell;

  } else if ( myHealth <= 60 ) {
    if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
    if ( distanceToNearlyDeadEnemy === 2 && nearlyDeadEnemy.health <= 20 ) { return nearlyDeadEnemy.direction; }
    if ( distanceToHealthWell === 1 ) { return directionToHealthWell; }
    if ( enemyStats.distance == 1 ) { return enemyStats.direction; }
    if ( distanceToNearestBones == 1 ) { return nearestBones.direction; }
    if ( enemyStats.distance == 2 ) { return helpers.reverse( enemyStats.direction ); }
    return directionToHealthWell;

  } else if ( myHealth < 100 ) {
    if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
    if ( distanceToNearlyDeadEnemy === 2 && nearlyDeadEnemy.health <= 20 ) { return nearlyDeadEnemy.direction; }
    if ( enemyStats.distance == 1 ) { return enemyStats.direction; }
    if ( distanceToHealthWell === 1 ) { return directionToHealthWell; }
    if ( distanceToNearestBones == 1 ) { return nearestBones.direction; }
    if ( enemyStats.distance == 2 && enemyStats.health > myHero.health) { return helpers.reverse( enemyStats.direction ); }
    if ( nearestNonTeamMine ) { return nearestNonTeamMine.direction; }
    if ( nearestNotMine ) { return nearestNotMine.direction; }
    return directionToHealthWell;

  } else if ( myHealth === 100 ) {
    if ( distanceToNearlyDeadEnemy === 1 ) { return nearlyDeadEnemy.direction; }
    if ( distanceToNearlyDeadEnemy === 2 && nearlyDeadEnemy.health <= 20 ) { return nearlyDeadEnemy.direction; }
    if ( enemyStats.distance == 1 ) { return enemyStats.direction; }
    if ( distanceToNearestBones == 1 ) { return helpers.findNearestBones(gameData); }
    if ( nearestNonTeamMine ) { return nearestNonTeamMine.direction; }
    if ( nearestBones ) { return nearestBones.direction; }
    if ( nearestNotMine ) { return nearestNotMine.direction; }

    return directionToHealthWell;

  }
  return directionToHealthWell;

};

// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };

// // The "Coward"
// // This hero will try really hard not to die.
// var move = function(gameData, helpers) {
//   return helpers.findNearestHealthWell(gameData);
// }


// Export the move function here
module.exports = move;
