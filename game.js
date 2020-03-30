import Board from './board.js'
import Player from './player.js'

export default function Game (sizeX, sizeY, numPlayers = 2) {
	this.board = new Board(
		"./assets/tiles/200x200/tiles_named_by_description/grass_biome/grass-no_edges.png",
		200,
		sizeX,
		sizeY
	)
	this.players = new Array(numPlayers).fill(null).map((_, i) => new Player(`Player ${i}`, 0,0))
	this.turn = 0
	this.totalTurns = 0
	this.isGameOver = false
	this.winner = null
	this.score = new Array(numPlayers)
	this.gameTime = 0
}

Game.prototype.render = function (ctx) {
	this.board.render(ctx)
	this.players.forEach(player => player.render(ctx))
}