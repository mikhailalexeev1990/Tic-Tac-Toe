<template>
	<div>
		<div>
			<button @click="restartGame" type="button" class="btn btn-info">Restart game</button>
			<br>
			<br>
			<div v-if="winner">
				<h1>{{getWinnerName()}} has won!</h1>
			</div>
			<div class="game-container" v-for="(field, i) in fields">
				<div @click="choseField({
                            'raw': i,
                            'rawField': j,
                        })" class="game-raw"
				     v-for="(item, j) in field"
				>
					{{drawPlayerField(item.player)}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Game",
		data() {
			return {
				winner: null,
				fields: [
					[
						{selected: false, player: null},
						{selected: false, player: null},
						{selected: false, player: null},
					],
					[
						{selected: false, player: null},
						{selected: false, player: null},
						{selected: false, player: null},
					],
					[
						{selected: false, player: null},
						{selected: false, player: null},
						{selected: false, player: null},
					],
				],
				fieldsOld: [],
			}
		},
		watch: {
			fields: {
				handler(val, oldVal) {
					this.checkWinner();
				},
				deep: true
			}
		},
		created() {
			this.fieldsOld = JSON.parse(JSON.stringify(this.fields));
		},
		methods: {
			restartGame() {
				this.fields = JSON.parse(JSON.stringify(this.fieldsOld));
				this.winner = null;
			},
			choseField(position) {
				if (this.winner) {
					return true;
				}

				let {raw, rawField} = {...position};
				let field = this.fields[raw][rawField];

				if (!field.selected) {
					field.selected = true;
					field.player = 1;
					if (this.checkWinner()) {
						return true;
					}
					this.computerChoose();
				}
			},
			computerChoose() {
				let positions = this.getEmptyPositions();
				if (!positions.length) {
					return true;
				}
				let [raw, rawField] = [...positions[Math.floor(Math.random() * positions.length)]];
				let field = this.fields[raw][rawField];
				field.selected = true;
				field.player = 2;
			},
			getEmptyFields() {
				return this.fields.map(i => i.filter(j => j.selected == false));
			},
			getFullFields() {
				return this.fields.map(i => i.filter(j => j.selected == true));
			},
			getEmptyPositions() {
				let positions = [];
				this.fields.forEach((item, i) => {
					this.fields[i].forEach((itemSecond, j) => {
						if (itemSecond.selected === false) {
							positions.push([i, j]);
						}
					});
				});

				return positions;
			},
			getWinnerName() {
				if (this.winner === 1) {
					return 'Player';
				} else if (this.winner === 2) {
					return 'Computer';
				} else {
					return 'No One';
				}
			},
			drawPlayerField(player) {
				if (player === 1) {
					return 'X';
				} else if (player === 2) {
					return 'O'
				} else {
					return '';
				}
			},
			checkWinner() {
				if (!this.winner) {
					this.checkLine();
				}
				if (!this.winner) {
					this.checkColumn();
				}
				if (!this.winner) {
					this.checkDiagonals();
				}
				if (!this.winner && !this.getEmptyFields().filter(i => i.length).length) {
					this.winner = 3;
				}

				return !!this.winner;
			},
			setWinner(player) {
				this.winner = player;
			},
			checkLine() {
				this.fields.forEach((item, i) => {
					let player = this.fields[i][0].player;
					if (player && item.filter(j => j.player !== player).length === 0) {
						this.setWinner(player);
					}
				});
			},
			checkColumn() {
				let firstField = this.fields[0];
				firstField.forEach((item, i) => {
					let player = firstField[i].player;
					if (player && this.fields.filter(j => j[i].player !== player).length === 0) {
						this.setWinner(player);
					}
				});
			},
			checkDiagonals() {
				let playerLeft = this.fields[0][0].player;
				let playerRight = this.fields[0][this.fields.length - 1].player;

				let playersLeft = [];
				let playersRight = [];

				this.fields.forEach((item, i) => {
					playersLeft.push(this.fields[i][i].player);
					playersRight.push(this.fields[i][(this.fields.length - 1) - i].player);
				});

				if (playerLeft && playersLeft.every(i => i == playerLeft)) {
					this.setWinner(playerLeft);
					return true;
				}
				if (playerRight && playersRight.every(i => i == playerRight)) {
					this.setWinner(playerRight);
					return true;
				}
			},
		},
	}
</script>
