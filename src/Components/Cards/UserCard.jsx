import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const UserCard = (person = {}, key) => {
  return (
    <TouchableOpacity style={styles.container} key={key}>
      <View style={styles.leftCOntainer}>
        <View style={styles.personContainer}>
          <Ionicons name="person" size={40} color={'#000'} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.nameText}>Pritam Bala</Text>
          <Text style={styles.subText}>+91 9775746484</Text>
          <Text style={styles.subText}>pritambala626@gmail.com</Text>
        </View>
      </View>
      <Text style={styles.adminText}>ADMIN</Text>
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
