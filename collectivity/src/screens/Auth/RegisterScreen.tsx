import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../stores/authStore';
import { useTheme } from '../../hooks';
import { Block, Button, Input, Text } from '../../components';
import * as regex from '../../constants/regex';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { colors, sizes } = useTheme();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const validateName = (text: string) => {
    setName(text);
    if (text && text.length < 2) {
      setErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

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

    // Re-validate confirm password
    if (confirmPassword && text !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text && text !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleRegister = async () => {
    // Validate fields
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (errors.name || errors.email || errors.password || errors.confirmPassword) {
      Alert.alert('Error', 'Please fix the errors before submitting');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
      // Navigation will be handled automatically by RootNavigator
    } catch (error) {
      Alert.alert('Registration Failed', 'Unable to create account. Please try again.');
    }
  };

  return (
    <Block flex={1} color={colors.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Block paddingHorizontal={sizes.padding}>
          {/* Header */}
          <Block marginTop={sizes.xl} marginBottom={sizes.l}>
            <Text h2 semibold color={colors.text as string}>
              Create Account
            </Text>
            <Text p color={colors.gray as string} marginTop={sizes.s}>
              Sign up to get started
            </Text>
          </Block>

          {/* Name Input */}
          <Input
            autoCapitalize="words"
            marginBottom={sizes.m}
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={validateName}
            success={Boolean(name && !errors.name)}
            danger={Boolean(errors.name)}
          />
          {errors.name ? (
            <Text p color={colors.danger as string} marginBottom={sizes.s}>
              {errors.name}
            </Text>
          ) : null}

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

          {/* Confirm Password Input */}
          <Input
            secureTextEntry
            autoCapitalize="none"
            marginBottom={sizes.m}
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            success={Boolean(confirmPassword && !errors.confirmPassword)}
            danger={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword ? (
            <Text p color={colors.danger as string} marginBottom={sizes.s}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          {/* Register Button */}
          <Button
            onPress={handleRegister}
            marginTop={sizes.m}
            marginBottom={sizes.sm}
            disabled={isLoading}
          >
            <Text bold white transform="uppercase">
              {isLoading ? 'Creating Account...' : 'Register'}
            </Text>
          </Button>

          {/* Login Link */}
          <Block row center marginTop={sizes.m}>
            <Text p color={colors.gray as string}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text p semibold color={colors.primary as string}>
                Login
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

export default RegisterScreen;
