import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

	// Object.keys(props.ingredients) creates an array of the ingredient strings ['cheese','meat',etc]
	// We are then going through each item, to be assigned as igKey
	const transformedIngredients = Object.keys( props.ingredients ).map( igKey => {
			// Creates an array of for each igKey, with the length = how many types of that ingredient there are
			// Since prop.ingredients[igKey] gives the numerical value of each ingredient in the state
			// The content is blank for now, as the length is the important part
			return [...Array( props.ingredients[igKey] )].map( (_,i) => {
				// For each space in the array, create a new BurgerIngredient, with its own key starting at 1
				return <BurgerIngredient key={igKey + i} type={igKey} />
			})
		}).reduce( (arr, el) => {
			return arr.concat(el)
		}, []);
		console.log(transformedIngredients)

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger