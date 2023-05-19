import React from 'react';
import { View, Text } from 'react-native';

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => navigation.navigate('Home')}>Go to Home</Text>
      <Text>About Screen</Text>
    </View>
  );
};

export default AboutScreen;
