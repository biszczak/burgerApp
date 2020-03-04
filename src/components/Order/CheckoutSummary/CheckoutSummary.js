import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3 className={classes.SummaryTitle}>Twój burger</h3>
            <div style={{ width: '85%', margin: 'auto', position: 'relative' }}>
                <Burger ingredients={props.ingredients} />
                <div className={classes.ButtonsContainer}>
                    <Button
                        btnType="Cancel"
                        clicked={props.checkoutCancelled}>Anuluj</Button>
                    {props.btnContinueActive ? <Button
                        btnType="Confirm"
                        clicked={props.checkoutContinued}>Dalej</Button> : null}
                </div>

            </div>

        </div>
    );
}

export default CheckoutSummary;