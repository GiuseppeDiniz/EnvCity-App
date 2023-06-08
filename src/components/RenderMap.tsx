import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import useApi from '../store/path/to/apiSlice';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import MapView, {PROVIDER_GOOGLE}  from 'react-native-maps';
import { currentLocation } from './utils/currentLocation';

import WaterMarker from './Markers/WaterMarker';
import AirMarker from './Markers/AirMaker';

import { mapStyle } from '../assets/styles/mapStyle.json';
import { toogleRefresh } from '../store/path/to/refreshSlice';

const RenderMap: React.FC<{
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}> = ({ navigation, ...props }) => {
  const { location, errorMsg } = useCurrentLocation();
  const showMarkerAirQuality = useSelector(
    (state: CheckboxState) => state.checkbox.checkbox1
  );
  const showMarkerWaterQuality = useSelector(
    (state: CheckboxState) => state.checkbox.checkbox2
  );
  //--------------------------------------------------------------
  const {
    data: catalog,
    error: catalogError,
    isLoading: catalogLoading,
    refetch
  } = useApi.useGetCatalogQuery();
  //--------------------------------------------------------------
  const dispatch = useDispatch();
  const isUpdating = useSelector((state: RootState) => state.refresh.isUpdating);

  useEffect(() => {
    if (isUpdating) {
      refetch();
      dispatch(toogleRefresh());
    }
  }, [isUpdating, refetch, dispatch]);  
//--------------------------------------------------------------
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
      if (isUpdating) {
        setShowUpdateMessage(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // Duração da animação em milissegundos (1 segundo)
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          setShowUpdateMessage(false);
          fadeAnim.setValue(1); // Reinicia o valor da opacidade para a próxima vez que a mensagem for exibida
        });
      }
  }, [isUpdating]);
  //--------------------------------------------------------------
  const distinctObjects = useMemo(() => {
    if (catalog && catalog.providers[0].sensors) {
      return catalog.providers[0].sensors.reduce(
        (acc: Sensor[], curr: Sensor) => {
          if (
            !acc.some(
              (distinctObject) => distinctObject.component === curr.component
            )
          ) {
            return [...acc, curr];
          }
          return acc;
        },
        []
      );
    }
    return [];
  }, [catalog]);
  //--------------------------------------------------------------

  if (catalog != null && !errorMsg && !catalogError && !catalogLoading) {
    return (
      <React.Fragment>
        {location && (
          <MapView
            style={styles.map}
            region={currentLocation(location)}
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
          >
            {distinctObjects.map((object) => {
              if (
                object.componentType === 'water_quality' &&
                showMarkerWaterQuality
              )
                return (
                  <WaterMarker
                    location={object.location}
                    component={object.component}
                    navigation={navigation}
                  />
                );
              else if (
                object.componentType === 'air_quality' &&
                showMarkerAirQuality
              )
                return (
                  <AirMarker
                    location={object.location}
                    component={object.component}
                  />
                );
              else return null;
            })}
          </MapView>
        )}
        {/*Message where updating informations */}
        {showUpdateMessage && (
          <View style={styles.refreshMessage}>
            <Text style={{ color: "#fff" }}>Atualizando...</Text>
          </View>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ActivityIndicator style={styles.map} size="large" color="#00213b" />
      </React.Fragment>
    );
  }
};

export default RenderMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  refreshMessage:{
    position: "absolute", 
    alignItems: "center", 
    zIndex: 100, 
    bottom: 20, 
    left: "38%",  
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 140/2,
  },
});
