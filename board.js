import Tile from "./tile.js"
import { onClick } from "./clicky.js"
import Player from './player.js'
import Weapon from "./weapon.js"
import Consumable from "./consumable.js"

/**
 * Represents the game board.
 * @constructor
 * @param {number} [sizeX=4] - Width of the board
 * @param {number} [sizeY=4] - Length of the board.
 */
export default function Board(sizeX = 4, sizeY = 4) {
	let board = new Array(sizeX).fill(null)
	
	this.board = board.map(_ => new Array(sizeY).fill(null).map(_ => new Tile()))
	this.board.forEach((row, i) => {
		row.forEach((tile, j) => {
			onClick({x: i, y: j}, ()  => console.log("Click on tile at", i, j))
		})
	})
	console.table(this.board)
}

Board.prototype.render = function (ctx) {
	this.board.forEach((row, i) => {
		row.forEach((tile, j) => {
			tile.render(ctx, {x: i, y: j})
		})
	})
}

Board.prototype.movePlayer = function (src, dest) {
	if(this.board[dest.x] && this.board[dest.x][dest.y]) {
		this.board[dest.x][dest.y].entity = this.board[src.x][src.y].entity
		this.board[src.x][src.y].entity = null
	} else {
		console.warn("Invalid move to dest", dest, src)
		throw("Invalid Move")
	}
}

Board.prototype.refresh = function() {
	this.clearHighlights()
}

Board.prototype.clearHighlights = function () {
	this.board.forEach((row) => {
		row.forEach((tile) => {
			tile.isHighlighted = false
		})
	})
}


/**
 * highlight available movements for player
 * @param (TilePosition) playerPos - tile position of player
 */
Board.prototype.highlightAvailableMoves = function (playerPos) {
	const maxMoves = 3
	let movableTiles = []
	let attackableTiles = []

	let {x, y} = playerPos
	let board = this.board
	// Perform increment in the following ways
	// [x+1, y], [x+2, y], [x+3, y]
	// [x, y+1], [x, y+2], [x, y+3]
	// [x-1, y], [x-2, y], [x-3, y]
	// [x, y-1], [x, y-2], [x, y-3]
	for(let i = 0, negativeIncrement = false, incrementX = true; i < 4; ) {
		for (let increment = 1; increment <= maxMoves; increment++) {
			let sign = negativeIncrement? -1 : 1
			let xIncrement = incrementX ? sign * increment : 0
			let yIncrement = !incrementX ? sign * increment : 0
			if(board[x + xIncrement] && board[x + xIncrement][y + yIncrement]) {
				let tile = board[x + xIncrement][y + yIncrement]
				// TODO: Replace with not contains player or obstacle once obstacles are added
				if (tile.contains(null) || tile.contains(Weapon) || tile.contains(Consumable)) {
					movableTiles.push({x: x + xIncrement, y: y + yIncrement})
				} else if (tile.contains(Player)) {
					attackableTiles.push({x: x+ xIncrement, y: y + yIncrement})
					break
				} else {
					// ? Check for obstacles
					break
				}
			}
		}
		i++;
		if(i%2) {
			incrementX = false
		} else {
			incrementX = true
		}
		if(i>=2) {
			negativeIncrement = true
		}
	}
	movableTiles.forEach(pos => {
		board[pos.x][pos.y].isHighlighted = true
		// Add reachable tiles that contain players to attackable
		if(hasOtherPlayer({x: pos.x + 1, y: pos.y}, playerPos)) {
			attackableTiles.push({x: pos.x + 1, y: pos.y})
		}
		if(hasOtherPlayer({x: pos.x - 1, y: pos.y}, playerPos)) {
			attackableTiles.push({x: pos.x - 1, y: pos.y})
		}
		if(hasOtherPlayer({x: pos.x, y: pos.y + 1}, playerPos)) {
			attackableTiles.push({x: pos.x, y: pos.y + 1})
		}
		if(hasOtherPlayer({x: pos.x, y: pos.y - 1}, playerPos)) {
			attackableTiles.push({x: pos.x, y: pos.y - 1})
		}
	})
	attackableTiles.forEach(pos => board[pos.x][pos.y].isHighlighted = true)

	function hasOtherPlayer(pos, origPos) {
		return board[pos.x] && board[pos.x][pos.y] && board[pos.x][pos.y].contains(Player) &&
		 origPos.x !== pos.x && origPos.y !== pos.y
	}
}
