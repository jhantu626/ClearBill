import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader} from '../../../Components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const ProductDetails = () => {
  return (
    <Layout>
      <SecondaryHeader title="Product Details" navigation="back" />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.productImage}
            source={require('./../../../../assets/images/product.png')}
          />
        </View>
        <Text style={styles.nameText}>Product Name</Text>
        <Text style={styles.descriptionText}>Product Description</Text>
        <Text style={styles.discountText}>₹250</Text>
        <Text style={styles.discountText}>10% OFF</Text>
        <View style={styles.productInformationContainer}>
          <Text style={styles.titleText}>Product Information</Text>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>Taxable</Text>
              <Text style={styles.valueText}>True</Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>HSN Code</Text>
              <Text style={styles.valueText}>123456</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>CGst</Text>
              <Text style={styles.valueText}>9%</Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>SGst</Text>
              <Text style={styles.valueText}>9%</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>IGst</Text>
              <Text style={styles.valueText}>0%</Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>Unit</Text>
              <Text style={styles.valueText}>PCS</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 250,
    height: 250,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inputBackground + 50,
  },
  nameText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.inputBackground + 90,
  },
  discountText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.inputBackground,
  },
  productInformationContainer: {
    marginVertical: 10,
    gap: 10,
  },
  titleText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#000',
  },
  subInformationContainer: {
    flexDirection: 'row',
    gap: 120,
  },
  informationTitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.inputBackground,
  },
  valueText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
  },
  editBtn: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50
  },
  btnText:{
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#fff'
  }
});

export default ProductDetails;
