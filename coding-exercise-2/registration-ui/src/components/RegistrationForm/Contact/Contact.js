import React from 'react';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        };
        this.maskPhone = this.maskPhone.bind(this);
    }

    maskPhone(e) {
        let val = e.target.value.replace(/[^\d]/gm, '');
        let phone = `(${val.substring(0, 3)})`;
        if (val.length > 3) {
            phone += ` ${val.substring(3, 6)}`;
            if (val.length > 6) {
                phone += `-${val.substring(6, val.length)}`;
            }
        }
        this.setState({phone});
        this.props.update(e, phone);
    }

    render() {
        return (
            <>
                <span className='label'>Contact Information</span>
                <section className='section'>
                    <input
                        type='text'
                        name='phone'
                        placeholder='Telephone Number'
                        value={this.state.phone}
                        onChange={this.maskPhone}
                        required
                        pattern='^\(\d{3}\)\s\d{3}-\d{4}$'
                        maxLength={14}
                        data-error='Phone number must follow format (###) ###-####'/>
                    <input type='email' name='email' placeholder='Email Address' required maxLength={255}/>
                </section>
            </>
        );
    }

}

export default Contact;
