import * as React from 'react';
import { Button, Container } from 'react-bootstrap';
import AddPlayer from '../AddPlayer/AddPlayer';
import Game from "../interfaces/Game";
import PlayerTable from '../PlayerTable/PlayerTable';

export interface StateManagerProps {
	
}
 
export interface StateManagerState {
	game: Game | null,
	addingPlayer: boolean,
}
 
class StateManager extends React.Component<StateManagerProps, StateManagerState> {
	constructor(props: StateManagerProps) {
		super(props);
		this.state = { 
			game: null, 
			addingPlayer: false 
		};
		this.addPlayer = this.addPlayer.bind(this);
		this.switchPlayerOrder = this.switchPlayerOrder.bind(this);
		this.updatePayoff = this.updatePayoff.bind(this);
	}

	updatePayoff(payoffCoords: [number, number, number], newValue: number) {
		this.setState((prevState) => {
			if(prevState.game != null) {
				const newPayoffs = [...prevState.game.payoffs];
				newPayoffs[payoffCoords[0]][payoffCoords[1]][payoffCoords[2]] = newValue;
				return {
					game: {
						players: prevState.game.players,
						payoffs: newPayoffs
					}
				}
			} else {
				return {
					game: prevState.game
				};
			}
		});
	}

	addPlayer(playerName: string, playerMoveNames: string[]) {
		this.setState((prevState) => {
			const player = {
				name: playerName,
				moveNames: playerMoveNames
			};
			const newPlayers = (prevState.game === null) ? [player] : [player, ...prevState.game.players];
			const newPayoffs: number[][][] = [];
			newPlayers[0].moveNames.forEach((p1Move, p1Index) => {
				if(newPlayers.length === 1) {
					newPayoffs.push([[0]]);
				} else {
					newPayoffs.push([]);
					newPlayers[1].moveNames.forEach((p2Move, p2Index) => {
						newPayoffs[p1Index].push([0, 0])
					});
				}
			});
			return {
				game: {
					players: newPlayers,
					payoffs: newPayoffs
				},
				addingPlayer: false
			};
			
			
		});
	}

	switchPlayerOrder() {
		if(this.state.game && this.state.game.players.length >= 2) {
			const newPlayers = [...this.state.game.players];
			let removingVal = newPlayers[1];
			newPlayers.splice(1, 1);
			this.setState({
				game: {
					players: newPlayers,
					payoffs: []
				}
			});
			this.addPlayer(removingVal.name, removingVal.moveNames);
		}
	}

	render() { 
		return (
		<Container>
			{this.state.game ? <PlayerTable game={this.state.game} updateMoveValuesFunc={this.updatePayoff}></PlayerTable> : <></>}
			{ this.state.addingPlayer ? 
				<AddPlayer addPlayerFunc={this.addPlayer} gameState={this.state.game} keyId={1}></AddPlayer>
				:
				<Button onClick={() => {this.setState({addingPlayer: true})}}>Add Player</Button>
			}
			<Button variant="warning" onClick={this.switchPlayerOrder}>Switch Player Order 🔁</Button>
		</Container>
		);
	}
}
 
export default StateManager;