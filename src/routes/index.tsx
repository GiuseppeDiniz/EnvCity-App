import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './stack.routes';

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
