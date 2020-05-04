import config from "./config.js"

import Player from './player.js'
import Weapon from "./weapon.js"
import Consumable from "./consumable.js"
import Obstacle from "./obstacle.js"

/**
 * Responsible for handling player actions on board - movement and attack
 * @constructor 
 * @param {Object} board - Game board instance
 * @param {Object} player - Game player instancce
 */
export default function ActionHandler(board, player) {
	this.board = board
	this.hasMoved = false
	this.moveDirection = null
	this.player = player
	this.numMoves = 0
	this.isInBattlePhase = false
	this.actionableTiles = []
	this.handleMoves()
}

/**
 * Reset action handler for a new turn
 * Works by forgetting previous history 
 */
ActionHandler.prototype.reset = function (player) {
	this.hasMoved = false
	this.moveDirection = null
	this.player = player
	this.numMoves = 0
	this.actionableTiles = []
	this.isInBattlePhase = false
	this.handleMoves()
}

ActionHandler.prototype.handleMoves = function() {
	this.isInBattlePhase = this.shouldActivateBattlePhase()
	if(this.isInBattlePhase) {
		this.handleBattle()
	} else {
		this.getAvailableMoves()
	}
}

ActionHandler.prototype.handleBattle = function() {
	let board = this.board.board
	let {x, y} = this.player.pos
	let attackableTiles = []
	if (board[x - 1] && board[x - 1][y] && board[x - 1][y].contains(Player)) {
		attackableTiles.push({x: x - 1, y})
	}
	if (board[x + 1] && board[x + 1][y] && board[x + 1][y].contains(Player)) {
		attackableTiles.push({x: x + 1, y})
	}
	if (board[x][y - 1] && board[x][y - 1].contains(Player)) {
		attackableTiles.push({x, y: y - 1})
	}
	if (board[x][y + 1] && board[x][y + 1].contains(Player)) {
		attackableTiles.push({x, y: y + 1})
	}
	this.board.highlightTiles(attackableTiles)
	this.actionableTiles = attackableTiles
}

/**
 * Returns if battle phase should be active
 * True if another player is in vicinity, false otherwise
 */
ActionHandler.prototype.shouldActivateBattlePhase = function() {
	let board = this.board.board
	let {x, y} = this.player.pos
	if (
		(board[x - 1] && board[x - 1][y] && board[x - 1][y].contains(Player))
		 || (board[x + 1] && board[x + 1][y] && board[x + 1][y].contains(Player))
		 || (board[x][y - 1] && board[x][y - 1].contains(Player))
		 || (board[x][y + 1] && board[x][y + 1].contains(Player))
	) {
		return true
	} else {
		return false
	}
}

/**
 * Highlight available moves to player on board
 */
ActionHandler.prototype.getAvailableMoves = function () {
	let movableTiles = []
	if(this.hasMoved) {
		movableTiles = movableTiles.concat(this.getAvailableMovesInDirection(this.moveDirection))
	} else {
		movableTiles = movableTiles.concat(this.getAvailableMovesInDirection("UP"))
		movableTiles = movableTiles.concat(this.getAvailableMovesInDirection("RIGHT"))
		movableTiles = movableTiles.concat(this.getAvailableMovesInDirection("DOWN"))
		movableTiles = movableTiles.concat(this.getAvailableMovesInDirection("LEFT"))
	}
	this.actionableTiles = movableTiles
	this.board.highlightTiles(movableTiles)
}

ActionHandler.prototype.getAvailableMovesInDirection = function (direction) {
	// const hasOtherPlayer = (pos, origPos) => {
	// 	return this.board[pos.x] && this.board[pos.x][pos.y] && this.board[pos.x][pos.y].contains(Player) &&
	// 		origPos.x !== pos.x && origPos.y !== pos.y
	// }
	let movesRemaining = config.game.maxMoves - this.numMoves
	let {direction: incrementDirection, sign: incrementSign} = getDirectionCoordinates(direction)

	let movableTiles = []

	for(let i = 1; i <= movesRemaining; i += 1) {
		let tile
		if(incrementDirection === 'x') {
			tile = this.board.board[this.player.pos.x + i * incrementSign] && this.board.board[this.player.pos.x + i * incrementSign][this.player.pos.y]
		} else {
			tile = this.board.board[this.player.pos.x][this.player.pos.y + i * incrementSign]
		}
		if(!tile || tile.contains(Obstacle) || tile.contains(Player)) {
			break
		}
		if (!tile.contains(Player) && !tile.contains(Obstacle)) {
			if(incrementDirection === 'x') {
				movableTiles.push({x: this.player.pos.x + i * incrementSign, y: this.player.pos.y})
			} else {
				movableTiles.push({x: this.player.pos.x, y: this.player.pos.y + i * incrementSign})
			}
		}
	}
	return movableTiles
}

ActionHandler.prototype.handleClick = function(pos) {
	if (this.isInBattlePhase) {
		if(this.actionableTiles.some(tilePos => tilePos.x === pos.x && tilePos.y === pos.y)) {
			this.player.attack(this.board.board[pos.x][pos.y].entity)
			this.handleMoves()
		}
	} else {
		let playerPos = this.player.pos
		let dx = pos.x - playerPos.x
		let dy = pos.y - playerPos.y
		if(this.actionableTiles.some(tilePos => tilePos.x === pos.x && tilePos.y === pos.y)) {
			if(dy < 0) {
				this.move("UP", Math.abs(dy))
			} else if(dx > 0) {
				this.move("RIGHT", Math.abs(dx))
			} else if(dy > 0) {
				this.move("DOWN", Math.abs(dy))
			} else if(dx < 0) {
				this.move("LEFT", Math.abs(dx))
			}
		}
	}
}

