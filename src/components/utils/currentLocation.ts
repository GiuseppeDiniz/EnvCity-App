import { LocationObject } from 'expo-location';

export function currentLocation(location: LocationObject) {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  };
}
