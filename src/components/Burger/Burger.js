import React from 'react'

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngredient'

const burger = (props) => {
	// Extract each ingredient .. for eg : Bacon, cheese, salad
	const transformedIngredients = Object.keys(
		props.ingredients).map(igKey => {
			//make an array of length same as qty of ingredient(igKey)
			// eg: Bacon : 2, cheese : 1, salad : 1  (respectively undefined arrays [,], [], [])
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			//For each element in array of undefined elements([,])
			//with length same as of no. of ingredients add the JSX to render
			return <BurgerIngredient key={igKey + i} type={igKey} />
		})
	})
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default burger;