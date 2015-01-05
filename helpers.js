var helpers = {};

var Zones = function( gameData, point ) {
  var dft = point ? point[0] : gameData.activeHero.distanceFromTop,
      dfl = point ? point[1] : gameData.activeHero.distanceFromLeft,
      board = gameData.board;

    this.zone_tiles = [];
    this.zones = [];
    this.point = point;
    this.enemyCount = 0;
    this.allyCount = 0;

    this.center = [ dft, dfl ];

    this.zone_tiles[0] = [];
//    console.log(point, dft, dfl-1,helpers.validCoordinates( board, dft, dfl-1 ) );
    if ( helpers.validCoordinates( board, dft, dfl-1 ) ) {
      this.zone_tiles[0].push( board.tiles[dft][dfl-1] );
    }

    if ( helpers.validCoordinates( board, dft+1, dfl ) ) {
      this.zone_tiles[0].push( board.tiles[dft+1][dfl] );
    }

    if ( helpers.validCoordinates( board, dft, dfl+1 ) ) {
      this.zone_tiles[0].push( board.tiles[dft][dfl+1] );
    }

    if ( helpers.validCoordinates( board, dft-1, dfl ) ) {
      this.zone_tiles[0].push( board.tiles[dft-1][dfl] );
    }

    this.zone_tiles[1] = [];
    if ( helpers.validCoordinates( board, dft, dfl-2 ) ) {
      this.zone_tiles[1].push( board.tiles[dft][dfl-2] );
    }

    if ( helpers.validCoordinates( board, dft+1, dfl-1 ) ) {
      this.zone_tiles[1].push( board.tiles[dft+1][dfl-1] );
    }

    if ( helpers.validCoordinates( board, dft+2, dfl ) ) {
      this.zone_tiles[1].push( board.tiles[dft+2][dfl] );
    }

    if ( helpers.validCoordinates( board, dft+1, dfl+1 ) ) {
      this.zone_tiles[1].push( board.tiles[dft+1][dfl+1] );
    }

    if ( helpers.validCoordinates( board, dft, dfl+2 ) ) {
      this.zone_tiles[1].push( board.tiles[dft][dfl+2] );
    }

    if ( helpers.validCoordinates( board, dft-1, dfl+1 ) ) {
      this.zone_tiles[1].push( board.tiles[dft-1][dfl+1] );
    }

    if ( helpers.validCoordinates( board, dft-2, dfl ) ) {
      this.zone_tiles[1].push( board.tiles[dft-2][dfl] );
    }

    if ( helpers.validCoordinates( board, dft-1, dfl-1 ) ) {
      this.zone_tiles[1].push( board.tiles[dft-1][dfl-1] );
    }

    this.zone_tiles[2] = [];
    if ( helpers.validCoordinates( board, dft, dfl-3 ) ) {
      this.zone_tiles[2].push( board.tiles[dft][dfl-3] );
    }

    if ( helpers.validCoordinates( board, dft+1, dfl-2 ) ) {
      this.zone_tiles[2].push( board.tiles[dft+1][dfl-2] );
    }

    if ( helpers.validCoordinates( board, dft+2, dfl-1 ) )  {
      this.zone_tiles[2].push( board.tiles[dft+2][dfl-1] );
    }

    if ( helpers.validCoordinates( board, dft+3, dfl ) )  {
      this.zone_tiles[2].push( board.tiles[dft+3][dfl] );
    }

    if ( helpers.validCoordinates( board, dft+2, dfl+1 ) )  {
      this.zone_tiles[2].push( board.tiles[dft+2][dfl+1] );
    }

    if ( helpers.validCoordinates( board, dft+1, dfl+2 ) )  {
      this.zone_tiles[2].push( board.tiles[dft+1][dfl+2] );
    }

    if ( helpers.validCoordinates( board, dft, dfl+3 ) )  {
      this.zone_tiles[2].push( board.tiles[dft][dfl+3] );
    }

    if ( helpers.validCoordinates( board, dft-1, dfl+2 ) )  {
      this.zone_tiles[2].push( board.tiles[dft-1][dfl+2] );
    }

    if ( helpers.validCoordinates( board, dft-2, dfl+1 ) )  {
      this.zone_tiles[2].push( board.tiles[dft-2][dfl+1] );
    }

    if ( helpers.validCoordinates( board, dft-3, dfl ) )  {
      this.zone_tiles[2].push( board.tiles[dft-3][dfl] );
    }

    if ( helpers.validCoordinates( board, dft-2, dfl-1 ) )  {
      this.zone_tiles[2].push( board.tiles[dft-2][dfl-1] );
    }

    if ( helpers.validCoordinates( board, dft-1, dfl-2 ) ) {
      this.zone_tiles[2].push( board.tiles[dft-1][dfl-2] );
    }

    for ( var zone_idx = 0; zone_idx < this.zone_tiles.length; zone_idx++ ) {
      for ( var tile_idx = 0; tile_idx < this.zone_tiles[ zone_idx ].length; tile_idx++ ) {
        tile = this.zone_tiles[ zone_idx ][ tile_idx ];
        this.zones[ zone_idx ] = this.zones[ zone_idx ] || {};

        this.zones[ zone_idx ][ tile.type ] = this.zones[ zone_idx ][ tile.type ] || 0;
        this.zones[ zone_idx ][ tile.type ]++;

        if ( tile.type == "Hero" ) {
          if ( tile.subType == gameData.activeHero.subType ) {
            this.zones[ zone_idx ][ "Ally" ] = this.zones[ zone_idx ][ "Ally" ] || 0;
            this.zones[ zone_idx ][ "Ally" ]++;
            this.allyCount;
          } else {
            this.zones[ zone_idx ][ "Enemy" ] = this.zones[ zone_idx ][ "Enemy" ] || 0;
            this.zones[ zone_idx ][ "Enemy" ]++;
            this.enemyCount++;
            if ( tile.health == 100 ) {
              this.zones[ zone_idx ][ "UndamagedEnemy" ] = this.zones[ zone_idx ][ "UndamagedEnemy" ] || 0;
              this.zones[ zone_idx ][ "UndamagedEnemy" ]++;
            } else if ( tile.health >= 80 ) {
              this.zones[ zone_idx ][ "NearlyUndamagedEnemy" ] = this.zones[ zone_idx ][ "NearlyUndamagedEnemy" ] || 0;
              this.zones[ zone_idx ][ "NearlyUndamagedEnemy" ]++;
            } else if ( tile.health >= 60 ) {
              this.zones[ zone_idx ][ "NearlyDamagedEnemy" ] = this.zones[ zone_idx ][ "NearlyDamagedEnemy" ] || 0;
              this.zones[ zone_idx ][ "NearlyDamagedEnemy" ]++;
            } else if ( tile.health >= 40 ) {
              this.zones[ zone_idx ][ "DamagedEnemy" ] = this.zones[ zone_idx ][ "DamagedEnemy" ] || 0;
              this.zones[ zone_idx ][ "DamagedEnemy" ]++;
            } else if ( tile.health == 30 ) {
              this.zones[ zone_idx ][ "KillableEnemy" ] = this.zones[ zone_idx ][ "KillableEnemy" ] || 0;
              this.zones[ zone_idx ][ "KillableEnemy" ]++;
            } else {
              this.zones[ zone_idx ][ "EasilyKillableEnemy" ] = this.zones[ zone_idx ][ "EasilyKillableEnemy" ] || 0;
              this.zones[ zone_idx ][ "EasilyKillableEnemy" ]++;
            }

          }
        } else if ( tile.type == "DiamondMine" ) {
          if ( ! tile.owner ) {
            this.zones[ zone_idx ][ "UnownedMine" ] = this.zones[ zone_idx ][ "UnownedMine" ] || 0;
            this.zones[ zone_idx ][ "UnownedMine" ]++;
          } else if ( tile.owner.id == gameData.activeHero.id ) {
            this.zones[ zone_idx ][ "MyMine" ] = this.zones[ zone_idx ][ "MyMine" ] || 0;
            this.zones[ zone_idx ][ "MyMine" ]++;
          } else if ( tile.owner.subType == gameData.activeHero.subType ) {
            this.zones[ zone_idx ][ "AllyMine" ] = this.zones[ zone_idx ][ "AllyMine" ] || 0;
            this.zones[ zone_idx ][ "AllyMine" ]++;
          } else if ( tile.owner.subType != gameData.activeHero.subType ) {
            this.zones[ zone_idx ][ "EnemyMine" ] = this.zones[ zone_idx ][ "EnemyMine" ] || 0;
            this.zones[ zone_idx ][ "EnemyMine" ]++;
          }

        }
      }
    }
  };


