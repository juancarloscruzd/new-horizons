import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import AppContext from '../common/context';

import '../styles/globals.scss';

export const AppState = ({ children }) => {
  const appContext = {
    useUser: useState(null),
    useNextPage: useState('/login'),
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  );
}

export default MyApp;
