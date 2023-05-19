import React from 'react';
import { Marker } from 'react-native-maps';

interface AirMarkerProps {
  location: string;
  component: string;
}

const AirMarker: React.FC<AirMarkerProps> = ({ location, component }) => {
  return (
    <Marker
      coordinate={{
        latitude: Number(location.split(' ')[0]),
        longitude: Number(location.split(' ')[1])
      }}
      pinColor="red"
      title={component}
      key={component}
    />
  );
};

export default AirMarker;
