import React, { Component } from 'react';
import propTypes from 'prop-types';
import meatImg from '../../../assets/images/meat.png';
import bunBottom from '../../../assets/images/bun-bottom.png';
import bunTop from '../../../assets/images/bun-top.png';
import lettuce from '../../../assets/images/lettuce.png';
import bacon from '../../../assets/images/bacon.png';
import cheese from '../../../assets/images/cheese.png';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}><img src={bunBottom} alt="" /></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <img src={bunTop} alt="" />
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={[classes.Ing, classes.Meat].join(' ')} ><img src={meatImg} alt="" /></div>;
                break;
            case ('cheese'):
                ingredient = <div className={[classes.Ing, classes.Cheese].join(' ')} ><img src={cheese} alt="" /></div>;
                break;
            case ('bacon'):
                ingredient = <div className={[classes.Ing, classes.Bacon].join(' ')} ><img src={bacon} alt="" /></div>;
                break;
            case ('salad'):
                ingredient = <div className={[classes.Ing, classes.Salad].join(' ')} ><img src={lettuce} alt="" /></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: propTypes.string.isRequired
}

export default BurgerIngredient;