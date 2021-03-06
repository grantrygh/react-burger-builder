import React, { Component } from 'react'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get('/ingredients.json')
			.then( response => {
				console.log(response)
				this.setState({ ingredients: response.data })
			})
			.catch( error => {
				this.setState({ error: true })
			})
	}

	updatePurchasableState = (ingredients) => {
		const sum = Object.keys(ingredients).map( igKey => ingredients[igKey] ).reduce( (accumulator, currentValue) => accumulator + currentValue, 0 )
		this.setState({purchasable: sum > 0})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchasableState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if ( oldCount <= 0 ){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchasableState(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	cancelPurchaseHandler = () => {
		this.setState({purchasing: false})
	}

	continuePurchaseHandler = () => {
		this.setState({ loading: true })
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Grant Rygh',
				address: {
					street: 'Test Street 1',
					zipCode: '12345',
					country: 'United States'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then( response => {
				this.setState({ loading: false, purchasing: false })
			})
			.catch( error => {
				this.setState({ loading: false, purchasing: false })
			})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

		if (this.state.ingredients){
			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler} 
						disabled={disabledInfo} 
						ordered={this.purchaseHandler}
						purchasable={this.state.purchasable}
						price={this.state.totalPrice} />
				</React.Fragment>
			);
			orderSummary = <OrderSummary 
							ingredients={this.state.ingredients} 
							price={this.state.totalPrice}
							cancel={this.cancelPurchaseHandler} 
							continue={this.continuePurchaseHandler}/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		// disabledInfo : {'salad': true, 'bacon': false, ... }
		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
					{orderSummary}
				</Modal>
				{ burger }
			</React.Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios)