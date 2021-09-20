import App from './App';
import {render} from '@testing-library/react';

test('renders <RegistrationForm/>', () => {
  const app = render(<App/>);
  expect(app.getByText('Join the Availity Portal')).toBeInTheDocument();
  app.unmount();
});
