import Weapon from './weapon'
/**
 * Represents a player.
 * @constructor
 */
function Player() {
	this.hp = 400
	this.weapon = new Weapon()
	this.armor = 0
	this.render = {
		currentFrame: 0,
	}
}

const PlayerAssetURL = ".\\Assets\\kp1\\characters\\knight_16x16-spritesheet_no-bkg_char-set-1.png"
const playerSprite = new Image()
playerSprite.src = PlayerAssetURL
Player.prototype.sprite = playerSprite

Player.prototype.move = function () {}

Player.prototype.attack = function (player) {} // take player 2 as arg?

Player.prototype.getAvailableMoves = function () {}

function a () {
// Down Right Top Left
// Rows n, n+3 till 12, 15th row empty 16x16

	var x = 0, y = 0
	const spriteX = 256, spriteY = 256
	const frameX = 16, frameY = 16
}
