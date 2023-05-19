import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import  {GOOGLE_PLACES_API_KEY} from '../../config/index.json';
import { Ionicons } from '@expo/vector-icons';

const GooglePlacesInput = ({ onCancel }) => {
  const [location, setLocation] = useState(null);

  const handlePlaceSelect = (data, details = null) => {
    const { geometry } = details;
    const { location } = geometry;

    setLocation({
      latitude: location.lat,
      longitude: location.lng,
    });

    console.log(location);
  };
  
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Localizar'
        onPress={handlePlaceSelect}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'pt-br',
          component: "country:br",
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        styles={{
          listView: styles.list,
          row: {
            marginLeft: -8,
            height: 44,
            flexDirection: 'row',
          },
        }}
      />
      <TouchableOpacity onPress={onCancel}>
        <Ionicons name="ios-close" size={24} color= "black"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    
    marginLeft: 15,
    marginTop: 5,


  },
  list: {
    width: 200,          
    backgroundColor: 'white',                                    
    position: 'absolute',
    marginTop: 30,
    padding: 5,
    
    borderColor: '#000',
    borderTopWidth:0,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderStyle: 'solid',
  },
});

export default GooglePlacesInput;
