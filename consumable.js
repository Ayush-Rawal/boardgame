import config from "./config.js"
import Sprite from "./sprite.js"

export default function Consumable(index) {
	let consumable = config.consumables[index]
	let sprite = consumable.sprite
	let consumableSprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.name = consumable.name
	this.affectedAttribute = consumable.affectedAttribute
	this.effect = consumable.effect
	this.sprite = consumableSprite
}

Consumable.prototype.render = function (ctx, dest, destW, destH) {
	this.sprite.render(ctx, dest.x, dest.y, destW, destH)
}