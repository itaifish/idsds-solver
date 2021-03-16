export default interface Game {
	players: {
		name: string,
		moveNames: string[]
	}[],
	payoffs: (number /*| Array<number>*/)[][][]
}

export const copyGame = (game: Game): Game => {
	let gameCopy: Game = {players:[], payoffs: []};
	game.players.forEach(player => {
		let playerCopy = {
			name: player.name,
			moveNames: [...player.moveNames]
		}
		gameCopy.players.push(playerCopy);
	});
	game.payoffs.forEach(payOff => {
		let payOffCopy: number[][] = [];
		payOff.forEach(values => {
			payOffCopy.push([...values]);
		});
		gameCopy.payoffs.push(payOffCopy);
	});
	return gameCopy;
}