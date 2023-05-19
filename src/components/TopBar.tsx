import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './utils/SearchBar';

const TopBar: React.FC = ({}) => {
  return (
    <SafeAreaView>
      <View style={styles.containerTop}>
        <View style={styles.TopLeft}>
          <Image
            source={require('../assets/images/logo-color-complete.png')}
            style={{ width: 100, height: 40, marginLeft: 5, marginTop: 5 }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10
          }}
        >
          <SearchBar/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between'
  },
  TopLeft: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  TopRigth: {
    justifyContent: 'center',
    marginLeft: 'auto'
  }
});

export default TopBar;
