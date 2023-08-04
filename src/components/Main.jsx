import React from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import ItemsList from "./ItemsList";

const Main = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight + 2, flexGrow: 1}}>
          <Text style={{ textAlign: "center"}}>Welcome to Collectivity</Text>
          <Text>Here you can share your time or your things, you can also ask for them.</Text>
          <ItemsList />
        </View>
      );
}

export default Main;