import React from 'react';
import { render } from '@testing-library/react';
import Name from './Name';

let name, firstName, lastName;

beforeEach(() => {
    name = render(<Name/>);
    firstName = name.baseElement.querySelector('input[name=firstName]')
    lastName = name.baseElement.querySelector('input[name=lastName]')
});

afterEach(() => name.unmount());

test('renders First Name and Last Name', () => {
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
});

test('expect firstName and lastName to be required', () => {
    expect(firstName.hasAttribute('required')).toEqual(true);
    expect(lastName.hasAttribute('required')).toEqual(true);
});

test('expect firstName and lastName to have a maxLength of 50', () => {
    expect(firstName.getAttribute('maxLength')).toEqual('50');
    expect(lastName.getAttribute('maxLength')).toEqual('50');
});

test('expect firstName and lastName to be invalid when empty', () => {
    expect(firstName.reportValidity()).toEqual(false);
    expect(lastName.reportValidity()).toEqual(false);
});

test('expect firstName and lastName to be valid when populated below 50 characters', () => {
    firstName.value = 'test';
    lastName.value = 'test';
    expect(firstName.reportValidity()).toEqual(true);
    expect(lastName.reportValidity()).toEqual(true);
});
