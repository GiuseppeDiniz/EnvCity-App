import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, BackHandler } from 'react-native';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          Alert.alert(
            'Permission Denied',
            'This app requires access to your location to function. Please grant access in your device settings and restart the app.',
            [
              {
                text: 'Exit',
                onPress: () => {
                  BackHandler.exitApp();
                }
              }
            ]
          );
          return;
        }
        let { coords, timestamp } = await Location.getCurrentPositionAsync({});
        setLocation({ coords, timestamp });
      } catch (error) {
        setErrorMsg('Error getting current location');
        Alert.alert(
          'Location Error',
          'An error occurred while getting your current location. Please check your location settings and try again.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  return { location, errorMsg };
};
