import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../hooks';
import AddItemForm from './AddItemForm';
import MessagingScreen from './MessagingScreen';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

import {Block, Image} from '../components';

const Home = () => {
  //Add products List
  const {icons} = useTheme();

  return (
    <>
      <Block style={{backgroundColor: '#fff', marginTop: 100}}>
        <Text style={{textAlign: 'center', color: '#000', fontSize: 32}}>
          Welcome to Collectivity
        </Text>
        <Text style={{textAlign: 'center', color: '#000', fontSize: 24}}>
          This is an app for sharing or donating items, the idea is that we
          reuse things and don´t have to buy them all the time. That way, we can
          fight capitalism a little bit
        </Text>
      </Block>

      <Block
        style={{
          backgroundColor: '#7925C7',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: true}}>
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <Image source={icons.register} color={'#7925C7'} />
                ),
              }}
              name="User"
              component={Profile}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <Image source={icons.image} color={'#7925C7'} />
                ),
              }}
              name="AddItem"
              component={AddItemForm}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <Image source={icons.chat} color={'#7925C7'} />
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
