import Weapon from './weapon.js'
import Sprite from './sprite.js'
import {board} from "./index.js"

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
	this.weapon = new Weapon(0)
	this.armor = 0
	this.pos = { x: x, y: y }
	console.log("Player created", this.pos)
	this.sprite = new Sprite("./assets/kp1/characters/knight_16x16-spritesheet_no-bkg_char-set-1.png", 0, 0, 16, 16)
}

/**
 * Move player on the board
 * @param (enum) direction - direction to move in. One of "UP", "RIGHT", "DOWN", "LEFT" 
 * @param (number) magnitude - number of positions to move
 */
Player.prototype.move = function (direction, magnitude) {
	console.log("Move called")
	let destX = this.pos.x, destY = this.pos.y
	switch(direction) {
		case 'DOWN':
			destY += magnitude
			break;
		case 'RIGHT':
			destX += magnitude
			break;
		case 'UP':
			destY -= magnitude
			break;
		case 'LEFT':
			destX -= magnitude
			break;
		default:
			throw new Error("Invalid direction")
	}
	console.log({x: this.pos.x, y: this.pos.y}, {x: destX, y: destY})
	try {
		board.movePlayer({x: this.pos.x, y: this.pos.y}, {x: destX, y: destY})
		console.log(this)
		this.pos.x = destX
		this.pos.y = destY
		console.log(this.pos)
	} catch(e) {
		console.error(e)
		throw new Error("Incorrect move")
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
Player.prototype.render = function (ctx, pos) {
	let {x, y} = pos
	// center player
	// TODO: Replace magic number with const in config
	x = x - 8
	y = y - 8
	this.sprite.render(ctx, x, y)
	this.weapon.render(ctx, {x, y}, 16, 16)
	// TODO: Add offsets to weapons
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

// Player.actionHandler()

Player.prototype.actionHandler = function () {
	let hasMoved = false
	let moveDirection = null
	
}