import React, { Component } from 'react';

// import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css'

class OrderSummary extends Component {
    //this could be a functional component
    // componentDidUpdate() {
    //     console.log('[OrderSummary] componentWillUpdate()')
    // }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                let translatedIng = null;
                if (igKey === "meat") {
                    translatedIng = 'Wołowina 150g';
                } else if (igKey === "salad") {
                    translatedIng = 'Sałata';
                } else if (igKey === "bacon") {
                    translatedIng = 'Bekon';
                } else {
                    translatedIng = 'Ser cheddar';
                }
                return (
                    <li className={classes.ListElement} key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{translatedIng}</span><span className={classes.LiQuantity}>{this.props.ingredients[igKey]}</span>
                    </li>
                )

            })
        // console.log(this.props.ingredients)

        return (
            <React.Fragment>
                <h3 style={{ textAlign: 'center' }}>Twoje zamówienie</h3>
                <p>Składniki:</p>
                <ul className={classes.List}>
                    {ingredientSummary}
                </ul>
                <p>Cena: <span style={{ fontWeight: 'bold' }}>{this.props.price} zł</span></p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button btnType="CancelO" clicked={this.props.purchaseCanceled}>Anuluj</Button>
                    <Button btnType="ConfirmO" clicked={this.props.purchaseContinue}>Dalej</Button>
                </div>

            </React.Fragment>
        );
    }

}

export default OrderSummary;