import Game from "./game.js"
import onKey from './node_modules/keymaster/keymaster.js'

let game = new Game()
const canvasWidth = 600, canvasHeight = 600
var canvas = document.querySelector('#primaryCanvas')
canvas.width = canvasWidth
canvas.height = canvasHeight
let ctx = canvas.getContext('2d')

// setTimeout(() => game.isGameOver = true, 5000)
// while(!game.isGameOver) {
let interval = setInterval(() => {
	window.requestAnimationFrame(function () {
		console.log("Running game")
		ctx.clearRect(0, 0, canvasWidth, canvasHeight)
		game.render(ctx)
	})
}, 1000/16);
// }

onKey('ctrl+c', () => clearInterval(interval)) 