import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';

export default function App() {
  const isHermes = () => !!global.HermesInternal;
  
  return (
    <View style={styles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
