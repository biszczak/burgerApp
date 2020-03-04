import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngreadient/BurgerIngredient'

const burger = (props) => {
    // console.log(props)
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    // const transformedIngredients = [];
    // for (let key in props.ingredients) {
    //     let number = props.ingredients[key]
    //     for (let i = 0; i < number; i++) {
    //         transformedIngredients.push(key)
    //     }
    // }
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Zacznij dodawać składniki poniżej.<br></br><span>Możesz wybrać maksymalnie do 8 składników.</span></p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* {transformedIngredients.map(ingreadient => {
                return <BurgerIngredient type={ingreadient} />
            })} */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;