import React from 'react';

class Name extends React.Component {

    render() {
        return (
            <>
                <span className='label'>Name</span>
                <section className='section split-columns'>
                    <input type='text' name='firstName' placeholder='First Name' required maxLength={50}/>
                    <input type='text' name='lastName' placeholder='Last Name' required maxLength={50}/>
                </section>
            </>
        );
    }

}

export default Name;
