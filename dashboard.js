import './node_modules/jquery/dist/jquery.js'

const $renderOnce = $("<section></section")
const $renderContinouos = $("<section></section")
$("#buttonContainer").append($renderOnce)
$("#dataContainer").append($renderContinouos)

/**
 * Initialize the dashboard and render "to-be-rendered-once" data
 * @constructor
 * @param {Player[]} players 
 * @param {function} changeTurn - function to change turn
 * @param {function} defend - Actionhandler defence function
 */
export default function Dashboard (players, changeTurn, defend) {
	this.players = players
	this.changeTurn = changeTurn
	this.defend = defend
	
	$renderOnce.append(this.displayButtons())
}

/**
 * Render data that is updated throughout the game
 * @param {number} turn - index of player with turn
 * @param {boolean} isInBattlePhase - whether game is in battle phase
 */
Dashboard.prototype.render = function (turn, isInBattlePhase) {
	this.turn = turn

	if(isInBattlePhase) {
		$("#defend").attr('disabled', false)
	}
	
	$renderContinouos.html("")
	$renderContinouos.append(this.displayTurn())
	$renderContinouos.append(this.displayPlayerData())
}

Dashboard.prototype.displayPlayerData = function () {
	let $playerDisplay = $("<section id='playerDisplay'></section>")
	this.players.forEach(player => {
		let $player = $("<div class='player'></div>").css({
			"flex": "1"
		})
		$playerDisplay.append($player)
		$player.html(`
		<h3>${player.name}</h3>
		<p>HP: ${player.hp}/${player.maxHP}</p>
		<p>Position: ${JSON.stringify(player.pos)}</p>
		<p>Damage: ${player.weapon.damage}</p>
		<p>Armor: ${player.armor}</p>
		`)
	})
	return $playerDisplay
}

Dashboard.prototype.displayTurn = function () {
	let $turnDisplay = $("<section id='turnDisplay'></section>")
	$turnDisplay.append($(`<p>Turn: ${this.players[this.turn].name}</p>`))
	return $turnDisplay
}

Dashboard.prototype.displayButtons = function() {
	let $buttonContainer = $("<section id='controls'></section>")
	let $changeTurnButton = $("<button id='endTurn'>End Turn</button>").on('click', this.changeTurn)
	let $defendButton = $(`<button id='defend' disabled>Defend</button>`).on('click', this.defend)
	$buttonContainer.append($changeTurnButton)
	$buttonContainer.append($defendButton)
	return $buttonContainer
}
