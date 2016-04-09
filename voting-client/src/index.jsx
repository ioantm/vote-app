import React from 'react'
import ReactDOM from 'react-dom'
import { VotingContainer } from './components/Voting'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'
import { ResultsContainer } from './components/Results'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import { setState } from './action_creators'
import remoteActionMiddleware from './remote_action_middleware'

const pair = ['Trainspotting', '28 days later'];
const routes = (
	<Route component={App}>
		<Route path='/' component={VotingContainer}/>
		<Route path='/results' component={ResultsContainer}/>
	</Route>
)

const url = `${location.protocol}//${location.hostname}:8090`;
const socket = io(url);

socket.on('state', (state) => 
	store.dispatch(setState(state))
);

const crateStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = crateStoreWithMiddleware(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
)