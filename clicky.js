import config from './config.js'

// Can't import canvas from index, error - can't access variable before intialization?
let canvas = document.querySelector('canvas')

let tileHeight = config.board.sprite.frameH
let tileWidth = config.board.sprite.frameW

// TODO: Wrap into a singleton for cleaner code and eliminating global var clickys

let clickys = []

/**
 * Responds to click on canvas and calls appropriate handler for tile/region clicked
 * @param {object} event event object 
 */
function clickHandler(event) {
	let clickX = event.pageX - canvas.offsetLeft
	let clickY = event.pageY - canvas.offsetTop
	clickys.forEach((tile) => {
		let x = tile.pos.x * tileWidth
		let y = tile.pos.y * tileHeight
		if(clickY > y && clickY < y + tileHeight && clickX > x && clickX < x + tileWidth) {
			tile.callback({x: clickX - x, y: clickY - y}) // pass click position relative to the element
		}
	})
}

canvas.addEventListener('click', clickHandler)

/**
 * 
 * @param {object} pos - position of tile (in tile indexes) to attach click event to
 * @param {*} callback - function to call on click
 * @param {number} pos.x - x coordinate of position
 * @param {number} pos.y - y coordinate of position
 */
function onClick(pos, callback) {
	clickys.push({
		pos,
		callback
	})
}

function removeListener (pos) {
	clickys = clickys.filter(el => el.pos.x !== pos.x && el.pos.y !== pos.y)
}

export {
	onClick,
	removeListener
}