import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItemForm from "./AddItemForm";
import Profile from "./Profile";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Block } from "../components";
import ItemsList from "./ItemsList";
import Home from "../Home";
import Login from "./Login";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <>
      <Block
        style={{
          backgroundColor: "#7925C7",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: "#7925C7",
              tabBarInactiveTintColor: "#000",
            }}
          >
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <FontAwesome5 name="home" size={24} color="#7925C7" />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <FontAwesome5 name="list" size={24} color="#7925C7" />
                ),
              }}
              name="Item´s List"
              component={ItemsList}
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
                  <AntDesign name="user" size={24} color="#7925C7" />
                ),
              }}
              name="Profile"
              component={Profile}
            />
            <Tab.Screen
              options={{
                tabBarIcon: () => (
                  <AntDesign name="login" size={24} color="#7925C7" />
                ),
              }}
              name="Login"
              component={Login}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Block>
    </>
  );
};

export default HomeScreen;
