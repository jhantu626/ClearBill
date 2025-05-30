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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: colors.secondary,
      }}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Layout;