// Returns false if the given coordinates are out of range
helpers.validCoordinates = function(board, distanceFromTop, distanceFromLeft) {
  return (!(distanceFromTop < 0 || distanceFromLeft < 0 ||
      distanceFromTop > board.lengthOfSide - 1 || distanceFromLeft > board.lengthOfSide - 1));
};

helpers.getDirectionTo = function ( gameData, target ) {
  var myHero = gameData.activeHero,
      leftiness = myHero.distanceFromLeft - target.distanceFromLeft,
      topiness = myHero.distanceFromTop - target.distanceFromTop,

      north = getTileNearby( gameData.board, myHero.distanceFromTop, myHero.distanceFromLeft, "North" ),
      south = getTileNearby( gameData.board, myHero.distanceFromTop, myHero.distanceFromLeft, "South" ),
      east = getTileNearby( gameData.board, myHero.distanceFromTop, myHero.distanceFromLeft, "East" ),
      west = getTileNearby( gameData.board, myHero.distanceFromTop, myHero.distanceFromLeft, "West" )

      smartMove = helpers.smartMove;

  if ( leftiness >= 0 && topiness >= 0 ) {
    if ( leftiness - topiness > 0 ) {
      if ( smartMove( gameData, "North" ) ) {
        return "North";
      }
    } else {
      if ( smartMove( gameData, "West" ) ) {
        return "West";
      }
    }
  }

  if (leftiness <= 0 && topiness >= 0 ) {
    if ( -leftiness - topiness > 0 ) {
      if ( smartMove( gameData, "North" ) ) {
        return "North";
      }
    } else {
      if ( smartMove( gameData, "East" ) ) {
        return "East";
      }
    }
  }

  if (leftiness >= 0 && topiness <= 0 ) {
    if ( leftiness + topiness > 0 ) {
      if ( smartMove( gameData, "South" ) ) {
        return "South";
      }
    } else {
      if ( smartMove( gameData, "West" ) ) {
        return "West";
      }
    }

  }

  if (leftiness <= 0 && topiness <= 0 ) {
    if ( -leftiness + topiness > 0 ) {
      if ( smartMove( gameData, "South" ) ) {
        return "South";
      }
    } else {
      if ( smartMove( gameData, "East" ) ) {
        return "East";
      }
    }
  }

};

