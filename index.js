import Game from "./game.js"
import onKey from './node_modules/keymaster/keymaster.js'
import config from './config.js'

let canvas = document.querySelector('#primaryCanvas')


let {frameW, frameH} = config.board.sprite
let {size} = config.board

canvas.width = size.width * frameW
canvas.height = size.height * frameH
let ctx = canvas.getContext('2d')

let game = new Game(2)

// setTimeout(() => game.isGameOver = true, 5000)
// while(!game.isGameOver) {
let interval = setInterval(() => {
	window.requestAnimationFrame(function () {
		console.log("Running game")
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.render(ctx)
	})
}, 1000/16);
// }

onKey('ctrl+c', () => clearInterval(interval)) 

// TODO: board shouldn't be exported from index, index should not be concerned with inner working of the game
let board = game.board
export {
	board
}