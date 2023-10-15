import {Block} from '../components';
import {Text, StyleSheet} from 'react-native';

export default function Messaging() {
  return (
    <Block>
      <Text style={styles.text}>{'Welcome to your messages'}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    marginTop: 20,
  },
});
