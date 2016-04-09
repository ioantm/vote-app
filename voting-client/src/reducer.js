import { Map } from 'immutable'

function vote(state, entry){
	const pair = state.getIn(['vote', 'pair']);

	if (pair && pair.includes(entry))
	{
		return state.set('hasVoted', entry);
	}
	else {
		return state;
	}
}

function resetVote(state) {
	const {
		hasVoted,
		vote: { pair }
	} = state.toJS();

	if (hasVoted && pair.indexOf(hasVoted) === -1)
		return state.remove('hasVoted');

	return state;
}

export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'SET_STATE': 
			return resetVote(state.merge(action.state));
		case 'VOTE':
			return vote(state, action.entry);
		default:
			return state;
	}
}