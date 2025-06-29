import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const PrimaryDivider = () => {
  return <View style={styles.primaryDivider} />;
};

const styles = StyleSheet.create({
  primaryDivider: {
    height: 1,
    backgroundColor: colors.inputBackground+70,
  },
});

export default PrimaryDivider;
