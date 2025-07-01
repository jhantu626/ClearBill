import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Children} from 'react';
import {colors} from '../../utils/colors';

const Layout = ({children}) => {
  // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
      }}>
      {/* <StatusBar barStyle={'dark-content'} /> */}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Layout;