helpers.smartMove = function ( gameData, direction ) {
  var board = gameData.board,
      dft = gameData.activeHero.distanceFromTop,
      dfl = gameData.activeHero.distanceFromLeft,
      tile = helpers.getTileNearby(board, dft, dfl, direction),
      rated_tile = helpers.rateTile( gameData, direction );

  if ( gameData.activeHero.health <= 20 ) {
    if ( tile.type == "DiamondMine" ) {
      return false;
    }
  }

  if ( rated_tile.overall > 0 ) {
    return false;
  }

  return true;
};

  helpers.healthLevel = function ( gameData ) {
    var hero = gameData.activeHero;

    return Math.round( hero.health / 20 );
  };

  helpers.rateTile = function ( gameData, point ) {
    var good_score=0, bad_score=0, overall_score=0, damage=0,
        hero = gameData.activeHero,
        health_level = helpers.healthLevel( gameData ),
        zones = new Zones( gameData, point);//[point.distanceFromTop, point.distanceFromLeft] );

    // right next to tile
    bad_score += ( ( zones.zones[0].Enemy || 0 ) * ( 5 - health_level ) );
    bad_score += ( ( zones.zones[1].Enemy/2 || 0 ) * ( 5 - health_level ) );
    bad_score += ( ( zones.zones[2].Enemy/3 || 0 ) * ( 5 - health_level ) );

    good_score += ( ( zones.zones[0].EasilyKillableEnemy || 0 ) * health_level );
    good_score += ( ( zones.zones[0].KillableEnemy || 0 ) * health_level );
    good_score += ( ( zones.zones[0].Bones || 0 ) );
    good_score += ( ( zones.zones[0].Ally - 1 || 0 ) );
    good_score += ( ( zones.zones[0].DiamondMine || 0 ) * 2 );
    good_score += ( ( zones.zones[0].HealthWell || 0 ) * ( 7 - health_level ) );
    good_score += ( ( zones.zones[1].HealthWell/2 || 0 ) * ( 6 - health_level ) );
    good_score += ( ( zones.zones[2].HealthWell/3 || 0 ) * ( 5 - health_level ) );

    damage += ( ( ( zones.zones[0].Enemy || 0 ) - ( zones.zones[0].EasilyKillableEnemy || 0 ) ) * 30 );
    damage += ( ( zones.zones[1].Enemy || 0 ) * 20 );

    return {
      good: good_score,
      bad: bad_score,
      damage: damage,
      overall: good_score - bad_score,
      zones: zones
    }
  };
