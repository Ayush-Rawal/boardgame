
/**
 * Represents the game board.
 * @constructor
 * @param {number} sizeX - Width of the board
 * @param {number} sizeY - Length of the board.
 */
export default function Board(url, bgSize, sizeX = 4, sizeY = 4) {
	let board = new Array(sizeX).fill(null)
	this.board = board.map(row => (row = new Array(sizeY).fill(null)))
	let img = new Image()
	img.src = url
	this.bg = img
	this.bgSize = bgSize
}

Board.prototype.render = function (ctx) {
	this.board.forEach((row, i) => {
		row.forEach((_, j) => {
			ctx.drawImage(
				this.bg, 0, 0, this.bgSize, this.bgSize,
				i * this.bgSize, j * this.bgSize, this.bgSize, this.bgSize
			)
		})
	})
}

Board.prototype.getAvailableMoves = function (playerX, playerY) {

}