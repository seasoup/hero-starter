

// var gtfo = function ( gameData, helpers ) {
//   var myHero = gameData.activeHero,
//       dft = myHero.distanceFromTop,
//       dfl = myHero.distanceFromLeft,
//       here = helpers.rateTile( gameData, myHero ),
//       north = helpers.getTileNearby(board, dft, dfl, "North"),
//       northTile = helpers.rateTile( gameData, north ),
//       south = helpers.getTileNearby(board, dft, dfl, "South"),
//       southTile = helpers.rateTile( gameData, south ),
//       east = helpers.getTileNearby(board, dft, dfl, "East"),
//       eastTile = helpers.rateTile( gameData, east ),
//       west = helpers.getTileNearby(board, dft, dfl, "West"),
//       westTile = helpers.rateTile( gameData, west ),
//       nearbyTiles = [];

//       northTile.direction = "North";
//       southTile.direction = "South";
//       eastTile.direction  = "East";
//       westTile.direction  = "West";

//       nearbyTiles = [ northTile, southTile, eastTile, westTile ];

//       nearbyTiles.sort( function ( a, b ) {
//         if ( a.bad_score > b.bad_score ) {
//           return -1;
//         }
//         if ( a.bad_score < b.bad_score ) {
//           return 1;
//         }
//         return 0;
//       });

//       for ( var a = 0; a < nearbyTiles.length; a++ ) {
//         if ( helpers.smartMove( nearbyTiles[a].direction ) ) {
//           return nearbyTiles[a].direction;
//         }
//       }

// };

// var seekTheGoldenSpot = function ( gameData, helpers ) {
//   var board = gameData.board,
//       xmax = board.tiles[0].length,
//       ymax = board.tiles[0].length,
//       goldenSpot = board.tiles[0][0],
//       flattened_board_tiles = [],
//       direction_to_move;

//   for ( var x=0; x < xmax; x++ ) {
//     for ( var y=0; y < ymax; y++ ) {
//       board.tiles[ x ][ y ].rating = helpers.rateTile( gameData, [ x, y ] ).overall;
//       flattened_board_tiles.push( board.tiles[ x ][ y ] );
//     }
//   }
//   flattened_board_tiles.sort( function ( a, b ) {
//     if ( a.overall < b.overall ) {
//       return -1;
//     }
//     if ( a.overall > b.overall ) {
//       return 1;
//     }
//     return 0;
//   });

//   for ( var spot=0; spot < flattened_board_tiles; spot++ ) {
//     direction_to_move = helpers.getDirectionTo( flattened_board_tiles[ spot ] );
//     if ( helpers.smartMove( gameData, direction_to_move ) ) {
//       return direction_to_move;
//     }
//   }
// };

// // The "Safe Diamond Miner"
var move = function(gameData, helpers) {
  var myHero = gameData.activeHero,
      myHealth = myHero.health;

  //var zones = new Zones( gameData );
  if ( myHealth < 100 ) {
    return helpers.findNearestHealthWell( gameData );
  } else if ( helpers.findNearestDiamondMine( gameData ) ) {
    return helpers.findNearestDiamondMine( gameData );
  } else if ( helpers.findNearestInjuredAlly( gameData ) ) {
    return helpers.findNearestInjuredAlly( gameData );
  }

};


// Export the move function here
module.exports = move;
