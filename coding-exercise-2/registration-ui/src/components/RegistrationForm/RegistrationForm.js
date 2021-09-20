import './RegistrationForm.scss';
import React from 'react';
import BusinessAddress from './BusinessAddress/BusinessAddress';
import NpiNumber from './NpiNumber/NpiNumber';
import Contact from './Contact/Contact';
import Name from './Name/Name';

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            npiNumber: '',
            streetLineOne: '',
            streetLineTwo: '',
            state: '',
            city: '',
            zipCode: '',
            phone: '',
            email: ''
        };
        this.form = React.createRef();
        this.submit = this.submit.bind(this);
        this.setStateFromForm = this.setStateFromForm.bind(this);
    }

    componentDidMount() {
        Array.prototype.forEach.call(this.form.current.elements, element => {
            // automatically update this.state in response to changes in this.form inputs
            if (['phone', 'npiNumber', 'zipCode'].indexOf(element.name) === -1) {
                // phone, npiNumber, and zipCode will have custom state management functions, so exclude them here
                element.addEventListener('change', e => this.setStateFromForm(e));
            }
            // override default HTML5 validation error messages if necessary
            const customError = element.getAttribute('data-error');
            if (!!customError) {
                element.addEventListener('invalid', e => this.displayCustomError(e));
                element.addEventListener('input', e => this.resetCustomValidity(e));
            }
        });
    }

    setStateFromForm(e, value = null) {
        const state = {};
        state[e.target.name] = value ? value.toUpperCase() : e.target.value.toUpperCase();
        this.setState(state);
    }

    displayCustomError(e) {
        // override the default HTML5 validation error message behavior
        e.target.setCustomValidity('');
        if (!e.target.validity.valid) {
            const message =
                !!e.target.value ? e.target.getAttribute('data-error') : 'Please fill out this field';
            e.target.setCustomValidity(message);
        }
    }

    resetCustomValidity(e) {
        // reset HTML5 validation error message behavior if necessary -- or use our custom error messages when not valid
        if (!e.target.validity.valid) {
            this.displayCustomError(e);
        } else {
            e.target.setCustomValidity('');
        }
    }

    submit(e) {
        e.preventDefault();
        this.form.current.checkValidity();
        if (this.form.current.reportValidity()) {
            console.log(this.state);
            const form = document.querySelector('form.registration-form');
            form.classList.add('fade-out-up');
            setInterval(() => {
                form.classList.add('no-display');
                const thankYou = document.querySelector('.thank-you');
                thankYou.classList.add('display-flex');
                thankYou.querySelector('section').classList.add('fade-in-up');
            }, 250);
        }
    }

    render() {
        return (
            <>
                <form ref={this.form} className='registration-form'>
                    <h2>Join the Availity Portal</h2>
                    <Name/>
                    <NpiNumber update={e => this.setStateFromForm(e)}/>
                    <BusinessAddress update={e => this.setStateFromForm(e)}/>
                    <Contact update={e => this.setStateFromForm(e)}/>
                    <input type='submit' value='Join Availity' onClick={this.submit}/>
                </form>
                <section className='thank-you'>
                    <section>
                        <p className='no-select'>
                            Thank you for your interest in joining the Availity Portal.
                            You should receive a confirmation email at {this.state.email.toLowerCase()} shortly.
                        </p>
                    </section>
                </section>
            </>
        );
    }

}

export default RegistrationForm;
