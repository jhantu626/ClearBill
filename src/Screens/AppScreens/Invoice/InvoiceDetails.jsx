import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import {PrimaryDivider, SecondaryHeader} from '../../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import {FILE_URL} from '../../../utils/config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {
  invoicePDFTemplate,
  printBill,
  printInvoice,
} from '../../../utils/InvoiceTemplate';

const InvoiceDetails = () => {
  const route = useRoute();

  const {invoice} = route.params;

  const handleGeneratePrint = async () => {
    await printBill(invoice);
  };

  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Invoice Details" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {/* Customer Section */}={' '}
        <View style={styles.customerParentContainer}>
          <Text style={styles.titleText}>Customer</Text>
          <View style={styles.customerContainer}>
            <View style={styles.customerIcon}>
              <Ionicons name="business-outline" size={24} />
            </View>
            <View style={styles.customerContentContainer}>
              <Text style={styles.customerNameText}>
                {invoice.customerName}
              </Text>
              <Text style={styles.customerphoneText}>
                +91 {invoice.customerMobile}
              </Text>
              {invoice.customerGstNo && (
                <Text style={styles.customerphoneText}>
                  {invoice.customerGstNo}
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* Invoice Items Section */}
        <View style={styles.customerParentContainer}>
          <Text style={styles.titleText}>Invoice Items</Text>
          <View style={styles.itemsParentContainer}>
            {invoice.items.map((item, index) => (
              <View style={styles.itemsContainer}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: `${FILE_URL}/product/${item.logo}`,
                  }}
                />
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.quantityText}>
                    Quantity: {item.quantity} Rate: {item.price}
                  </Text>
                  <Text style={styles.quantityText}>GST: {item.totalGst}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Summary Section */}
        <View style={styles.customerParentContainer}>
          <Text style={styles.titleText}>Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Sub Total</Text>
              <Text style={styles.summaryText}>₹{invoice.subTotalAmount}</Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Discount</Text>
              <Text style={styles.summaryText}>₹{invoice.totalDiscount}</Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>GST</Text>
              <Text style={styles.summaryText}>{invoice.totalGst}</Text>
            </View>
            <PrimaryDivider />
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Total</Text>
              <Text style={styles.summaryText}>₹{invoice.totalAmount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={async () => {
              await printInvoice(invoice);
            }}>
            <Text style={styles.btnText}>Print PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={handleGeneratePrint}>
            <AntDesign name="printer" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Feather name="share-2" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: fonts.semibold,
  },
  customerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  customerIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.inputBackground + 50,
    borderRadius: 10,
  },
  customerContentContainer: {},
  customerNameText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.medium,
  },
  customerphoneText: {
    fontSize: 14,
    color: colors.inputBackground,
    fontFamily: fonts.medium,
    marginTop: -2,
  },
  customerParentContainer: {
    gap: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
  },
  quantityText: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: colors.inputBackground,
    marginTop: -4,
  },
  itemsParentContainer: {
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
  summaryContainer: {
    gap: 5,
  },
  btnContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
  },
  btnContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.inputBackground + 70,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.medium,
  },
});

export default InvoiceDetails;
