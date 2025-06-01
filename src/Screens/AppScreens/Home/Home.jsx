import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useAuth } from '../../../Context/AuthContext';

const Home = () => {
  const {logout}=useAuth()
  return (
    <View>
      <Pressable
        onPress={async() => {
          console.log('logout');
          await logout()
        }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
