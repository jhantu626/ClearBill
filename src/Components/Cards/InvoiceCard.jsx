import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const InvoiceCard = ({key}) => {
  return (
    <View style={styles.container} key={key+" Invoice"}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameText}>Emily Carter</Text>
        <Text style={styles.invText}>Invoice #12345</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.viewBtn}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    gap: -5,
  },
  nameText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#000000',
  },
  invText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.inputBackground,
  },
  viewBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.primaryBackground,
    borderRadius: 8,
  },
  viewText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});

export default InvoiceCard;
