import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AirQualitySecreen from '../screens/SensorScreens/AirQualitySecreen';
import WaterQualityScreen from '../screens/SensorScreens/WaterQualityScreen';
import BottomTabNavigator from './tab.routes';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name="AirQuality"
          component={AirQualitySecreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaterQuality"
          component={WaterQualityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
