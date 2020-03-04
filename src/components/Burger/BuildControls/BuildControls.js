import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';



const BuildControls = (props) => {
    let displayContainer = null;
    const controls = [
        { label: 'Sałata', type: 'salad' },
        { label: 'Bekon', type: 'bacon' },
        { label: 'Ser cheddar', type: 'cheese' },
        { label: 'Wołowina 150g', type: 'meat', },
    ]
    // const controls2 = Object.keys(props.ingredientQuantity);
    // console.log(controls)
    // console.log(props.showBuilder);

    if (props.showBuilder) {
        displayContainer = 'none';
    }

    return (
        <div className={classes.BuildControls} style={{ display: displayContainer }}>
            <div className={classes.BuildContainer}>
                <div style={{ width: '100%' }}>
                    {
                        controls.map(ctrl => (
                            <BuildControl
                                key={ctrl.label}
                                label={ctrl.label}
                                type={ctrl.type}
                                quantity={props.ingredientQuantity}
                                added={() => props.ingredientAdded(ctrl.type)}
                                removed={() => props.ingredientRemoved(ctrl.type)}
                                disabled={props.disabled[ctrl.type]}
                                index={ctrl.index}
                                lastElement={controls.indexOf(ctrl) === controls.length - 1 ? '1px solid #353a40' : null}
                                ingredientsQuantityValidation={props.burgerIngsValidation} />
                        ))
                    }
                    {props.burgerIngsValidation ? <p style={{ textAlign: 'center', color: '#ff4c4c' }}>Maksymalna liczba składników osiągnięta.</p> : null}
                </div>
                <div style={{ position: 'absolute', bottom: '120px' }}>
                    <p style={{ marginTop: '0px', marginBottom: '0px' }}>Cena: <strong>{props.price.toFixed(2)}</strong> zł</p>
                </div>
                <button
                    style={{ position: 'absolute', bottom: '30px' }}
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}>{props.isAuth ? 'Zamów' : 'Zarejestruj się aby zamówić'}</button>
            </div>
        </div>
    );
}

export default BuildControls;