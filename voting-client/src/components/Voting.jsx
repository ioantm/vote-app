import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
import Winner from './Winner';
import Vote from './Vote';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export class Voting extends Component {

	constructor(props) {
		super(props);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { winner } = this.props;
		console.log(this.props.pair);
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
	pair: PropTypes.object.isRequired,
	winner: React.PropTypes.string	
}

const mapStateToProps = (state) => {
	return {
		pair: state.getIn(['vote', 'pair']),
		winner: state.get('winner'),
		hasVoted: state.get('hasVoted')
	}
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);