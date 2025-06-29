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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InvoiceCard = ({}) => {
  return (
    <View style={styles.container} key={Math.random()}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameText}>Emily Carter</Text>
        <Text style={styles.invText}>Invoice #12345</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[
            styles.viewBtn,
            {backgroundColor: colors.primaryBackground, paddingHorizontal: 15},
          ]}>
          <FontAwesome name="share" size={20} color="#000" />
        </TouchableOpacity>
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  viewBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#c9f2fc',
    borderRadius: 8,
  },
  viewText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000',
  },
});

export default InvoiceCard;
