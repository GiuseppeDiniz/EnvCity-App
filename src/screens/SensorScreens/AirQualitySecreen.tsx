import React from 'react';
import { Text, View } from 'react-native';

const AirQualitySecreen: React.FC<AirQualitySecreenProps> = ({ route }) => {
  const { sensorName } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AirQualitySecreen</Text>
    </View>
  );
};

export default AirQualitySecreen;
