import {Settings, StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  AddBusiness,
  AddProducts,
  Home,
  Invoice,
  Otp,
  Products,
  Setting,
  Signin,
  SplashScreen,
  Users,
} from './Screens';
import AuthProvider, {useAuth} from './Context/AuthContext';
import {colors} from './utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from './utils/fonts';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    );
  };

  const ProductStack = () => (
    <Stack.Navigator initialRouteName="Product" screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen name="Product" component={Products} />
      <Stack.Screen name="AddProduct" component={AddProducts} />
    </Stack.Navigator>
  );

  const SettingStack=()=>(
    <Stack.Navigator initialRouteName="Users" screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="AddBusiness" component={AddBusiness} />
    </Stack.Navigator>
  )

  const AppStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Setting"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          animation: 'shift',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            paddingVertical: 20,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.medium,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <Octicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Invoice"
          component={Invoice}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="receipt-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Product"
          component={ProductStack}
          options={{
            tabBarIcon: ({color}) => (
              <AntDesign name="inbox" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingStack}
          options={{
            tabBarIcon: ({color}) => (
              <AntDesign name="setting" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AppNav = () => {
    const {authToken} = useAuth();
    return (
      <NavigationContainer>
        {authToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
