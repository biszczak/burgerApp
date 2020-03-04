import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
// import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './BurgerBuilder.css';
import Button from '../../components/UI/Button/Button';
import { IoMdClose, IoMdAdd } from 'react-icons/io';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        showBuilder: TextTrackCue
    }

    componentDidMount() {
        this.props.onInitIngredients();
        if (window.innerWidth >= 991) {
            this.setState({ showBuilder: false })
        }
    }


    sumIngs(ingredients) {
        let sum = 0;
        for (var el in ingredients) {
            if (ingredients.hasOwnProperty(el)) {
                sum += parseFloat(ingredients[el]);
            }
        }
        // console.log(sum)
        return sum >= 8;
    }

    updatePurchaseState(ingredients) {


        // const arr = { salad: 1, bacon: 2, cheese: 3, meat: 4 }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;



        // const sum = Object.keys(arr)
        //     .map(igKey => {
        //         return arr[igKey];
        //     });
        // console.log(sum)
    }

    // ingredientsValidation(ingredients) {
    //     const sum = Object.keys(ingredients)
    //         .map(igKey => {
    //             return ingredients[igKey];
    //         })
    //         .reduce((sum, el) => {
    //             return sum + el
    //         }, 0);
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // this.scrollWin();
    }

    render() {
        let btnIcon = null;
        if (this.state.showBuilder) {
            btnIcon = <IoMdAdd style={{ fontSize: '25px', marginRight: '10px' }} />;
        } else {
            btnIcon = <IoMdClose style={{ fontSize: '25px', marginRight: '10px', color: 'rgb(255, 76, 76)' }} />;
        }

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <div style={{ position: 'absolute', top: '30%', left: '48%' }}><Spinner className={classes.MainSpinner} /></div>

        if (this.props.ings) {
            burger = (

                <div className={classes.BurgerBuilder}>
                    <Burger
                        ingredients={this.props.ings}
                        burgerIngsValidation={this.sumIngs(this.props.ings)} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientQuantity={this.props.ings}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        burgerIngsValidation={this.sumIngs(this.props.ings)}
                        showBuilder={this.state.showBuilder} />

                </div>
            );
            // debugger;
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price.toFixed(2)}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />
        }

        let switchBtn = null;
        if (window.innerWidth <= 991) {
            switchBtn = (
                <Button
                    clicked={() => {
                        this.setState({ showBuilder: !this.state.showBuilder })
                        // console.log(this.props.ings)
                        this.props.onResetIngredients();
                    }}
                    btnType={this.state.showBuilder ? "Add" : "AddOpen"}>{btnIcon}{this.state.showBuilder ? 'Dodaj składniki' : 'Anuluj'}</Button>
            )
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                {switchBtn}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onResetIngredients: () => dispatch(actions.resetIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));