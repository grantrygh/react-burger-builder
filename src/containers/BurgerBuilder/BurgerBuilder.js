import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			cheese: 0,
			meat: 0,
			bacon: 0,
			salad: 0
		}
	}

	render() {
		return (
			<React.Fragment>
				<Burger ingredients={this.state.ingredients} />
				<div>Build Controls</div>
			</React.Fragment>
		);
	}
}

export default BurgerBuilder