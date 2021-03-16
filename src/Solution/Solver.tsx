import * as React from 'react';
import Game from '../interfaces/Game';

export interface SolverProps {
	game: Game;
}
 
export interface SolverState {
	solution: Game;
}
 
class Solver extends React.Component<SolverProps, SolverState> {
	constructor(props: SolverProps) {
		super(props);
		this.state = { 
			solution:  props.game
		};
		this.solve = this.solve.bind(this);
	}

	solve() {
		if(this.props.game.players.length < 2) {
			return;
		}
		let workingSolution: Game = {
			players: [...this.props.game.players],
			payoffs: [...this.props.game.payoffs]
		};
		let log: string[] = [];
		
		// check player 0 for IDSDS

		let movesToDelete: string[] = [];
		//For each player move (a, b, c, d)
		for(let x = 0; x < workingSolution.payoffs.length; x++) {
		//For each other Player move (a, b, c d) -> check if that move strictly dominates x
			for(let i = 0; i < workingSolution.payoffs.length; i++) {
				if(i === x) { // no need to check against itself
					continue;
				}
				let isStrictlyDominated = true;
				// For each player2 response (w, x, y, z)
				for(let j = 0; j < workingSolution.payoffs[i].length; j++) {
					if(workingSolution.payoffs[x][j][0] >= workingSolution.payoffs[i][j][0]) {
						isStrictlyDominated = false;
						break;
					}
				}
				if(isStrictlyDominated) {
					log.push(`${workingSolution.players[0].name}'s move '${workingSolution.players[0].moveNames[x]}' is strictly dominated by their move '${workingSolution.players[0].moveNames[i]}'`);
					movesToDelete.push(workingSolution.players[0].moveNames[x]);
					break;
				}
			}
		}
		movesToDelete.forEach(moveToDelete => {
			const index = workingSolution.players[0].moveNames.indexOf(moveToDelete);
			workingSolution.payoffs.splice(index, 1);
			workingSolution.players[0].moveNames.splice(index, 1);
		});

		/*

		// check player 2 for IDSDS
		movesToDelete = [];
		//For each player move (w, x, z, y)
		for(let x = 0; x < workingSolution.players[1].moveNames.length; x++) {
			//For each other Player move (w, x, z, y) -> check if that move strictly dominates x
			for(let i = 0; i < workingSolution.players[1].moveNames.length; i++) {
				if(i === x) { // no need to check against itself
					continue;
				}
				let isStrictlyDominated = true;
				// For each player1 response (a, b, c, d)
				for(let j = 0; j < workingSolution.payoffs.length; j++) {
					if(workingSolution.payoffs[j][x][1] >= workingSolution.payoffs[j][i][1]) {
						isStrictlyDominated = false;
						break;
					}
				}
				if(isStrictlyDominated) {
					log.push(`${workingSolution.players[1].name}'s move '${workingSolution.players[1].moveNames[x]}' is strictly dominated by their move '${workingSolution.players[1].moveNames[i]}'`);
					movesToDelete.push(workingSolution.players[1].moveNames[x]);
					break;
				}
			}
		}

		movesToDelete.forEach(moveToDelete => {
			const index = workingSolution.players[1].moveNames.indexOf(moveToDelete);
			// workingSolution.payoffs.forEach(payOff => {
			// 	payOff.splice(index, 1);
			// });
			// workingSolution.players[1].moveNames.splice(index, 1);
		});

		*/

		return log;
	}

	render() { 
		return (
			<p>
				Solution: {JSON.stringify(this.solve())}
				From: {JSON.stringify(this.props.game)}
			</p>
		);
	}
}
 
export default Solver;