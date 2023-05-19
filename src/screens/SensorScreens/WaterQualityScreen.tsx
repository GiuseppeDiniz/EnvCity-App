import React from 'react';
import { Text, View } from 'react-native';
import useApi from '../../store/path/to/apiSlice';

const WaterQualityScreen: React.FC<WaterQualityScreenProps> = ({ route }) => {
  const { sensorName } = route.params;
  const {
    data: sensorData,
    error: sensorError,
    isLoading: sensorLoading
  } = useApi.useGetSensorQuery('water_quality-sensor-ph-component-000');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>WaterQualityScreen</Text>
    </View>
  );
};

export default WaterQualityScreen;
