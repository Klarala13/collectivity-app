import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

const Container = ({ children }: { children: ReactNode }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      borderColor: "#7925C7",
      borderWidth: 1,
      borderRadius: 15,
      margin: "auto",
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
    },
  });
  return <View style={styles.container}>{children}</View>;
};

export default Container;
