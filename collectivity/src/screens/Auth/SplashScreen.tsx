import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../stores/authStore';
import { useTheme } from '../../hooks';
import { Block, Image } from '../../components';

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { colors } = useTheme();
  const loadToken = useAuthStore((state) => state.loadToken);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await loadToken();
        
        // Wait 1.5 seconds to show splash
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check auth state after loading token
        const currentAuthState = useAuthStore.getState().isAuthenticated;
        
        if (!currentAuthState) {
          navigation.replace('Login');
        }
        // If authenticated, the user will see the main app through RootNavigator
      } catch (error) {
        console.error('Error checking auth:', error);
        navigation.replace('Login');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []); // Run only once on mount

  return (
    <Block flex={1} center align="center" justify="center" color={colors.primary}>
      <Image
        source={require('../../image/logo.png')}
        style={styles.logo}
      />
      <ActivityIndicator 
        size="large" 
        color={colors.white} 
        style={styles.loader}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
