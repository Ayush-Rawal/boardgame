import Game from "./game.js"
import onKey from './node_modules/keymaster/keymaster.js'
import config from './config.js'

let canvas = document.querySelector('#primaryCanvas')

let {sizeX, sizeY} = config.board
let {frameW, frameH} = config.board.sprite

canvas.width = sizeX * frameW
canvas.height = sizeY * frameH
let ctx = canvas.getContext('2d')

let game = new Game(sizeX, sizeY, 2)

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
