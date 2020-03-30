import Weapon from './weapon.js'
/**
 * Represents a player.
 * @constructor
 */
export default function Player(name, x, y) {
	this.name = name
	this.hp = 400
	this.weapon = new Weapon()
	this.armor = 0
	this.renderData = {
		currentFrame: 0,
		frameX: 16,
		frameY: 16
	}
	this.pos = { x: x, y: y }
}

const PlayerAssetURL = "./assets/kp1/characters/knight_16x16-spritesheet_no-bkg_char-set-1.png"
const playerSprite = new Image()
playerSprite.src = PlayerAssetURL
Player.sprite = playerSprite

Player.prototype.move = function ({direction, magnitude}) {
	switch(direction) {
		case 'DOWN':
			this.pos.y += magnitude
			break;
		case 'RIGHT':
			this.pos.x += magnitude
			break;
		case 'UP':
			this.pos.y -= magnitude
			break;
		case 'LEFT':
			this.pos.x -= magnitude
			break;
		default:
			throw new Error("Invalid direction")
	}
}

Player.prototype.attack = function (player) {
	player.hp -= this.weapon.damage * player.armor
	// TODO: Animate weapon sprite animation
}

Player.prototype.render = function (ctx) {
	let {frameX, frameY} = this.renderData
	let {x, y} = this.pos
	// TODO: change 0,0 to set dynamically acc to current frame
	ctx.drawImage(this.sprite, 0, 0, frameX, frameY, x, y, frameX, frameY)
}
