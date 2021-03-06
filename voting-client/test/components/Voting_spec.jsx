import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate,
	findRenderedComponentWithType
} from 'react-addons-test-utils'
import { Voting } from '../../src/components/Voting'
import Winner from '../../src/components/Winner'
import { List } from 'immutable'

describe('Voting', () => {
	it('render a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 days later']} />
		)

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Trainspotting');
		expect(buttons[1].textContent).to.equal('28 days later');
	})

	it('invoke callback when a button is clicked', () => {

		let votedItem;
		const vote = (item) => votedItem = item;
		const component = renderIntoDocument(
			<Voting 
				pair={['Trainspotting', '28 days later']}
				vote={vote}/>
		);

		const button  = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		Simulate.click(button);

		expect(votedItem).to.equal('Trainspotting');
	})

	it('disable buttons when user has voted', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 days later']} hasVoted='Trainspotting'/>
		)
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	})

	it('it add Voted label to voted entry', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 days later']} hasVoted='Trainspotting'/>
		)
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	})

	it('display winner component when is a winner', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 days later']} winner="Trainspotting"/>
		)
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winnerInstance = ReactDOM.findDOMNode(component.refs.winner);
		expect(winnerInstance).to.be.ok;
		expect(winnerInstance.textContent).to.contain('Trainspotting');

	})

	it('render a pure component', () => {
		const container = document.createElement('div')
		const pair = ['Trainspotting', '28 days later']

		let component = ReactDOM.render(
			<Voting pair={pair}/>,
			container
		)

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Green mile';

		component = ReactDOM.render(
			<Voting pair={pair}/>,
			container
		)

		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');
	})

	it('update DOM when prop changes', () => {
		const container = document.createElement('div')
		const pair = List.of('Trainspotting', '28 days later');

		let component = ReactDOM.render(
			<Voting pair={pair}/>,
			container
		)

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

		expect(firstButton.textContent).to.equal('Trainspotting');

		const newPair = pair.set(0, "Green mile");

		component = ReactDOM.render(
			<Voting pair={newPair}/>,
			container
		)

		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Green mile');
	});
});