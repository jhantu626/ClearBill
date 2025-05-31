import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';

const SecondaryHeader = ({
  navigation = 'simple',
  title = '',
  isAddbtn = false,
}) => {
  const toNavigation = useNavigation();
  return (
    <View style={styles.container}>
      {navigation === 'simple' ? (
        <FontAwesome6 name="bars-staggered" size={24} color="black" />
      ) : navigation === 'back' ? (
        <TouchableOpacity
          onPress={() => {
            if (toNavigation.canGoBack()) {
              toNavigation.goBack();
            }
          }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity>
        {isAddbtn && <Ionicons name="add-outline" size={24} color="black" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
});

export default SecondaryHeader;
