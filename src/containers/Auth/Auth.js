import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { FaUserAlt } from 'react-icons/fa';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email adress'
                },
                label: 'sdasd',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />

        ));

        if (this.props.loading) {
            form = <div style={{ minWidth: '220px' }}><Spinner /></div>
        }

        let errorMessage = null;
        if (this.props.error) {
            if (this.props.error.message === "INVALID_PASSWORD") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Nieprawidłowe hasło</p>
                )
            } else if (this.props.error.message === "INVALID_EMAIL") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Niepoprawny adres email</p>
                )
            } else if (this.props.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Konto o wybranym adresie email nie istnieje</p>
                )
            } else if (this.props.error.message === "EMAIL_EXISTS") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Konto o tym adresie email już istnieje</p>
                )
            } else if (this.props.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Hasło powinno zawierać przynajmniej 6 znaków</p>
                )
            } else if (this.props.error.message === "MISSING_PASSWORD") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Wpisz hasło</p>
                )
            } else if (this.props.error.message === "MISSING_EMAIL") {
                errorMessage = (
                    <p style={{ color: 'rgb(255, 76, 76)' }}>Wprowadź hasło</p>
                )
            }
            // errorMessage = (
            //     <p>{this.props.error.message}</p>
            // )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.AuthContainer}>
                <div className={classes.Auth}>
                    {authRedirect}
                    <FaUserAlt style={{ fontSize: '30px', marginBottom: '30px' }} />
                    {this.state.isSignup ? 'Utwórz konto' : 'Zaloguj się'}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        {errorMessage}
                        <Button btnType="Send">Wyślij</Button>
                    </form>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType="Info">{this.state.isSignup ? 'Mam już konto' : 'Zarejestruj się'}</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);