// Returns the tile [direction] (North, South, East, or West) of the given X/Y coordinate
helpers.getTileNearby = function(board, distanceFromTop, distanceFromLeft, direction) {

  // These are the X/Y coordinates
  var fromTopNew = distanceFromTop;
  var fromLeftNew = distanceFromLeft;

  // This associates the cardinal directions with an X or Y coordinate
  if (direction === 'North') {
    fromTopNew -= 1;
  } else if (direction === 'East') {
    fromLeftNew += 1;
  } else if (direction === 'South') {
    fromTopNew += 1;
  } else if (direction === 'West') {
    fromLeftNew -= 1;
  } else {
    return false;
  }

  // If the coordinates of the tile nearby are valid, return the tile object at those coordinates
  if (helpers.validCoordinates(board, fromTopNew, fromLeftNew)) {
    return board.tiles[fromTopNew][fromLeftNew];
  } else {
    return false;
  }
};

helpers.tileWithMineAndWellAdjacent = function ( gameData ) {
  var tile, nearestMine, nearestWell, campTile,
      coords = [0,0],
      board = gameData.board,
      hero = gameData.activeHero;

  for ( var x = 0; x < board.lengthOfSide; x++ ) {
    for ( var y = 0; y < board.lengthOfSide; y++ ) {
      tile = board.tiles[x][y];
      nearestMine = helpers.findNearestObjectDirectionAndDistance(board, tile, function( checkingTile ) {
        return checkingTile.type == "DiamondMine";
      });
      nearestWell = helpers.findNearestObjectDirectionAndDistance(board, tile, function( checkingTile ) {
        return checkingTile.type == "HealthWell";
      });

      if ( nearestMine && nearestWell && nearestMine.distance == 1 && nearestWell.distance == 1 ) {
        campTile = helpers.findNearestObjectDirectionAndDistance(board, hero, function( checkingTile ) {
          return checkingTile.distanceFromTop == tile.distanceFromTop && checkingTile.distanceFromLeft == tile.distanceFromTop;
        });
        return campTile;
      }
    }
  }
};

// Returns an object with certain properties of the nearest object we are looking for
helpers.findNearestObjectDirectionAndDistance = function(board, fromTile, tileCallback) {
  // Storage queue to keep track of places the fromTile has been
  var queue = [];

  //Keeps track of places the fromTile has been for constant time lookup later
  var visited = {};

  // Variable assignments for fromTile's coordinates
  var dft = fromTile.distanceFromTop;
  var dfl = fromTile.distanceFromLeft;

  // Stores the coordinates, the direction fromTile is coming from, and it's location
  var visitInfo = [dft, dfl, 'None', 'START'];

  //Just a unique way of storing each location we've visited
  visited[dft + '|' + dfl] = true;

  // Push the starting tile on to the queue
  queue.push(visitInfo);

  // While the queue has a length
  while (queue.length > 0) {

    // Shift off first item in queue
    var coords = queue.shift();

    // Reset the coordinates to the shifted object's coordinates
    var dft = coords[0];
    var dfl = coords[1];

    // Loop through cardinal directions
    var directions = ['North', 'East', 'South', 'West'];
    for (var i = 0; i < directions.length; i++) {

      // For each of the cardinal directions get the next tile...
      var direction = directions[i];

      // ...Use the getTileNearby helper method to do this
      var nextTile = helpers.getTileNearby(board, dft, dfl, direction);

      // If nextTile is a valid location to move...
      if (nextTile) {

        // Assign a key variable the nextTile's coordinates to put into our visited object later
        var key = nextTile.distanceFromTop + '|' + nextTile.distanceFromLeft;

        var isGoalTile = false;
        try {
          isGoalTile = tileCallback(nextTile);
        } catch(err) {
          isGoalTile = false;
        }

        // If we have visited this tile before
        if (visited.hasOwnProperty(key)) {

          //Do nothing--this tile has already been visited

        //Is this tile the one we want?
        } else if (isGoalTile) {

          // This variable will eventually hold the first direction we went on this path
          var correctDirection = direction;

          // This is the distance away from the final destination that will be incremented in a bit
          var distance = 1;

          // These are the coordinates of our target tileType
          var finalCoords = [nextTile.distanceFromTop, nextTile.distanceFromLeft];

          // Loop back through path until we get to the start
          while (coords[3] !== 'START') {

            // Haven't found the start yet, so go to previous location
            correctDirection = coords[2];

            // We also need to increment the distance
            distance++;

            // And update the coords of our current path
            coords = coords[3];
          }

          //Return object with the following pertinent info
          return {
            direction: correctDirection,
            distance: distance,
            coords: finalCoords
          };

          // If the tile is unoccupied, then we need to push it into our queue
        } else if (nextTile.type === 'Unoccupied') {

          queue.push([nextTile.distanceFromTop, nextTile.distanceFromLeft, direction, coords]);

          // Give the visited object another key with the value we stored earlier
          visited[key] = true;
        }
      }
    }
  }

  // If we are blocked and there is no way to get where we want to go, return false
  return false;
};

