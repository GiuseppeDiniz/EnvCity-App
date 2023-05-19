import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import useApi from '../store/path/to/apiSlice';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import MapView from 'react-native-maps';
import { currentLocation } from './utils/currentLocation';

import WaterMarker from './Markers/WaterMarker';
import AirMarker from './Markers/AirMaker';
import useCatalog from '../hooks/useCatalog';

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
    isLoading: catalogLoading
  } = useApi.useGetCatalogQuery();
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
          <MapView style={styles.map} region={currentLocation(location)}>
            {distinctObjects.map((object) => {
              if (
                object.componentType === 'water_quality' &&
                showMarkerWaterQuality
              )
                return (
                  <WaterMarker
                    location={object.location}
                    component={object.component}
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
  }
});
