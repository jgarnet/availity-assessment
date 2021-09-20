import React from 'react';

class NpiNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            npiNumber: ''
        };
        this.maskNpi = this.maskNpi.bind(this);
    }

    maskNpi(e) {
        const npiNumber = e.target.value.replace(/[^\d]/gm, '');
        this.setState({npiNumber});
        this.props.update(e, npiNumber);
    }

    render() {
        return (
            <>
                <span className='label'>NPI Number</span>
                <section className='section'>
                    <input
                        type='text'
                        name='npiNumber'
                        placeholder='NPI Number'
                        value={this.state.npiNumber}
                        onChange={this.maskNpi}
                        required
                        pattern='\d{10}'
                        maxLength={10}
                        data-error='NPI Number must be a 10 digit number'/>
                </section>
            </>
        );
    }

}

export default NpiNumber;
