import config from "./config.js"
import Sprite from "./sprite.js"

/**
 * Represents a weapon.
 * @constructor
 * @param (number) [index] - index of weapon in weapon config
*/
export default function Weapon(index) {
	let weapon = config.weapons[index]
	let sprite = weapon.sprite
	let weaponSprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.damage = weapon.damage
	this.sprite = weaponSprite
	this.offset = weapon.offset
}

/**
 * Animate the weapon sprite.
*/
Weapon.prototype.animate = function() {
	console.log("Smash Smash!!")
	this.sprite.animate([])
}

/**
 * Render the weapon sprite.
 * @param (object) ctx - 2D canvas context for rendering
 * @param (number) destX - X coordinate at which to render the sprite
 * @param (number) destXY - Y coordinate at which to render the sprite
*/
Weapon.prototype.render = function (ctx, dest, destW, destH) {
	this.sprite.render(ctx, dest.x + this.offset.x, dest.y + this.offset.y, destW, destH)
	// this.sprite.render(ctx, dest.x , dest.y, destW, destH)
}