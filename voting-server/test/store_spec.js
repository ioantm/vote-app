import { expect } from 'chai'
import makeStore from '../src/store'
import { SET_ENTRIES } from '../src/reducer'
import { fromJS, Map } from 'immutable'

describe('store', () => {
	it('is a Reux store configured with correct reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		const action = {
			type: SET_ENTRIES,
			entries: ['Transpotting', '28 days later']
		}

		store.dispatch(action);

		expect(store.getState()).to.equal(fromJS({
			entries: ['Transpotting', '28 days later']
		}));
	})
})
