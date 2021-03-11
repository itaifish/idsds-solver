export default interface Game {
	players: {
		name: string,
		moveNames: string[]
	}[],
	payoffs: (number /*| Array<number>*/)[][][]
}