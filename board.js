
/**
 * Represents the game board.
 * @constructor
 * @param {number} sizeX - Width of the board
 * @param {number} sizeY - Length of the board.
 */
export default function Board(sizeX = 4, sizeY = 4) {
	this.board = new Array(sizeY, new Array(sizeX))
}
