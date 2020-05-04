import config from "./config.js"

import Player from './player.js'
import Weapon from "./weapon.js"
import Consumable from "./consumable.js"

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
this.highlightAvailableMoves()
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
	let incrementDirection = null
	let incrementSign = 1
	switch(direction) {
		case 'UP':
			incrementDirection = 'y'
			incrementSign = -1
			break;
		case 'RIGHT':
			incrementDirection = 'x'
			incrementSign = 1
			break;
		case 'DOWN':
			incrementDirection = 'y'
			incrementSign = 1
			break;
		case 'LEFT':
			incrementDirection = 'x'
			incrementSign = -1
			break;
		default:
			throw new Error("Invalid direction")
	}

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
	this.board.clearHighlights()
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
	} catch(e) {
		console.error(e)
		throw new Error("Incorrect move")
	}

	this.getAvailableMoves()
}