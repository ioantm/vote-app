import React, { PropTypes, Component } from 'react';
import Winner from './Winner';
import Vote from './Vote';

class Voting extends Component {
	render() {
		const { winner } = this.props;

		return (
			<div>
				{
					winner ?
						<Winner ref="winner" winner={winner}/> :
						<Vote {...this.props}/>
				}
			</div>
		)
	}
}

Voting.propTypes = {
	vote: PropTypes.func.isREquired,
	pair: PropTypes.array.isRequired,
	winner: React.PropTypes.string	
}

export default Voting;