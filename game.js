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
export default function Game (numPlayers = 2) {
	let {size} = config.board
	this.board = new Board({x: size.width, y: size.height})
	this.numPlayers = numPlayers
	this.players = this.initalizePlayers() 
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
Game.prototype.initalizePlayers = function () {
	// Initialize players and their position on the board depending on board size and number of players
	// TODO: Position players on board
	let players = []
	let board = this.board.board
	for (let i = 0; i < this.numPlayers; i++) {
		let {x, y} = this.board.findRandomUnoccupiedTile()
		let player = new Player(`Player ${i}`, {x, y})
		players.push(player)
		board[x][y].entity = player
	}
	return players
}

/**
 * Initialize loot (weapons and consumables) randomly across the board
 */
Game.prototype.initializeLoot = function() {
	spawnObjects(this.board, Math.min(this.numPlayers, 4), config.weapons, Weapon)
	spawnObjects(this.board, this.numPlayers, config.consumables, Consumable)
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
		let {x, y} = board.findRandomUnoccupiedTile()
		let randomIndex = Math.floor(Math.random() * objects.length)
		let entity = new Constuctor(randomIndex)
		board.board[x][y].entity = entity
	}
}
