import React, { PropTypes, Component } from 'react';

class Vote extends Component {
	isDisabled() {
		const { hasVoted } = this.props;

		return !!hasVoted;
	}

	render() {
		const { pair, vote, hasVoted } = this.props;

		return (
			<div className="voting">
				{pair.map((entry) => 
					(<button key={entry}
							disabled={this.isDisabled()}
							onClick={() => vote(entry)}>
						<h1>{entry}
							{
								hasVoted === entry ? 
									<div className="label">Voted</div> :
									null
							}
						</h1>
					</button>)
				)}
			</div>
		)
	}
}

Vote.propTypes = {
	vote: PropTypes.func.isREquired,
	pair: PropTypes.array.isRequired
}

export default Vote;