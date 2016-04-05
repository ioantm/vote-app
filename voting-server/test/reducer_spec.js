import { Map, fromJS } from 'immutable'
import { expect } from 'chai'
import reducer from '../src/reducer'
import { SET_ENTRIES, NEXT, VOTE } from '../src/reducer'

describe('reducer', () => {
	it('handle SET_ENTRIES', () =>{
		const state = Map();
		const action = {
			type: 'SET_ENTRIES',
			entries: ['Transpotting', '28 days later']
		};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Transpotting', '28 days later']
		}))
	})

	it('handle NEXT action', () => {
		const state = fromJS({
			entries: ['Transpotting', '28 days later']
		})
		const action = {
			type: NEXT
		};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Transpotting', '28 days later']
			},
			entries: []
		}))

	})

	it('handle VOTE action', () => {
		const state = fromJS({
			vote: {
				pair: ['Transpotting', '28 days later']
			},
			entries: []
		})
		const action = {
			type: VOTE,
			entry: 'Transpotting'
		}
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Transpotting', '28 days later'],
				tally: {
					'Transpotting': 1
				}
			},
			entries: []
		}))
	})

	it('has initial state', () => {
		const action = {
			type: SET_ENTRIES,
			entries: ['Transpotting']
		}

		const nextState = fromJS({
			entries: ['Transpotting']
		})

		expect(reducer(undefined, action)).to.equal(nextState)
	})
})