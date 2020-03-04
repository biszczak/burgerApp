import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    //alternative for keys() method [NEED TO REPEAT!!!!!!]
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    // console.log(ingredients);
    const ingredientOutput = ingredients.map(ig => {

        let translatedName = null;
        if (ig.name === 'meat') {
            translatedName = 'Wołowina 150g';
        } else if (ig.name === 'salad') {
            translatedName = 'Sałata';
        } else if (ig.name === 'cheese') {
            translatedName = 'Ser cheddar';
        } else {
            translatedName = 'Bekon';
        }
        return <div className={classes.Ing} key={ig.name} ><span>{translatedName}  x{ig.amount} </span></div >;
    })

    return (
        <div className={classes.Order}>
            <div className={classes.IngredientsList}>Składniki: <div className={classes.IngsContainer}>{ingredientOutput}</div></div>
            <div style={{ marginTop: '15px' }}>Cena: <strong>{Number.parseFloat(props.price).toFixed(2)} zł</strong></div>
        </div>
    );
}

export default order;