/**
 * Represents a weapon.
 * @constructor
 * @param (Sprite) sprite - weapon sprite
 * @param (number) [damage=40] - damage done per hit
*/
export default function Weapon(sprite, damage = 40) {
	this.damage = damage
	this.sprite = sprite
}

/**
 * Animate the weapon sprite.
 * @param (number) damage - damage done per hit
 * @param (Sprite) sprite - weapon sprite
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
Weapon.prototype.render = function (ctx, destX, destY, destW, destH) {
	this.sprite.render(ctx, destX, destY, destW, destH)
}