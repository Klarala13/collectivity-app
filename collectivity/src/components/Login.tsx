import React, {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '../hooks';
import * as regex from '../constants/regex';
import {Button, Image} from '.';
import {Text} from 'react-native';
import Container from './Container';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Login = () => {
  //Should call BE and handle login
  //validation
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  // const handleChange = useCallback(
  //   (value) => {
  //     setRegistration((state) => ({...state, ...value}));
  //   },
  //   [setRegistration],
  // );

  const handleLogin = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Container>
      <Image
        background
        resizeMode="cover"
        padding={sizes.sm}
        radius={sizes.cardRadius}
        source={assets.background}
        height={sizes.height * 0.3}>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
        <Text>Login</Text>
      </Image>
    </Container>
  );
};

export default Login;
