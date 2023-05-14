import React from 'react';

const appContextDefault = {
  useUser: undefined,
  useNextPage: undefined,
};

const AppContext = React.createContext(appContextDefault);

export default AppContext;
