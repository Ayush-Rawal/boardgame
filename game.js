import Board from './board.js'
import Player from './player.js'
import onKey from './node_modules/keymaster/keymaster.js'

export default function Game (sizeX, sizeY, numPlayers = 2) {
	this.board = new Board(
    	"./assets/tiles/100x100/tiles_named_by_description/grass_biome/grass-no_edges.png",
    	100,
		sizeX,
		sizeY
	)
	this.players = new Array(numPlayers).fill(null).map((_, i) => new Player(`Player ${i}`, 0, 0))
	this.playerWithTurn = 0
	this.rounds = 0
	this.isGameOver = false
	this.winner = null
	this.score = new Array(numPlayers)
	this.gameTime = 0

	onKey('up, W', () => this.players[this.playerWithTurn].move('UP', 8))
	onKey('left, A', () => this.players[this.playerWithTurn].move('LEFT', 8))
	onKey('down, S', () => this.players[this.playerWithTurn].move('DOWN', 8))
	onKey('right, D', () => this.players[this.playerWithTurn].move('RIGHT', 8))
	onKey('T', () => this.playerWithTurn = (this.playerWithTurn + 1) % numPlayers)
}

Game.prototype.render = function (ctx) {
	this.board.render(ctx)
	this.players.forEach(player => player.render(ctx))
}