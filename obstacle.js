import config from "./config.js"
import Sprite from "./sprite.js"

export default function Obstacle(index) {
	let obstacle = config.obstacles[index]
	let sprite = obstacle.sprite
	let obstacleSprite = new Sprite(sprite.uri, sprite.srcX, sprite.srcY, sprite.frameW, sprite.frameH)
	this.sprite = obstacleSprite
}

Obstacle.prototype.render = function (ctx, dest, destW, destH) {
	this.sprite.render(ctx, dest.x, dest.y, destW, destH)
}