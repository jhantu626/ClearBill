import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} />
      <TextInput
        style={styles.inputBox}
        placeholder="Search"
        selectionColor={colors.primary}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.itemBackgrounds,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10
  },
  inputBox: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});
