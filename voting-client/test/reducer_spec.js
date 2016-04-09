import { expect } from 'chai'
import { Map, List, fromJS } from 'immutable'
import reducer from '../src/reducer'

describe('reducer', () => {
	it('handle  SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 1
					})
				})
			})
		}
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		}));
	})

	it('handle SET_STATE with plain js data', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 days later'],
					tally: {
						'Trainspotting': 1
					}
				}
			}
		}

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		}));
	})

	it('handle SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 1
					})
				})
			})
		}
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		}));
	})

	it('handle VOTE action setting hasVoted', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		});

		const action = {
			type: 'VOTE',
			entry: 'Trainspotting'
		}

		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			},
			hasVoted: 'Trainspotting'
		}))
	})

	it('handle VOTE action setting hasVoted only if voted entry is currently under vote', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		});

		const action = {
			type: 'VOTE',
			entry: 'Sunshine'
		}

		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			}
		}))
	})

	it('remove hasVoted if SET_STATE update with a new pair of voting entries', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 1
				}
			},
			hasVoted: 'Trainspotting'
		})

		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Sunshine', 'Slumdog Millionare']
				}
			}
		};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Sunshine', 'Slumdog Millionare']
			}
		}))
	})
})