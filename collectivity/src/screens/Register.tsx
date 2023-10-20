import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "../hooks";
import * as regex from "../constants/regex";
import { Block, Input, Button } from "../components";
import { View, Alert, Text } from "react-native";
import Container from "../components/Container";

interface IRegistration {
  name: string;
  email: string;
  password: string;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
}

const Register = () => {
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: "",
    email: "",
    password: "",
  });
  const { sizes } = useTheme();

  const handleChange = useCallback(
    (value: any) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration]
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      console.log("handleSignUp", registration);
      createButtonAlert();
    }
  }, [isValid, registration]);

  const createButtonAlert = () =>
    Alert.alert("Registered!", "Congratulations, you are now registered", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
    }));
  }, [registration, setIsValid]);

  return (
    <>
      <Container>
        <Block paddingHorizontal={sizes.s}>
          <Block keyboard marginTop={-(sizes.height * 0.2 - sizes.l)}>
            <Block paddingHorizontal={sizes.sm}>
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={"Name"}
                placeholder={"name"}
                success={Boolean(registration.name && isValid.name)}
                danger={Boolean(registration.name && !isValid.name)}
                onChangeText={(value) => handleChange({ name: value })}
              />
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={"Email"}
                keyboardType="email-address"
                placeholder={"email"}
                success={Boolean(registration.email && isValid.email)}
                danger={Boolean(registration.email && !isValid.email)}
                onChangeText={(value) => handleChange({ email: value })}
              />
              <Input
                secureTextEntry
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={"Password"}
                placeholder={"password"}
                onChangeText={(value) => handleChange({ password: value })}
                success={Boolean(registration.password && isValid.password)}
                danger={Boolean(registration.password && !isValid.password)}
              />
            </Block>
          </Block>
        </Block>
      </Container>
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <Button
          bgColor="#7925C7"
          color="#fff"
          hoverColor="#7925C7"
          hoverBgColor="#CCCCCC"
          onPress={() => handleSignUp()}
          title="Login"
        />
      </View>
    </>
  );
};

export default Register;
