import * as React from 'react';
import { Table, FormControl, InputGroup } from 'react-bootstrap';

import Game from "../interfaces/Game";

export interface PlayerTableProps {
	game: Game,
	updateMoveValuesFunc: (payoffCoords: [number, number, number], newValue: number) => void
}
 
export interface PlayerTableState {
	
}
 
class PlayerTable extends React.Component<PlayerTableProps, PlayerTableState> {
	constructor(props: PlayerTableProps) {
		super(props);
		this.state = {};
	}

	build2DTable(): JSX.Element {
		const playerTable: JSX.Element[] = [];
		const players = this.props.game.players; 
		if(players[0]) {
			// const headerMoves: JSX.Element[] = [<th key={-1}>{players[0].name}{" ↓"} <br></br> {players.length > 1 ? players[1].name + " →" : ""}</th>];
			// players[0].moveNames.forEach((move, index) => {
			// 	headerMoves.push(
			// 		<th key={index}>{move}</th>
			// 	);
			// });
			// playerTable.push(<> 
			// 	<thead key={1}>
			// 		<tr>{headerMoves}</tr>
			// 	</thead>
			// </>);
		}
		if(players[1]) {
			const headerMoves: JSX.Element[] = [<th key={-1}>{players[0].name}{" ↓"} <br></br> {players.length > 1 ? players[1].name + " →" : ""}</th>];
			players[1].moveNames.forEach((move, index) => {
				headerMoves.push(
					<th key={index}>{move}</th>
				);
			});
			playerTable.push(<> 
				<thead key={1}>
					<tr>{headerMoves}</tr>
				</thead>
			</>);
			const rows: JSX.Element[] = [];
			players[0].moveNames.forEach((moveP1, indexP1) => {
				const rowCols: JSX.Element[] = [<td key={-1}>{moveP1}</td>];
				players[1].moveNames.forEach((moveP2, indexP2) => {
					rowCols.push(<>
					<td key={indexP1}>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>{players[0].name} / {players[1].name}</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								placeholder={`${players[0].name} Payoff`}
								value={this.props.game.payoffs[indexP1][indexP2][0]}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const parsedResult = +(event.target.value);
									if(!isNaN(parsedResult)) {
										this.props.updateMoveValuesFunc([indexP1, indexP2, 0], parsedResult);
									}
								}}
							/>
							<FormControl
								placeholder={`${players[1].name} Payoff`}
								value={this.props.game.payoffs[indexP1][indexP2][1]}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const parsedResult = +(event.target.value);
									if(!isNaN(parsedResult)) {
										this.props.updateMoveValuesFunc([indexP1, indexP2, 1], parsedResult);
									}
								}}
							/>
						</InputGroup>
					</td>
				</>);
				})
				rows.push(<>
					<tr key={indexP1}>
						{rowCols}
					</tr>
				</>);
			});
			playerTable.push(<>
				<tbody key={1}>
					{rows}
				</tbody>
			</>);
		}

		return (<> {playerTable} </>);
	}

	render() {
		const playerTable = this.build2DTable();
		return (
			<>
				<Table striped bordered hover variant="dark">
					{playerTable}
				</Table>
			</>
		);
	}
}
 
export default PlayerTable;