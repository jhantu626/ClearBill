import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const UserCard = ({personData = {}, key}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      key={key}
      onPress={() => {
        navigation.navigate('UserAccount', {user: personData});
      }}>
      <View style={styles.leftCOntainer}>
        <View style={styles.personContainer}>
          <Ionicons name="person" size={40} color={'#000'} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.nameText}>
            {personData.name || personData.role}
          </Text>
          <Text style={styles.subText}>
            {personData.phone || '+91 1234567890'}
          </Text>
          <Text style={styles.subText}>{personData.email}</Text>
        </View>
      </View>
      <Text style={styles.adminText}>{personData.role}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leftCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  personContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8C9A4',
    borderRadius: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  subText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.inputBackground,
    marginTop: -3,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  adminText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
});

export default UserCard;
