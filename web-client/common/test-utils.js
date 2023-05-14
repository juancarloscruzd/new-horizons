import { render } from '@testing-library/react';

import { AppState } from '../pages/_app';

const Providers = ({ children }) => {
  return <AppState>{children}</AppState>;
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
