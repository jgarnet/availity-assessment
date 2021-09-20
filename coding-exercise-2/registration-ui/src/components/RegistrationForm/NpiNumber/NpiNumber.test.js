import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import NpiNumber from './NpiNumber';

let npiNumber, input;

beforeEach(() => {
    npiNumber = render(<NpiNumber/>);
    input = npiNumber.baseElement.querySelector('input[name=npiNumber]');
});

afterEach(() => npiNumber.unmount());

test('renders NpiNumber input', () => {
    expect(input).toBeInTheDocument();
});

test('expect npiNumber to have maxLength of 10', () => {
    expect(input.getAttribute('maxLength')).toEqual('10');
});

test('expect npiNumber to be required', () => {
    expect(input.hasAttribute('required')).toEqual(true);
});

test('expect npiNumber to only accept digits', () => {
    npiNumber.unmount();
    npiNumber = render(<NpiNumber update={() => {}}/>);
    input = npiNumber.baseElement.querySelector('input[name=npiNumber]');
    ReactTestUtils.Simulate.change(input, {target: {value: '1234test--#$ 5'}});
    expect(input.value).toEqual('12345');
});

test('expect update to be called on npiNumber change', () => {
    let testValue = '';
    const mockUpdate = (e, val) => testValue = val;
    npiNumber.unmount();
    npiNumber = render(<NpiNumber update={(e, val) => mockUpdate(e, val)}/>);
    input = npiNumber.baseElement.querySelector('input[name=npiNumber]');
    ReactTestUtils.Simulate.change(input, {target: {value: '1234test--#$ 5'}});
    expect(testValue).toEqual('12345');
});
