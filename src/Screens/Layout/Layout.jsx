import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Children} from 'react';
import {colors} from '../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = ({children}) => {
  // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
      }}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Layout;
