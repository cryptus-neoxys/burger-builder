import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let key in props.ingredients) {
        ingredients.push({name: key, amt: props.ingredients[key]})
    }

    console.log(ingredients);

    const ingredientList = ingredients.map(ingredient => {
        return <span 
                key={ingredient.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '2px solid #ccc',
                    padding: '5px 10px',
                    boxShadow: '1px 3px 2px #aaa'
                }}> {ingredient.name} : {ingredient.amt} 
                </span>
        }
        );

    console.log(ingredientList);
        
    return (
    <div className={classes.Order}>
        <p>Ingreients: {ingredientList}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default order;