import Weapon from './weapon.js'
import Sprite from './sprite.js'

/**
 * Represents a player.
 * @constructor
 * @param (number) index - Unique player index
 * @param (object) pos - position for rendering
 * @param (number) pos.x - x coordinate of position for rendering
 * @param (number) pos.y - y coordinate of position for rendering
 */
export default function Player(index, pos) {
	this.name = `Player ${index}`
	this.index = index
	this.hp = 100
	this.maxHP = 100
	this.weapon = new Weapon(0)
	this.armor = 0
	this.pos = pos
	this.sprite = new Sprite("./assets/kp1/characters/knight_16x16-spritesheet_no-bkg_char-set-1.png", 0, index * 3, 16, 16)
}

/**
 * Attack another player
 * @param (Player) opponent - player to attack 
 */
Player.prototype.attack = function (opponent) {
	let actualDamage = this.weapon.damage * (1 - opponent.armor)
	opponent.hp -= actualDamage
	this.weapon.animate()
	opponent.showDamage(actualDamage)
}

Player.prototype.setDeadSprite = function () {
	this.sprite = new Sprite("./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png", 0, 0, 32, 32)
	delete this.weapon
	this.weapon = null
}

/**
 * Defend from attacks during turn
 */
Player.prototype.defend = function () {
	this.armor = 0.5
}

/**
 * Clear extra armor gained
 */
Player.prototype.clearDefence = function() {
	this.armor = 0
}

/**
 * Render Player
 * @param (object) ctx - 2D canvas context for rendering
 * @param (object) pos - position for rendering
 * @param (number) pos.x - x coordinate of position for rendering
 * @param (number) pos.y - y coordinate of position for rendering
 */
Player.prototype.render = function (ctx, pos) {
	let {x, y} = pos
	// center player
	// TODO: Replace magic number with const in config
	x = x + 4
	y = y + 4
	this.sprite.render(ctx, x, y, 20, 20)
	this.weapon.render(ctx, {x, y}, 16, 16)
	// TODO: Add offsets to weapons
}

/**
 * Show damage dealt to player
 * @param (number) damage - damage done 
 */
Player.prototype.showDamage = function (damage) {
	console.log(`Player damaged by ${damage}`)
}

Player.prototype.swapWeapon = function(newWeapon) {
	console.log("Weapon swapped")
	let oldWeapon = this.weapon
	this.weapon = newWeapon
	return oldWeapon
}

Player.prototype.use = function(consumable) {
	this[consumable.affectedAttribute] += consumable.effect
	if(consumable.affectedAttribute === 'hp') {
		this.maxHP += consumable.effect
	}
}
 