import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {convertInvoiceDate, convertInvoiceDate12Hour} from '../../utils/util';
import {printBill} from '../../utils/InvoiceTemplate';

const InvoiceCard = ({invoice}) => {
  const itemCount = invoice.items?.length || 0;

  const handlePrnt = async () => {
    try {
      await printBill(invoice);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameText}>
          {invoice.customerName.length > 15
            ? invoice.customerName.slice(0, 15) + '...'
            : invoice.customerName}
        </Text>
        <Text style={styles.invText}>
          {invoice.name}-{invoice.id} • {itemCount} items • ₹
          {invoice.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.metaText}>
          Created At {convertInvoiceDate12Hour(invoice.createdAt)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[
            styles.viewBtn,
            {backgroundColor: colors.primaryBackground, paddingHorizontal: 15},
          ]}>
          <FontAwesome name="share" size={18} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewBtn} onPress={handlePrnt}>
          <FontAwesome name="print" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#000',
  },
  invText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.inputBackground,
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#666',
    marginTop: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  viewBtn: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: '#c9f2fc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000',
  },
});

export default InvoiceCard;
