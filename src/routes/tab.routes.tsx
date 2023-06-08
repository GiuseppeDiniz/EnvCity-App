import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'EnvCity',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-marker" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="About"
        options={{
          title: 'About',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          )
        }}
        component={AboutScreen}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
