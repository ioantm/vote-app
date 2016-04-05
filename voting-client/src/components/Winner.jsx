import React, { Component, PropTypes } from 'react'

class Winner extends Component {
	render() {
		const { winner } = this.props;

		return <div>Winner is {winner}</div>
	}
}

export default Winner;