// Returns the direction of the nearest non-team diamond mine or false, if there are no diamond mines
helpers.findNearestNonTeamDiamondMine = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(mineTile) {
    if (mineTile.type === 'DiamondMine') {
      if (mineTile.owner) {
        return mineTile.owner.team !== hero.team;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, board);

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

helpers.findNearestDiamondMine = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(mineTile) {
    if (mineTile.type === 'DiamondMine') {
      if (mineTile.owner) {
        return mineTile.owner.id !== hero.id;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, board);

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

// Returns the nearest unowned diamond mine or false, if there are no diamond mines
helpers.findNearestUnownedDiamondMine = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(mineTile) {
    if (mineTile.type === 'DiamondMine') {
      if (mineTile.owner) {
        return mineTile.owner.id !== hero.id;
      } else {
        return true;
      }
    } else {
      return false;
    }
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject.direction;
};

// Returns the nearest health well or false, if there are no health wells
helpers.findNearestHealthWell = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(healthWellTile) {
    return healthWellTile.type === 'HealthWell';
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject.direction;
};

// Returns the nearest health well or false, if there are no health wells
helpers.findNearestBones = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(healthWellTile) {
    return healthWellTile.type === 'Bones';
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

// Returns the direction of the nearest enemy with lower health
// (or returns false if there are no accessible enemies that fit this description)
helpers.findNearestWeakerEnemy = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health < hero.health;
  });

  //Return the direction that needs to be taken to achieve the goal
  //If no weaker enemy exists, will simply return undefined, which will
  //be interpreted as "Stay" by the game object
  return pathInfoObject.direction;
};
// JOSH: give more data about enemey
helpers.findNearlyDeadEnemy = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health <= 30;
  });

  //Return the direction that needs to be taken to achieve the goal
  //If no weaker enemy exists, will simply return undefined, which will
  //be interpreted as "Stay" by the game object
  return pathInfoObject;
};

// Returns the direction of the nearest enemy
// (or returns false if there are no accessible enemies)
helpers.findNearestEnemy = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== hero.team
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject.direction;
};

// Returns the direction of the enemy with lowest health, below a threshold
// (or returns false if there are no enemies that fit this description)
helpers.findWeakestEnemy = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  // Find all enemy tiles
  var enemies = [];
  for (var i=0; i<board.lengthOfSide; i++) {
    for (var j=0; j<board.lengthOfSide; j++) {
      var tile = board.tiles[i][j];
      if (tile.type === 'Hero' && tile.team !== hero.team)
        enemies.push(tile);
    }
  }
  var weakest = enemies.reduce(function (obj1, obj2) {
    return obj1.health < obj2.health ? obj1 : obj2;
  });

  // Returns the direction of the enemy with lowest health, and lower health than the hero
  // (or returns false if there are no accessible enemies that fits this description
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== hero.team && enemyTile.health === weakest.health;

  });

  return pathInfoObject.direction;
}


// Returns the direction of the nearest friendly champion
// (or returns false if there are no accessible friendly champions)
helpers.findNearestTeamMember = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === hero.team;
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject.direction;
};

helpers.findNearestNearlyDeadAlly = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === hero.team && heroTile.health <= 30;
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

helpers.findNearestInjuredAlly = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === hero.team && heroTile.health < 100;
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

helpers.findNearestNearestAlly = function(gameData) {
  var hero = gameData.activeHero;
  var board = gameData.board;

  //Get the path info object
  var pathInfoObject = helpers.findNearestObjectDirectionAndDistance(board, hero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === hero.team;
  });

  //Return the direction that needs to be taken to achieve the goal
  return pathInfoObject;
};

helpers.reverse = function (direction) {
    if (direction === 'North') return 'South';
    if (direction === 'East') return 'West';
    if (direction === 'South') return 'North';
    if (direction === 'West') return 'East';
};

module.exports = helpers;
