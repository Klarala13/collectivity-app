import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../hooks';
import * as regex from '../constants/regex';
import {Button, Input} from '../components';
import Container from '../components/Container';
import {View, Alert} from 'react-native';

const Login = () => {
  //Should call BE and handle login
  const [isValid, setIsValid] = useState<any>({
    email: false,
    password: false,
  });
  const [login, setLogin] = useState<any>({
    email: '',
    password: '',
  });
  const {sizes} = useTheme();

  const handleChange = useCallback(
    (value: any) => {
      setLogin((state) => ({...state, ...value}));
    },
    [setLogin],
  );

  const handleLogin = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      createButtonAlert();
    }
  }, [isValid, login]);

  const createButtonAlert = () =>
    Alert.alert('Logged In!', 'Congratulations, you are now logged', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(login.email),
      password: regex.password.test(login.password),
    }));
  }, [login, setIsValid]);

  return (
    <>
      <Container>
        <Input
          autoCapitalize="none"
          marginBottom={sizes.m}
          label={'Email'}
          keyboardType="email-address"
          placeholder={'email'}
          success={Boolean(login.email && isValid.email)}
          danger={Boolean(login.email && !isValid.email)}
          onChangeText={(value) => handleChange({email: value})}
          style={{paddingBottom: 50}}
        />
        <Input
          secureTextEntry
          autoCapitalize="none"
          marginBottom={sizes.m}
          label={'Password'}
          placeholder={'password'}
          onChangeText={(value) => handleChange({password: value})}
          success={Boolean(login.password && isValid.password)}
          danger={Boolean(login.password && !isValid.password)}
        />
      </Container>
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
          justifyContent: 'center',
        }}>
        <Button
          bgColor="#7925C7"
          hoverColor="#7925C7"
          hoverBgColor="#CCCCCC"
          onPress={() => handleLogin()}
          title="Login"
        />
      </View>
    </>
  );
};

export default Login;
