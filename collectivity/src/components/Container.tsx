import {View, StyleSheet} from 'react-native';

const Container = (children: any) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderColor: '#7925C7',
      borderRadius: 15,
    },
  });
  return <View style={styles.container}>{children}</View>;
};

export default Container;
