import React from 'react';
import { render } from '@testing-library/react';
import Contact from './Contact';
import ReactTestUtils from 'react-dom/test-utils';

let contact, phone, email;

beforeEach(() => {
    contact = render(<Contact update={() => {}}/>);
    phone = contact.baseElement.querySelector('input[name=phone]');
    email = contact.baseElement.querySelector('input[name=email]');
});

afterEach(() => contact.unmount());

test('renders Phone Number and Email Address', () => {
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});

test('expect Phone Number and Email Address to be required', () => {
    expect(phone.hasAttribute('required')).toEqual(true);
    expect(email.hasAttribute('required')).toEqual(true);
});

test('expect Phone Number to have a maxLength of 14', () => {
    expect(phone.getAttribute('maxLength')).toEqual('14');
    expect(phone.getAttribute('pattern')).toEqual(`^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$`);
});

test('expect Phone Number to follow pattern (###) ###-####', () => {
    expect(phone.getAttribute('pattern')).toEqual(`^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$`);
});

test('expect Phone Number to only accept digits and apply mask to input', () => {
    ReactTestUtils.Simulate.change(phone, {target: {value: '1234test--#$ 53990e1'}});
    expect(phone.value).toEqual('(123) 453-9901');
});

test('expect update to be called on phone change', () => {
    let val = '';
    const mockUpdate = (e, v) => val = v;
    contact.unmount();
    contact = render(<Contact update={(e, v) => mockUpdate(e, v)}/>);
    phone = contact.baseElement.querySelector('input[name=phone]');
    ReactTestUtils.Simulate.change(phone, {target: {value: '1234test--#$ 53990e1'}});
    expect(val).toEqual('(123) 453-9901');
});

test('expect Email Address to have a maxLength of 255', () => {
    expect(email.getAttribute('maxLength')).toEqual('255');
});
