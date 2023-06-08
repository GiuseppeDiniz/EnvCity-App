import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { TopBar } from '../components';
import useCatalog from '../hooks/useCatalog';

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false); // Estado para controlar o refresh
  const { data, error, loading } = useCatalog(refresh);

  const handleRefresh = () => {
    setRefresh(true); // Atualiza o estado para true, forçando o refresh
  };

  // Use o valor de "refresh" no segundo argumento do useEffect para forçar o refresh
  useEffect(() => {
    if (refresh) {
      setRefresh(false); // Resetar o estado para false para evitar loop infinito
    }
  }, [refresh]);

  return (
    <React.Fragment>
      <SafeAreaView style={{ backgroundColor: '#00213b' }}>
        <TopBar screen={"About"}/>
        {!error && !loading ? (
          <View style={{}}>
            <Button title="Refresh" onPress={handleRefresh} />
            <Text style={{ color: '#FFF' }}>
              Data:{' '}
              {data.providers[0].sensors[0].publicAccess ? 'true' : 'false'}
            </Text>
          </View>
        ) : loading ? (
          <React.Fragment>
            <ActivityIndicator color="blue" size="large" />
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          </React.Fragment>
        ) : (
          <Text>{error}</Text>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    top: '80%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    fontSize: 20
  }
});
