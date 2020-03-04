import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => {
    let lastElement = {
        borderBottom: props.lastElement
    }

    // let ingredientsQuantityValidation = true;
    // console.log(lastElement)
    return (
        <div className={classes.BuildControl} style={lastElement}>
            <div className={classes.Label}>{props.label}</div>
            <div>
                {/* {props.lastElement} */}
            </div>
            <div className={classes.Counter}>
                <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>-</button>
                <p>{props.quantity[props.type]}</p>
                <button
                    disabled={props.ingredientsQuantityValidation}
                    className={classes.More}
                    onClick={props.added}>+</button>
            </div>

        </div>
    );
}

export default BuildControl;