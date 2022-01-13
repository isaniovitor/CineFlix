import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import RootStack from './routes';
import store from './store';

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <RootStack />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
