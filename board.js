import Tile from "./tile.js"
import { onClick } from "./clicky.js"

/**
 * Represents the game board.
 * @constructor
 * @param {object} [size] - Size (width and height in tiles) of the board
 * @param {number} size.x - Width in tiles of the board
 * @param {number} size.y - Height in tiles of the board
 */
export default function Board(size = {x: 8, y: 8}) {
	let board = new Array(size.x).fill(null)
	
	this.board = board.map(_ => new Array(size.y).fill(null).map(_ => new Tile()))
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

Board.prototype.moveObject = function (src, dest) {
	// console.log("Board moving player", src, dest)
	if(this.board[dest.x] && this.board[dest.x][dest.y]) {
		this.board[dest.x][dest.y].entity = this.board[src.x][src.y].entity
		this.board[src.x][src.y].entity = null
	} else {
		console.warn("Invalid move to dest", dest, src)
		throw("Invalid Move")
	}
}

Board.prototype.placeObject = function (entity, dest) {
	if(this.board[dest.x] && this.board[dest.x][dest.y]) {
		this.board[dest.x][dest.y].entity = entity
	} else {
		throw("Invalid dest passed to Board.placeObject", dest)
	}
}


Board.prototype.findRandomUnoccupiedTile = function() {
	let randomX = Math.floor(Math.random() * this.board.length)
	let randomY = Math.floor(Math.random() * this.board[0].length)
	while(!this.board[randomX][randomY].contains(null)) {
		// keep finding random tile until unoccupied one is found
		randomX = Math.floor(Math.random() * this.board.length)
		randomY = Math.floor(Math.random() * this.board[0].length)
	}
	return {
		x: randomX,
		y: randomY
	}
}

/**
 * @param (Object[]) tiles - Array of position objects
 * @param (number) tiles.x - x coordinate of tile position
 * @param (number) tiles.y - y coordinate of tile position
 */
Board.prototype.highlightTiles = function(tiles) {
	// console.log("Highlighting tiles", tiles)
	for(let tile of tiles) {
		this.board[tile.x][tile.y].isHighlighted = true
	}
}

/**
 * Clear highlights from tiles
 */
Board.prototype.clearHighlights = function () {
	this.board.forEach((row) => {
		row.forEach((tile) => {
			tile.isHighlighted = false
		})
	})
}