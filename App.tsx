import React, { FC } from 'react';

import Navigation from './src/routes';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { Provider } from 'react-redux';

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
