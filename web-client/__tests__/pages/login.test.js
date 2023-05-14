/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react';

import { render } from '../../common/test-utils';
import Login from '../../pages/login';

describe('Login', () => {
  it('renders a title', () => {
    render(<Login />);

    const title = screen.getByTestId('page-title');

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Identificate');
  });
});
