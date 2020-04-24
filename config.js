export default  {
	board: {
		sprite: {
			uri: "./assets/tiles/100x100/tiles_named_by_description/grass_biome/dirt-dual_grass_edges-bottom_end.png",
			srcX: 0,
			srcY: 0,
			frameW: 32,
			frameH: 32
		},
		sizeX: 8,
		sizeY: 8
	},
	players: [{
		sprite: {}
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
