import React from 'react';
import { SafeAreaView } from 'react-native';
import { FabButton, TopBar, RenderMap } from '../components';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <RenderMap navigation={navigation} />
      <SafeAreaView style={{ backgroundColor: '#00213b' }}>
        <TopBar />
      </SafeAreaView>
      <FabButton style={{ bottom: 70, left: 40 }} />
    </React.Fragment>
  );
};
export default HomeScreen;
