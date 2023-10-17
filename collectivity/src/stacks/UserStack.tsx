import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import ItemsList from '../screens/ItemsList';
import Messaging from '../screens/MessagingScreen';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <View style={{flexDirection: 'row'}}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} />
      <Stack.Screen
        name="ItemsList"
        component={ItemsList}
        options={{title: 'Items to share'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{title: 'Message'}}
      />
    </Stack.Navigator>
  </View>
);

export default HomeStack;
