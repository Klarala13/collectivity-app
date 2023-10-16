import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddItemForm from './AddItemForm';
import MessagingScreen from './MessagingScreen';
import Profile from './Profile';
import Container from '../components/Container';
import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import {Block} from '../components';

const Tab = createBottomTabNavigator();

const Home = () => {
  //Add products List

  return (
    <>
      <Container>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
          }}>
          Welcome to Collectivity
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 16,
          }}>
          This is an app for sharing or donating items, the idea is that we
          reuse things and don´t have to buy them all the time. That way, we can
          fight capitalism a little bit
        </Text>
      </Container>

      <Block
        style={{
          backgroundColor: '#7925C7',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: '#7925C7',
              tabBarInactiveTintColor: '#000',
            }}>
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <AntDesign name="user" size={24} color="#7925C7" />
                ),
              }}
              name="Profile"
              component={Profile}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <FontAwesome5 name="plus" size={24} color="#7925C7" />
                ),
              }}
              name="AddItem"
              component={AddItemForm}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <AntDesign name="message1" size={24} color="#7925C7" />
                ),
              }}
              name="Messaging"
              component={MessagingScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Block>
    </>
  );
};

export default Home;
