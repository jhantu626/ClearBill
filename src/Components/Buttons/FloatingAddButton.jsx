import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../utils/colors';

const FloatingAddButton = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.floatingBtn} onPress={onPress}>
      <Entypo name="add-to-list" size={24} color={'#fff'} />
    </TouchableOpacity>
  );
};

export default FloatingAddButton;

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
