export default  {
	game: {
		maxMoves: 3
	},
	board: {
		sprite: {
			uri: "./assets/tiles/100x100/tiles_named_by_description/grass_biome/grass-no_edges.png",
			srcX: 0,
			srcY: 0,
			frameW: 32,
			frameH: 32
		},
		size: {
			width: 8,
			height: 8
		}
	},
	players: [{
		sprite: {}
	}],
	obstacles: [{
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 2,
			srcY: 4,
			frameW: 32,
			frameH: 32,
		}
	}, {
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 3,
			srcY: 4,
			frameW: 32,
			frameH: 32,
		}
	}, {
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 4,
			srcY: 4,
			frameW: 32,
			frameH: 32,
		}
	}],
	weapons: [{
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 1,
			srcY: 5,
			frameW: 32,
			frameH: 32,
		},
		damage: 10,
		offset: {
			x: 8,
			y: -2
		}
	}, {
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 5,
			srcY: 5,
			frameW: 32,
			frameH: 32,
		},
		damage: 8,
		offset: {
			x: 8,
			y: -2
		}
	}, {
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 11,
			srcY: 5,
			frameW: 32,
			frameH: 32,
		},
		damage: 14,
		offset: {
			x: 8,
			y: -2
		}
	}, {
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 13,
			srcY: 5,
			frameW: 32,
			frameH: 32,
		},
		damage: 18,
		offset: {
			x: 8,
			y: -2
		}
	}],
	consumables: [{
		name: "Elixir",
		affectedAttribute: "hp",
		effect: 40,
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 0,
			srcY: 9,
			frameW: 32,
			frameH: 32,
		}
	}, {
		name: "Rock Armor Potion",
		affectedAttribute: "armor",
		effect: 0.25,
		sprite: {
			uri: "./assets/Shikashi's Fantasy Icons Pack/2 - Transparent & Drop Shadow.png",
			srcX: 3,
			srcY: 9,
			frameW: 32,
			frameH: 32,
		}
	}]
}
