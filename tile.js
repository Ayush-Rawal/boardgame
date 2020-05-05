import Sprite from "./sprite.js"
import config from './config.js'
import Player from "./player.js"

/**
 * Represents a board tile
 * @constructor
 */
export default function Tile() {
	let {sprite} = config.board
	this.sprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.entity = null
	this.isHighlighted = false
}

/**
 * Returns whether tile contains an instance of passed object
 * @param (object) object - Object to check for on tile
 */
Tile.prototype.contains = function (blueprint) {
	if(blueprint === null) {
		return this.entity === null
	}
	return this.entity instanceof blueprint
}

/**
 * Render tile and contained object
 * @param (object) ctx - 2D canvas context for rendering
 * @param (object) pos - position for rendering
 * @param (number) pos.x - x coordinate of position for rendering
 * @param (number) pos.y - y coordinate of position for rendering
 */
Tile.prototype.render = function(ctx, pos) {
	this.sprite.render(ctx, pos.x * this.sprite.frameW, pos.y * this.sprite.frameH)
	
	if(this.isHighlighted) {
		if(this.contains(Player)) {
			ctx.strokeStyle = 'rgba(237, 0, 0, 0.8)'
			ctx.fillStyle = 'rgba(240, 0, 0, 0.3)'
		} else {
			ctx.strokeStyle = 'rgba(237, 237, 17, 0.8)'
			ctx.fillStyle = 'rgba(240, 240, 14, 0.3)'
		}
		ctx.strokeRect(pos.x * this.sprite.frameW, pos.y * this.sprite.frameH, this.sprite.frameW, this.sprite.frameH);		
		ctx.fillRect(pos.x * this.sprite.frameW, pos.y * this.sprite.frameH, this.sprite.frameW, this.sprite.frameH);
	}

	if(this.entity) {
		// Calc absolute positions from tile positions
		// entity to be rendered at centre of tile ( addition of rounded 1/2 width and height)
		let entityPos = {
			x: (pos.x * this.sprite.frameW) ,
			y: (pos.y * this.sprite.frameH) 
		}
		this.entity.render(ctx, entityPos, 24, 24)
	}
}