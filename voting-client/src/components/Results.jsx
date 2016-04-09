import React, { Component } from 'react'
import Winner from './Winner'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export class Results extends Component {
	getVotes(entry) {
		const { tally } = this.props;

		if (tally && tally.has(entry)) {
			return tally.get(entry);
		}
		else {
			return 0;
		}
	}
	render() {
		const { pair, next, winner } = this.props;

		return (
			winner ? <Winner ref="winner" winner={winner}/> :
			<div className="results">
				{ pair && pair.map(entry => 
					<div className="entry" key={entry}>
						<h1>{entry}</h1>
						<div>{this.getVotes(entry)}</div>
					</div>
					) }
				<div className="management">
					<button className="next" 
							ref="nextButton"
							onClick={next}>Next</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		pair: state.getIn(['vote', 'pair']),
		tally: state.getIn(['vote', 'tally']),
		winner: state.get('winner')
	}
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
