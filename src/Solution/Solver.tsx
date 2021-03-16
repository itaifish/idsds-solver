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
	}
	render() { 
		return (
			<>
			</>
		);
	}
}
 
export default Solver;