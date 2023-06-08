import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

interface WaterMarkerProps {
  location: string;
  component: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const WaterMarker: React.FC<WaterMarkerProps> = ({ location, component, navigation }) => {
  
  return (
    <Marker
      key={component}
      coordinate={{
        latitude: Number(location.split(' ')[0]),
        longitude: Number(location.split(' ')[1])
      }}
    >
      <View style={[styles.markers, { backgroundColor: 'green' }]}>
        <Ionicons
          name="water-outline"
          size={40}
          color="white"
          style={{ marginTop: 2 }}
        />
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />

      <Callout tooltip onPress={() => navigation.navigate('WaterQuality')}>
        <View style={styles.bubble}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={[styles.circleInfo, { backgroundColor: '#ccc' }]}>
              <Text style={{ color: 'white' }}>{Math.ceil(0)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={{ color: 'blue' }}>IQA</Text>
          </View>

          <View style={styles.separator} />

          <View style={[styles.body]}>
            <View style={styles.weatherIcon}>
              <FontAwesome5 name="temperature-low" size={10} color="black" />
              <Text style={styles.weatherText}> ?°C </Text>
            </View>
          </View>

          <View style={styles.separator} />
          <Text
            style={{
              marginTop: -5,
              color: 'gray',
              fontSize: 8,
              alignSelf: 'center',
              textAlign: 'center'
            }}
          >
            Atualizado em{'\n'} --/--/2023
          </Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default WaterMarker;

const styles = StyleSheet.create({
  map: {
    justifyContent: 'center'
  },
  markers: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: 'black',
    alignItems: 'center',
    zIndex: 1,
    elevation: 1
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: 'black',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
    elevation: 1
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#F5F5F5',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -5
    // marginBottom: -15
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFAFA',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 5,
    height: 130,
    width: 130
  },
  circleInfo: {
    height: 30,
    width: 30,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  squareInfo: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    alignSelf: 'center',
    marginTop: -20,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginBottom: -30,
    paddingHorizontal: 20
  },
  weatherIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weatherText: {
    fontSize: 16
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginVertical: 10
  }
});
