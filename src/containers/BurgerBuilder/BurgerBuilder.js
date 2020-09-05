import React, { Component } from 'react'

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES ={
	salad: 0.5,
	cheese: 0.7,
	bacon: 1,
	meat: 1.3
}

class BurgerBuilder extends Component {
	// CAN USE A Constructor too
	// constructor(props) {
	//     super(props);
	//     this.state = {...}
	// }

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	}

	componentDidMount() {
		axios.get('https://react-burger-builder-fa4a0.firebaseio.com/ingredients.json')
			.then(res => {
				this.setState({ingredients: res.data})
			})
			.catch(err => {});
	}
	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients).map(
			igKey => {
				return ingredients[igKey];
			}
		).reduce((curr, prev) => {
			return curr + prev;
		}, 0);
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
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount >0 ? oldCount - 1 : 0;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler= () => {
		this.setState({purchasing: false});		
	}

	purchaseContinueHandler= () => {
		// alert('You Continue!');
		this.setState({loading: true})
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Dev Sharma',
				address: {
					street: 'Sun Pharma rd.',
					city: 'Vadodara',
					pincode: '390012'
				},
				email: 'dev@mail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios.post('/orders.json', order)
			.then(res => {
				this.setState({loading: false, purchasing: false})
			})
			.catch(err => {
				this.setState({loading: false, purchasing: false})
			});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = <Spinner />;

		if(this.state.ingredients) {

			orderSummary = <OrderSummary 
			price={this.state.totalPrice}
			ingredients={this.state.ingredients}
			purchaseCancelled={this.purchaseCancelHandler}
			purchaseContinued={this.purchaseContinueHandler}/>;

			burger = (
				<Auxilliary>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}/>
				</Auxilliary>);
		}

		if( this.state.loading ) {
			orderSummary = <Spinner />
		}

		return (
			<Auxilliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxilliary> 
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios);