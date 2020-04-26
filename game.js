import Board from './board.js'
import Player from './player.js'
import onKey from './node_modules/keymaster/keymaster.js'
import config from "./config.js"
import Weapon from './weapon.js'
import Sprite from './sprite.js'
import Consumable from './consumable.js'

/**
 * Represents the game
 * @constructor
 * @param {number} [numPlayers=2] - number of players in the game
 */
	this.playerWithTurn = 0
	this.rounds = 0
	this.isGameOver = false
	this.winner = null
	this.score = new Array(numPlayers)
	this.gameTime = 0
	this.initializeLoot()

	onKey('up, W', () => this.players[this.playerWithTurn].move('UP', 1))
	onKey('left, A', () => this.players[this.playerWithTurn].move('LEFT', 1))
	onKey('down, S', () => this.players[this.playerWithTurn].move('DOWN', 1))
	onKey('right, D', () => this.players[this.playerWithTurn].move('RIGHT', 1))
	onKey('T', () => this.playerWithTurn = (this.playerWithTurn + 1) % numPlayers)
}

/**
 * Render tile and contained object
 * @param (object) ctx - 2D canvas context for rendering
 */
Game.prototype.render = function (ctx) {
	this.board.highlightAvailableMoves(this.players[this.playerWithTurn].pos)
	this.board.render(ctx)
	this.board.clearHighlights()
}

/**
 * Initialize players randomly across the board
 */
	// Initialize players and their position on the board depending on board size and number of players
	// TODO: Position players on board
	let players = []
	for (let i = 0; i < numPlayers; i++) {
		let {x, y} = findRandomUnoccupiedTile(board.board)
		let player = new Player(`Player ${i}`, x, y)
		players.push(player)
		board.board[x][y].entity = player
	}
	return players
}

/**
 * Initialize loot (weapons and consumables) randomly across the board
 */
Game.prototype.initializeLoot = function() {
	let board = this.board.board
	spawnObjects(board, Math.min(this.players.length, 4), config.weapons, Weapon)
	spawnObjects(board, this.players.length, config.consumables, Consumable)
	
}

/**
 * Create a object randomly selected from a list on a random unoccupied tile
 * @param {Object} board - Game board
 * @param {number} numObjects - number of objects to spawn 
 * @param {Object[]} objects - list of object configs
 * @param {*} Constuctor - Constructor for object to spawn
 */
function spawnObjects (board, numObjects, objects, Constuctor) {
	for(let i = 0; i < numObjects; i++) {
		let {x, y} = findRandomUnoccupiedTile(board)
		let randomIndex = Math.floor(Math.random() * objects.length)
		let entity = new Constuctor(randomIndex)
		board[x][y].entity = entity
	}
}

function findRandomUnoccupiedTile(board) {
	let randomX = Math.floor(Math.random() * board.length)
	let randomY = Math.floor(Math.random() * board[0].length)
	while(!board[randomX][randomY].contains(null)) {
		// keep finding random tile until unoccupied one is found
		randomX = Math.floor(Math.random() * board.length)
		randomY = Math.floor(Math.random() * board[0].length)
	}
	return {
		x: randomX,
		y: randomY
	}
}
