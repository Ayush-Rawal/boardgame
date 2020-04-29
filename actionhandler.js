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
	console.log("Resetting ActionHandler")
	this.hasMoved = false
	this.moveDirection = null
	this.player = player
	this.numMoves = 0
}

/**
 * Highlight available moves to player on board
 */
ActionHandler.prototype.highlightAvailableMoves = function () {
	// console.log("Move Direction", this.moveDirection)
	if(this.hasMoved) {
		this.highlightMovesInDirection(this.moveDirection)
	} else {
		this.highlightMovesInDirection("UP")
		this.highlightMovesInDirection("RIGHT")
		this.highlightMovesInDirection("DOWN")
		this.highlightMovesInDirection("LEFT")
	}
}

/**
 * Move player on the board
 * @param (enum) direction - direction to move in. One of "UP", "RIGHT", "DOWN", "LEFT" 
 * @param (number) magnitude - number of positions to move
 */
ActionHandler.prototype.move = function (direction, magnitude) {
	if((this.hasMoved && direction !== this.moveDirection) || this.numMoves + magnitude > config.game.maxMoves) {
		return null
	}
	this.board.clearHighlights()
	let dest = Object.assign({}, this.player.pos)
	console.log("Player pos before switch ", this.player.pos)
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
		console.log("Deep reference" + this.player.pos == dest? " confirmed" : " not there")
		console.log("Player pos ", this.player.pos, " dest ", dest)
		this.board.movePlayer(this.player.pos, dest)
		this.player.pos = dest
		console.log(this.player.pos)
	} catch(e) {
		console.error(e)
		throw new Error("Incorrect move")
	}
	this.highlightAvailableMoves()
}

ActionHandler.prototype.highlightMovesInDirection = function (direction) {
	// console.log(direction)
	const hasOtherPlayer = (pos, origPos) => {
		return this.board[pos.x] && this.board[pos.x][pos.y] && this.board[pos.x][pos.y].contains(Player) &&
			origPos.x !== pos.x && origPos.y !== pos.y
	}
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
	let attackableTiles = []

	for(let i = 1; i <= movesRemaining; i += 1) {
		// console.log("i ", i, "incrementing by ", i*incrementSign)
		let tile
		if(incrementDirection === 'x') {
			tile = this.board.board[this.player.pos.x + i * incrementSign] && this.board.board[this.player.pos.x + i * incrementSign][this.player.pos.y]
		} else {
			tile = this.board.board[this.player.pos.x][this.player.pos.y + i * incrementSign]
		}
		if(!tile) {
			break
		}
		// console.log(tile)
		// TODO: Replace with not contains player or obstacle once obstacles are added
		if (tile.contains(null) || tile.contains(Weapon) || tile.contains(Consumable)) {
			if(incrementDirection === 'x') {
				movableTiles.push({x: this.player.pos.x + i * incrementSign, y: this.player.pos.y})
			} else {
				movableTiles.push({x: this.player.pos.x, y: this.player.pos.y + i * incrementSign})
			}
		}
	}
	movableTiles.forEach(pos => {
		// Add reachable tiles that contain players to attackable
		if(hasOtherPlayer({x: pos.x + 1, y: pos.y}, this.player.pos)) {
			attackableTiles.push({x: pos.x + 1, y: pos.y})
		}
		if(hasOtherPlayer({x: pos.x - 1, y: pos.y}, this.player.pos)) {
			attackableTiles.push({x: pos.x - 1, y: pos.y})
		}
		if(hasOtherPlayer({x: pos.x, y: pos.y + 1}, this.player.pos)) {
			attackableTiles.push({x: pos.x, y: pos.y + 1})
		}
		if(hasOtherPlayer({x: pos.x, y: pos.y - 1}, this.player.pos)) {
			attackableTiles.push({x: pos.x, y: pos.y - 1})
		}
	})
	// console.log(this.board)
	this.board.highlightTiles(movableTiles)
	this.board.highlightTiles(attackableTiles)
	// attackableTiles.forEach(pos => board.board[pos.x][pos.y].isHighlighted = true)
}


// ActionHandler.prototype.render = function (ctx) {
// 	// this.highlightAvailableMoves()
// }