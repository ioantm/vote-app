import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Vote extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	isDisabled() {
		const { hasVoted } = this.props;

		return !!hasVoted;
	}

	render() {
		const { pair, vote, hasVoted } = this.props;

		return (
			<div className="voting">
				{pair && pair.map((entry) => 
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