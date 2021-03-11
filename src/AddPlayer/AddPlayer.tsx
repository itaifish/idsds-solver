import * as React from 'react';
import { Button, Col, FormControl, InputGroup } from 'react-bootstrap';
import Game from "../interfaces/Game";

export interface AddPlayerProps {
	addPlayerFunc: (playerName: string, playerMoveNames: string[]) => void,
	gameState: Game | null,
	keyId: number
}
 
export interface AddPlayerState {
	playerName: string,
	playerMoveNames: string[],
}
 
class AddPlayer extends React.Component<AddPlayerProps, AddPlayerState> {
	constructor(props: AddPlayerProps) {
		super(props);
		this.state = { 
			playerName: "player1",
			playerMoveNames: ["move1"]  
		};
	}

	render() {
		const playerMoves: JSX.Element[] = [];
		for(let moveIdx = 0; moveIdx < this.state.playerMoveNames.length; moveIdx++) {
			const moveIndex: number = +moveIdx;
			playerMoves.push(
				<div key={moveIndex}>
					<InputGroup>
					<FormControl
						placeholder="Move Name"
						aria-label="MoveName"
						aria-describedby="basic-addon1"
						value={this.state.playerMoveNames[moveIdx]}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							this.setState((prevState) => {
								const newMoveList = [...prevState.playerMoveNames];
								newMoveList[moveIdx] = event.target.value;
								return {
									playerMoveNames: newMoveList
								}
							});
						}}
					/>
					</InputGroup>
				</div>
			);
		}
		return (
			<>
			<Col xs={8}>
				<InputGroup className={`AddPlayer${this.props.keyId}`}>
					<InputGroup.Prepend>
      					<InputGroup.Text id={`player-name${this.props.keyId}`}>Player Name and Number of Moves</InputGroup.Text>
    				</InputGroup.Prepend>
					
					<FormControl
						placeholder="Player Name"
						aria-label="PlayerName"
						aria-describedby="basic-addon1"
						value={this.state.playerName}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							this.setState({playerName: event.target.value});
						}}
					/>
					<FormControl onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						let num = +(event.target.value);
						if(!isNaN(num)) {
							this.setState((prevState) => {
								let playerMovesNew: string[] = [...prevState.playerMoveNames];
								playerMovesNew.length = num;
								return {
									playerMoveNames: playerMovesNew,
								}
							});
						}
					}}
						placeholder="Number of Moves"
						aria-label="Number of Moves"
						aria-describedby="basic-addon1"
						value={this.state.playerMoveNames.length}
					/>
				</InputGroup>
				{playerMoves}
			</Col>
			<Col>
				<Button onClick={() => {this.props.addPlayerFunc(this.state.playerName, this.state.playerMoveNames)}}> Save </Button>
			</Col>
			</>
		);
	}
}
 
export default AddPlayer;