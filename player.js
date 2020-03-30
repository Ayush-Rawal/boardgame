import Weapon from './weapon.js'
/**
 * Represents a player.
 * @constructor
 * @param (string) name - Name of the Player
 * @param (number) x - X coordinate of player position
 * @param (number) y - Y coordinate of player position
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
Player.prototype.sprite = playerSprite

/**
 * Move player on the board
 * @param (enum) direction - direction to move in. One of "UP", "RIGHT", "DOWN", "LEFT" 
 * @param (number) magnitude - number of positions to move
 */
Player.prototype.move = function (direction, magnitude) {
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

/**
 * Attack another player
 * @param (Player) opponent - player to attack 
 */
Player.prototype.attack = function (opponent) {
	let actualDamage = this.weapon.damage * opponent.armor
	opponent.hp -= actualDamage
	this.weapon.animate()
	opponent.showDamage(actualDamage)
}

/**
 * Defend from attacks during turn
 */
Player.prototype.defend = function () {
	// TODO: End extra armor at end of turn
	// Note: Add a status mechanism that takes care of status effects ending at diff turns
	this.armor = 0.5
}

/**
 * Render Player
 * @param (object) ctx - 2D canvas context for rendering
 */
Player.prototype.render = function (ctx) {
	let {frameX, frameY} = this.renderData
	let {x, y} = this.pos
	// TODO: change 0,0 to set dynamically acc to current frame
	ctx.drawImage(this.sprite, 0, 0, frameX, frameY, x, y, frameX, frameY)
}

/**
 * Show damage dealt to player
 * @param (number) damage - damage done 
 */
Player.prototype.showDamage = function (damage) {
	// TODO
	// Note: show rounded damage to avoid showing things like damaged by 33.333333
	console.log(`Player damaged by ${damage}`)
}

(url = "D:/Projects/Boardgame/assets/#2 - Transparent & Drop Shadow.png", srcX = 1, srcY = 5, frameW = 32, frameH = 32)