/**
 * Execute valid move on key press
 */
ActionHandler.prototype.handleKey = function(direction) {
	if(this.isInBattlePhase) {
		let {direction: coordDirection, sign} = getDirectionCoordinates(direction)
		let tile
		if(coordDirection === 'x') {
			tile = this.board.board[this.player.pos.x + sign] && this.board.board[this.player.pos.x + sign][this.player.pos.y]
		} else {
			tile = this.board.board[this.player.pos.x][this.player.pos.y + sign]
		}
		if (tile.contains(Player)) {
			this.player.attack(tile.entity)
			this.handleMoves()
		}
	} else {
		const magnitude = 1
		if(this.isValidMove(direction, magnitude)) {
			this.move(direction, magnitude)
		}
	}
}

/**
 * Move player on the board
 * @param (enum) direction - direction to move in. One of "UP", "RIGHT", "DOWN", "LEFT" 
 * @param (number) magnitude - number of positions to move
 */
ActionHandler.prototype.move = function (direction, magnitude) {
	if (this.hasMoved && direction !== this.moveDirection) {
		return null // player tries to move in another direction after starting movement in one direction
	}
	if (this.numMoves + magnitude > config.game.maxMoves) {
		return null // Player tries to move more than the max number of moves in a turn
	}
	// if (
	//  (direction === "RIGHT" || direction === "LEFT") &&
	//  (this.player.pos.x + magnitude >= this.board.board.length || this.player.pos.x + magnitude < 0)
	// ) {
	// 	return null
	// }
	// if (
	//  (direction === "DOWN" || direction === "UP") &&
	//  (this.player.pos.y + magnitude >= this.board.board[0].length || this.player.pos.y + magnitude < 0)
	// ) {
	// 	return null
	// }

	let dest = Object.assign({}, this.player.pos)
	// console.log("Player pos before switch ", this.player.pos)
	switch(direction) {
		case 'UP':
			this.hasMoved = true
			this.moveDirection = "UP"
			dest.y -= magnitude
			this.numMoves += magnitude
			break;
		case 'RIGHT':
			this.hasMoved = true
			this.moveDirection = "RIGHT"
			dest.x += magnitude
			this.numMoves += magnitude
			break;
		case 'DOWN':
			this.hasMoved = true
			this.moveDirection = "DOWN"
			dest.y += magnitude
			this.numMoves += magnitude
			break;
		case 'LEFT':
			this.hasMoved = true
			this.moveDirection = "LEFT"
			dest.x -= magnitude
			this.numMoves += magnitude
			break;
		default:
			throw new Error("Invalid direction")
	}
	try {
		this.board.clearHighlights()
		this.moveToPosition(dest)
	} catch(e) {
		console.error(e)
		throw new Error("Incorrect move")
	}

	this.getAvailableMoves()
}

/**
 * @param {Coordinates} dest - destination tile coordinates
 */
ActionHandler.prototype.moveToPosition = function (dest) {

	if(this.board.board[dest.x] && this.board.board[dest.x][dest.y]) {

		if(this.board.board[dest.x][dest.y].contains(Player)) {
			this.player.attack(this.board.board[dest.x][dest.y].entity)
			return
		}

		let oldWeapon = null
		if(this.board.board[dest.x][dest.y].contains(Weapon)) {
			let newWeapon = this.board.board[dest.x][dest.y].entity
			oldWeapon = this.player.swapWeapon(newWeapon)
		}
		if(this.board.board[dest.x][dest.y].contains(Consumable)) {
			let consumable = this.board.board[dest.x][dest.y].entity
			this.player.use(consumable)
			this.board.board[dest.x][dest.y].entity = null
		}
		this.board.moveObject(this.player.pos, dest)
		let oldPos = Object.assign({}, this.player.pos)
		this.player.pos = dest
		if(oldWeapon) {
			this.board.placeObject(oldWeapon, oldPos)			
		}
	} else {
		return null
	}
}

/**
 * Determine if movement is valid or not
 * @param {enum} direction - direction to move in
 * @param {number} magnitude - number of tiles to move
 */
ActionHandler.prototype.isValidMove = function (direction, magnitude) {
	let {direction: coordDirection, sign} = getDirectionCoordinates(direction)
	let pos = {}
	const playerPos = this.player.pos
	if(coordDirection === 'x') {
		pos.x = sign * magnitude 
		pos.y = 0
	} else {
		pos.x = 0
		pos.y = sign * magnitude 
	}
	return this.actionableTiles.some(tilePos => tilePos.x === pos.x + playerPos.x && tilePos.y === pos.y + playerPos.y)
}

function getDirectionCoordinates(direction) {
	let coordDirection = null
	let sign = 1
	switch(direction) {
		case 'UP':
			coordDirection = 'y'
			sign = -1
			break;
		case 'RIGHT':
			coordDirection = 'x'
			sign = 1
			break;
		case 'DOWN':
			coordDirection = 'y'
			sign = 1
			break;
		case 'LEFT':
			coordDirection = 'x'
			sign = -1
			break;
		default:
			throw new Error("Invalid direction")
	}
	return {
		direction: coordDirection,
		sign
	}
}