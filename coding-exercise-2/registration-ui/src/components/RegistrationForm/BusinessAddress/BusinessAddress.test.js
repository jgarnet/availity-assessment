import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import BusinessAddress from './BusinessAddress';

let businessAddress, streetAddress, streetAddress2, state, city, zipCode;

beforeEach(() => {
    businessAddress = render(<BusinessAddress update={() => {}}/>);
    streetAddress = businessAddress.baseElement.querySelector('input[name=streetLineOne]');
    streetAddress2 = businessAddress.baseElement.querySelector('input[name=streetLineTwo]');
    state = businessAddress.baseElement.querySelector('select[name=state]');
    city = businessAddress.baseElement.querySelector('input[name=city]');
    zipCode = businessAddress.baseElement.querySelector('input[name=zipCode]');
});

afterEach(() => businessAddress.unmount());

test('renders Street Address, Street Address Line 2, State, City, Zip Code', () => {
    expect(streetAddress).toBeInTheDocument();
    expect(streetAddress2).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(zipCode).toBeInTheDocument();
});

test('expect Street Address, State, City, Zip Code to be required', () => {
    expect(streetAddress.hasAttribute('required')).toEqual(true);
    expect(state.hasAttribute('required')).toEqual(true);
    expect(city.hasAttribute('required')).toEqual(true);
    expect(zipCode.hasAttribute('required')).toEqual(true);
});

test('expect Street Address One and Street Address Two to have a maxLength of 255', () => {
    expect(streetAddress.getAttribute('maxLength')).toEqual('255');
    expect(streetAddress2.getAttribute('maxLength')).toEqual('255');
});

test('expect City to have a maxLength of 28', () => {
    expect(city.getAttribute('maxLength')).toEqual('28');
});

test('expect Zip Code to have a maxLength of 10 and follow the pattern ##### or #####-#### and only accept digits', () => {
    expect(zipCode.getAttribute('maxLength')).toEqual('10');
    expect(zipCode.getAttribute('pattern')).toEqual(`^\\d{5}(?:-\\d{4})?$`);
    ReactTestUtils.Simulate.change(zipCode, {target: {value: '3677u8'}});
    expect(zipCode.value).toEqual('36778');
    ReactTestUtils.Simulate.change(zipCode, {target: {value: '3677u84487'}});
    expect(zipCode.value).toEqual('36778-4487');
});

test('expect BusinessAddress to fetch US states on load', () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({})
    });
    businessAddress = render(<BusinessAddress/>);
    expect(fetchMock).toHaveBeenCalledWith('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json');
    jest.restoreAllMocks();
});
