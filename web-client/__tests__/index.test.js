/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react';

import { render } from '../common/test-utils';

import Landing from '../pages/landing';

describe('Landing', () => {
  it('renders a title', () => {
    render(<Landing />);

    const title = screen.getByTestId('page-title');

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('DMC');
  });
});
