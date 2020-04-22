import Sprite from "./sprite.js"
import config from './config.js'

/**
 * Represents a board tile
 * @constructor
 */
export default function Tile() {
	let {sprite} = config.board
	this.sprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.entity = null
	this.isHighlighted = false

	// ! Temporary highlighting workaround
	this.dirtSprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.grassSprite = new Sprite("./assets/tiles/100x100/tiles_named_by_description/grass_biome/grass-no_edges.png", sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.waterSprite = new Sprite("./assets/tiles/100x100/tiles_named_by_description/grass_biome/water-no_edges.png", sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
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
 * @param (number) posX - x (row) index of the tile
 * @param (number) posY - y (column) index of the tile
 */
Tile.prototype.render = function(ctx, pos) {
	
	// ! Temporary highlighting workaround
	if (this.isHighlighted && this.contains(null)) {
		this.grassSprite.render(ctx, pos.x * this.sprite.frameW, pos.y * this.sprite.frameH)
	} else if(this.isHighlighted) {
		this.waterSprite.render(ctx, pos.x * this.sprite.frameW, pos.y * this.sprite.frameH)
	} else {
		this.dirtSprite.render(ctx, pos.x * this.sprite.frameW, pos.y * this.sprite.frameH)
	}
	
	// ! Enable after temporary highlighting workaround is removed
	// this.sprite.render(ctx, pos.x * this.sprite.frameW, pos.y * this.sprite.frameH)
	if(this.entity) {
		// Calc absolute positions from tile positions
		// entity to be rendered at centre of tile ( addition of rounded 1/2 width and height)
		let entityPos = {
			x: (pos.x * this.sprite.frameW) + Math.round(0.5 * this.sprite.frameW),
			y: (pos.y * this.sprite.frameH) + Math.round(0.5 * this.sprite.frameH)
		}
		this.entity.render(ctx, entityPos, 16, 16)
	}
}