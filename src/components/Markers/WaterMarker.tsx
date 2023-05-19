import React from 'react';
import { Marker } from 'react-native-maps';

interface WaterMarkerProps {
  location: string;
  component: string;
}

const WaterMarker: React.FC<WaterMarkerProps> = ({ location, component }) => {
  return (
    <Marker
      coordinate={{
        latitude: Number(location.split(' ')[0]),
        longitude: Number(location.split(' ')[1])
      }}
      pinColor="blue"
      title={component}
      key={component}
    />
  );
};

export default WaterMarker;
