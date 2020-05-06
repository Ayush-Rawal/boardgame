import Board from './board.js'
import Player from './player.js'
import onKey from './node_modules/keymaster/keymaster.js'
import config from "./config.js"
import Weapon from './weapon.js'
import Obstacle from "./obstacle.js"
import Consumable from './consumable.js'
import { onClick } from "./clicky.js"
import ActionHandler from "./actionhandler.js"
import Dashboard from "./dashboard.js"

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
	this.score = new Array(numPlayers)
	this.initializeLoot()
	this.actionHandler = new ActionHandler(this.board, this.players[this.playerWithTurn],
		 this.changeTurn.bind(this), this.removePLayer.bind(this))

	onKey('up, W', () => this.actionHandler.handleKey('UP'))
	onKey('left, A', () => this.actionHandler.handleKey('LEFT'))
	onKey('down, S', () => this.actionHandler.handleKey('DOWN'))
	onKey('right, D', () => this.actionHandler.handleKey('RIGHT'))
	onKey('T', () => this.changeTurn())
	this.board.board.forEach((row, i) => {
		row.forEach((_, j) => {
			onClick({x: i, y: j}, this.actionHandler.handleClick.bind(this.actionHandler))
		})
	})

	this.dashboard = new Dashboard(this.players, this.changeTurn.bind(this), this.actionHandler.defend.bind(this.actionHandler))

}

Game.prototype.changeTurn = function() {
	this.board.clearHighlights()
	this.playerWithTurn = (this.playerWithTurn + 1) % this.numPlayers
	this.actionHandler.reset(this.players[this.playerWithTurn])
	this.actionHandler.handleMoves()
}

Game.prototype.removePLayer = function(index) {
	let pos = this.players[index].pos
	this.board.board[pos.x][pos.y].entity = null
	this.players.splice(index, 1)
	this.numPlayers -= 1
}

/**
 * Render tile and contained object
 * @param (object) ctx - 2D canvas context for rendering
 */
Game.prototype.render = function (ctx) {
	this.board.render(ctx)
	this.dashboard.render(this.playerWithTurn, this.actionHandler.isInBattlePhase)
}

/**
 * Initialize players randomly across the board
 */
Game.prototype.initalizePlayers = function () {
	// Initialize players and their position on the board so that no players touch each other
	let players = []
	let board = this.board.board
	for (let i = 0; i < this.numPlayers; i++) {
		let pos = this.board.findRandomUnoccupiedTile()
		while(
			// Check no other player nearby (so we won't initiate battle phase at the start)
			(board[pos.x - 1] && board[pos.x - 1][pos.y] && board[pos.x - 1][pos.y].contains(Player))
			 || (board[pos.x + 1] && board[pos.x + 1][pos.y] && board[pos.x + 1][pos.y].contains(Player))
			 || (board[pos.x][pos.y - 1] && board[pos.x][pos.y - 1].contains(Player))
			 || (board[pos.x][pos.y + 1] && board[pos.x][pos.y + 1].contains(Player))
		) {
			pos = this.board.findRandomUnoccupiedTile()
		}
		let player = new Player(i, pos, this.removePLayer)
		players.push(player)
		board[pos.x][pos.y].entity = player
	}
	return players
}

/**
 * Initialize loot (weapons and consumables) randomly across the board
 */
Game.prototype.initializeLoot = function() {
	spawnObjects(this.board, Math.min(this.numPlayers, 4), config.weapons, Weapon)
	spawnObjects(this.board, this.numPlayers, config.consumables, Consumable)
	let numObstacles = (config.board.size.width + config.board.size.height) / 2
	spawnObjects(this.board, numObstacles, config.obstacles, Obstacle)
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
