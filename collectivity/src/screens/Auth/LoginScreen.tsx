import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../stores/authStore';
import { useTheme } from '../../hooks';
import { Block, Button, Input, Text } from '../../components';
import * as regex from '../../constants/regex';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colors, sizes } = useTheme();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !regex.email.test(text)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text && !regex.password.test(text)) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = async () => {
    // Validate fields
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (errors.email || errors.password) {
      Alert.alert('Error', 'Please fix the errors before submitting');
      return;
    }

    try {
      await login(email, password);
      // Navigation will be handled automatically by RootNavigator
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Block flex={1} color={colors.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Block paddingHorizontal={sizes.padding}>
          {/* Header */}
          <Block marginTop={sizes.xxl} marginBottom={sizes.l}>
            <Text h2 semibold color={colors.text as string}>
              Welcome Back
            </Text>
            <Text p color={colors.gray as string} marginTop={sizes.s}>
              Sign in to continue
            </Text>
          </Block>

          {/* Email Input */}
          <Input
            autoCapitalize="none"
            marginBottom={sizes.m}
            label="Email"
            keyboardType="email-address"
            placeholder="your@email.com"
            value={email}
            onChangeText={validateEmail}
            success={Boolean(email && !errors.email)}
            danger={Boolean(errors.email)}
          />
          {errors.email ? (
            <Text p color={colors.danger as string} marginBottom={sizes.s}>
              {errors.email}
            </Text>
          ) : null}

          {/* Password Input */}
          <Input
            secureTextEntry
            autoCapitalize="none"
            marginBottom={sizes.m}
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={validatePassword}
            success={Boolean(password && !errors.password)}
            danger={Boolean(errors.password)}
          />
          {errors.password ? (
            <Text p color={colors.danger as string} marginBottom={sizes.s}>
              {errors.password}
            </Text>
          ) : null}

          {/* Login Button */}
          <Button
            onPress={handleLogin}
            marginTop={sizes.m}
            marginBottom={sizes.sm}
            disabled={isLoading}
          >
            <Text bold white transform="uppercase">
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </Button>

          {/* Register Link */}
          <Block row center marginTop={sizes.m}>
            <Text p color={colors.gray as string}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text p semibold color={colors.primary as string}>
                Register
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
