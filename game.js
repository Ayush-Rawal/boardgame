import Board from './board'
import Player from './player'

export default function Game (sizeX, sizeY, numPlayers = 2) {
	this.board = new Board(sizeX, sizeY)
	this.players = new Array(numPlayers, new Player())
	this.turn = 0
	this.totalTurns = 0
	this.isGameOver = false
	this.winner = null
	this.score = new Array(numPlayers)
	this.gameTime = 0
}