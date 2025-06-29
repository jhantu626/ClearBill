import {Settings, StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  AddBusiness,
  AddProducts,
  CreateInvoice,
  CreateUser,
  Home,
  Invoice,
  Otp,
  ProductDetails,
  Products,
  Setting,
  Signin,
  SplashScreen,
  UserAccount,
  Users,
  ValidateOtp,
} from './Screens';
import AuthProvider, {useAuth} from './Context/AuthContext';
import {colors} from './utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from './utils/fonts';
import AccessProvider from './Context/AccessContext';

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

  const InoviceStack = () => (
    <Stack.Navigator
      initialRouteName="CreateInvoice"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
    </Stack.Navigator>
  );

  const ProductStack = () => (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Product" component={Products} />
      <Stack.Screen name="AddProduct" component={AddProducts} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );

  const SettingStack = () => (
    <AccessProvider>
      <Stack.Navigator
        initialRouteName="Setting"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="AddBusiness" component={AddBusiness} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="ValidateOtp" component={ValidateOtp} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
      </Stack.Navigator>
    </AccessProvider>
  );

  const AppStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Invoice"
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
          component={InoviceStack}
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
