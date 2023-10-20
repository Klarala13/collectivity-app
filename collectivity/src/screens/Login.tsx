import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "../hooks";
import * as regex from "../constants/regex";
import { Button, Input } from "../components";
import Container from "../components/Container";
import { View, Alert, Text } from "react-native";
//import Register from "./Register";

const Login = () => {
  //Should call BE and handle login
  const [showRegister, setShowRegister] = useState(false);
  const [isValid, setIsValid] = useState<any>({
    email: false,
    password: false,
  });
  const [login, setLogin] = useState<any>({
    email: "",
    password: "",
  });
  const { sizes } = useTheme();

  const handleChange = useCallback(
    (value: any) => {
      setLogin((state: any) => ({ ...state, ...value }));
    },
    [setLogin]
  );

  const handleLogin = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      createButtonAlert();
    }
  }, [isValid, login]);

  const createButtonAlert = () =>
    Alert.alert("Logged In!", "Congratulations, you are now logged", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  useEffect(() => {
    setIsValid((state: any) => ({
      ...state,
      email: regex.email.test(login.email),
      password: regex.password.test(login.password),
    }));
  }, [login, setIsValid]);

  const displayRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      <View>
        {!showRegister && (
          <>
            <Container>
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={"Email"}
                keyboardType="email-address"
                placeholder={"email"}
                success={Boolean(login.email && isValid.email)}
                danger={Boolean(login.email && !isValid.email)}
                onChangeText={(value) => handleChange({ email: value })}
                style={{ paddingBottom: 50 }}
              />
              <Input
                secureTextEntry
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={"Password"}
                placeholder={"password"}
                onChangeText={(value) => handleChange({ password: value })}
                success={Boolean(login.password && isValid.password)}
                danger={Boolean(login.password && !isValid.password)}
              />
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
                hoverBgColor="#CCCCCC"
                onPress={() => handleLogin()}
                title="Login"
              />
            </View>
          </>
        )}
      </View>
      {/* <Container>
        <Text>Don´t have an account yet?</Text>
        <Button
          bgColor="#7925C7"
          hoverBgColor="#CCCCCC"
          onPress={() => displayRegister()}
          title="Click here to register!"
        />
      </Container>
      <View>{showRegister && <Register />}</View> */}
    </>
  );
};

export default Login;
