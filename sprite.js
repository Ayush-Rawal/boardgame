/**
 * Represents sprite
 * @constructor
 * @param (string) uri - path of spritesheet/spritemap 
 * @param (number) srcX - X position(index) of sprite in spritesheet 
 * @param (number) srcX - Y position(index) of sprite in spritesheet 
 * @param (number) frameW - Width of frames in spritesheet 
 * @param (number) frameH - Height of frames in spritesheet 
 */
export default function Sprite(uri, srcX, srcY, frameW, frameH) {
	this.image = new Image()
	this.image.src = uri
	this.srcX = srcX,
	this.srcY = srcY,
	this.frameW = frameW,
	this.frameH = frameH
}

/**
 * Render sprite
 * @param (object) ctx - 2D canvas context to render sprite
 * @param (number) destX - X coordinate where to render the sprite
 * @param (number) destY - Y coordinate where to render the sprite
 * @param (number) [destW = frameW] - Width of rendered image
 * @param (number) [destH = frameH] - Height of rendered image
 */
Sprite.prototype.render = function (ctx, destX, destY, destW, destH) {
	ctx.drawImage(
		this.image,
		this.srcX * this.frameW, this.srcY * this.frameH, this.frameW, this.frameH,
		destX, destY, destW || this.frameW, destH || this.frameH
	)
}

/**
 * Animate sprite by switching frames to show
 * @param (object[]) frames - frames in the order in which they are to be displayed 
 * @param (number) frames.srcX - X position(index) of sprite in spritesheet
 * @param (number) frames.srcY - Y position(index) of sprite in spritesheet
 */
// frames is array of objects with properties srcx, srcy
Sprite.prototype.animate = function(frames) {
	frames.forEach(frame => {
		this.srcX = frame.srcX
		this.srcY = frame.srcY
	})
}