import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {
  DefaultInput,
  PrimaryDivider,
  SecondaryHeader,
} from '../../../Components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const CreateInvoice = () => {
  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Create Invoice" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <DefaultInput placeholder="Customer Number" />
        <DefaultInput placeholder="Customer Name" />
        <DefaultInput placeholder="GST No(Optional)" />
        <View style={styles.itemsContainer}>
          <Text style={styles.itemTitle}>Items</Text>
          <View style={styles.selectedItemsContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.itemText}>Product 1</Text>
              <Text style={styles.itemSubText}>Quantity: 2, Rate: 50</Text>
            </View>
            <Text style={styles.priceText}>₹100</Text>
          </View>
          <View style={styles.selectedItemsContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.itemText}>Product 1</Text>
              <Text style={styles.itemSubText}>Quantity: 2, Rate: 50</Text>
            </View>
            <Text style={styles.priceText}>₹100</Text>
          </View>
          <TouchableOpacity style={styles.addItemBtn}>
            <Text style={styles.addItemBtnText}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemTitle}>Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.subSummaryCOntainer}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>₹150</Text>
          </View>
          <View style={styles.subSummaryCOntainer}>
            <Text style={styles.summaryText}>Discount</Text>
            <Text style={styles.summaryText}>₹150</Text>
          </View>
          <View style={styles.subSummaryCOntainer}>
            <Text style={styles.summaryText}>CGST/SGST</Text>
            <Text style={styles.summaryText}>₹28</Text>
          </View>
          <PrimaryDivider />
          <View style={styles.subSummaryCOntainer}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>₹150</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.createInvoiceBtn}>
          <Text style={styles.createInvoiceBtnText}>Create Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    paddingBottom: 50,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    // gap: 3
  },
  itemText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
  },
  itemSubText: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: colors.inputBackground,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#000',
  },
  priceText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.semibold,
  },
  itemsContainer: {
    gap: 10,
  },
  addItemBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
  },
  addItemBtnText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000',
  },
  summaryContainer: {
    gap: 10,
  },
  subSummaryCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 14,
    color: colors.inputBackground,
    fontFamily: fonts.medium,
  },
  createInvoiceBtn: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  createInvoiceBtnText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#fff',
  },
});

export default CreateInvoice;
