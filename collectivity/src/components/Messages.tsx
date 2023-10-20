import { Block } from ".";
import { Text, StyleSheet } from "react-native";

export default function Messaging() {
  //retrieve user´s messages from BE
  //Display list of user´s messages
  return (
    <Block>
      <Text style={styles.text}>{"Welcome to your messages"}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginTop: 20,
  },
});
