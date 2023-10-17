import {Text, Image} from 'react-native';
import Container from '../components/Container';

const Home = () => {
  return (
    <>
      <Image source={{uri: '../../assets/images/logo.png'}} />
      <Container>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
          }}>
          Welcome to Collectivity
        </Text>
      </Container>
      <Text
        style={{
          textAlign: 'left',
          color: '#000',
          fontSize: 18,
          padding: 20,
        }}>
        This is an app for sharing or donating items, the idea is that we reuse
        things and don´t have to buy them all the time. That way, we can fight
        capitalism a little bit
      </Text>
    </>
  );
};

export default Home;
