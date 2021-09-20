import React from 'react';

class BusinessAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: {},
            zipCode: ''
        };
        this.maskZip = this.maskZip.bind(this);
    }

    componentDidMount() {
        // fetch a list of US states to display in the State dropdown
        fetch('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json')
            .then(res => res.json())
            .then(states => this.setState({states}));
    }

    maskZip(e) {
        let val = e.target.value.replace(/[^\d]/gm, '');
        let zipCode = `${val.substring(0, 5)}`;
        if (val.length > 5) {
            zipCode += `-${val.substring(5, val.length)}`;
        }
        this.setState({zipCode});
        this.props.update(e, zipCode);
    }

    render() {
        return (
            <>
                <span className='label'>Business Address</span>
                <section className='section'>
                    <input type='text' name='streetLineOne' placeholder='Street Address' required maxLength={255}/>
                    <input type='text' name='streetLineTwo' placeholder='Street Address Line 2' maxLength={255}/>
                    <section className='split-columns'>
                        <select name='state' placeholder='State' defaultValue='' required>
                            <option value='' disabled>Select a State</option>
                            {Object.values(this.state.states)
                                .map(state => (<option key={state} value={state}>{state}</option>))}
                        </select>
                        <input type='text' name='city' placeholder='City' required maxLength={28}/>
                    </section>
                    <input
                        type='text'
                        name='zipCode'
                        placeholder='Zip Code'
                        value={this.state.zipCode}
                        onChange={this.maskZip}
                        required
                        pattern='^\d{5}(?:-\d{4})?$'
                        maxLength={10}
                        data-error='Zip Code must follow format ##### or #####-####'/>
                </section>
            </>
        );
    }

}

export default BusinessAddress;
