import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const DefaultInput = ({
  value,
  setValue,
  placeholder = 'Enter your email',
  keyboardType = 'default',
  maxLength,
  height = 55,
}) => {
  return (
    <View style={[styles.container, {height: height}]}>
      <TextInput
        style={styles.inputContainer}
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={'#61758A'}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 55,
    width: '100%',
    borderRadius: 8,
    // backgroundColor: colors.inputBackground,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});

export default DefaultInput;
