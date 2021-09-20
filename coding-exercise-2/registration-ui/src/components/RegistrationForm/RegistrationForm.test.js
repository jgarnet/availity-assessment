import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import RegistrationForm from './RegistrationForm';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({})
    });
});

afterEach(() => jest.restoreAllMocks());

test('renders each form section', () => {
    const registrationForm = render(<RegistrationForm/>);
    const name = registrationForm.getByText('Name');
    const npiNumber = registrationForm.getByText('NPI Number');
    const businessAddress = registrationForm.getByText('Business Address');
    const contact = registrationForm.getByText('Contact Information');
    expect(name).toBeInTheDocument();
    expect(npiNumber).toBeInTheDocument();
    expect(businessAddress).toBeInTheDocument();
    expect(contact).toBeInTheDocument();
});

test('renders thank-you section', () => {
    const registrationForm = render(<RegistrationForm/>);
    const thankYou = registrationForm.baseElement.querySelector('section.thank-you');
    expect(thankYou).toBeInTheDocument();
});

test('hides form and displays thank-you section on successful submit', async () => {
    const registrationForm = render(<RegistrationForm/>);
    const firstName = registrationForm.baseElement.querySelector('input[name=firstName]');
    const lastName = registrationForm.baseElement.querySelector('input[name=lastName]');
    const npiNumber = registrationForm.baseElement.querySelector('input[name=npiNumber]');
    const streetAddress = registrationForm.baseElement.querySelector('input[name=streetLineOne]');
    const state = registrationForm.baseElement.querySelector('select[name=state]');
    const city = registrationForm.baseElement.querySelector('input[name=city]');
    const zipCode = registrationForm.baseElement.querySelector('input[name=zipCode]');
    const phone = registrationForm.baseElement.querySelector('input[name=phone]');
    const email = registrationForm.baseElement.querySelector('input[name=email]');
    firstName.value = 'test';
    lastName.value = 'test';
    npiNumber.value = 1234567890;
    streetAddress.value = 'test';
    state.innerHTML = `<option value='test'>test</option>`;
    state.value = 'test';
    city.value = 'test';
    zipCode.value = 24556;
    phone.value = '(234) 345-3345';
    email.value = 'test@test.com';
    /*
        note: the form will be valid since the inputs have valid values, but RegistrationForm.state will not be updated
              since the setStateFromForm() function is being bypassed by overriding each input's value manually.
              Thus, the console.log(this.state) will have an empty state for this test; this will not be the case in
              the actual development / QA / production environments.
    */
    const submit = registrationForm.baseElement.querySelector('input[type=submit]');
    ReactTestUtils.Simulate.click(submit);
    const thankYou = registrationForm.baseElement.querySelector('section.thank-you');
    const form = registrationForm.baseElement.querySelector('form');
    expect(form.classList.contains('fade-out-up')).toEqual(true);
    await new Promise((r) => setTimeout(r, 250));
    expect(thankYou.classList.contains('display-flex')).toEqual(true);
});
