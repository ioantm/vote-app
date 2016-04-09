import React from 'react'
import ReactDOM  from 'react-dom'
import { expect } from 'chai'
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils'
import { List, Map } from 'immutable'
import { Results } from '../../src/components/Results'

describe('Results', () => {
	it('render entries with vote counts or 0', () => {
		let nextCalled = false;
		const next = () => nextCalled = true;
		const pair = List.of('Transpotting', '28 days later')
		const tally = Map({ 'Transpotting': 4 })
		const component = renderIntoDocument(<Results pair={pair} tally={tally} next={next}/>)

		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [first, second] = entries.map(entry=>entry.textContent);
		const nextButton = ReactDOM.findDOMNode(component.refs.nextButton);

		Simulate.click(nextButton);
		expect(nextCalled).to.equal(true);
		expect(entries.length).to.equal(2);
		expect(first).to.contain('Transpotting')
		expect(second).to.contain('28 days later')
		expect(first).to.contain('4')
		expect(second).to.contain('0')
	})

	it('render winner component if there is a winner', () => {
		const pair = List.of('Transpotting', '28 days later')
		const component = renderIntoDocument(<Results pair={pair} winner="Transpotting"/>)

		const winnerDOMNode = ReactDOM.findDOMNode(component.refs.winner);

		expect(winnerDOMNode).to.be.ok;
		expect(winnerDOMNode.textContent).to.contain('Transpotting');
	})
})