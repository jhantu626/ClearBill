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
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {FILE_URL} from '../../../utils/config';

const ProductDetails = () => {
  // NAVIGATION
  const navigation = useNavigation();

  const route = useRoute();
  console.log(route);
  const {product} = route.params || {};
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
            source={{uri: FILE_URL + `/product/${product.logo}`}}
          />
        </View>
        <Text style={styles.nameText}>{product.name}</Text>
        <Text style={styles.descriptionText}>
          {product.description || 'NA'}
        </Text>
        <Text style={styles.discountText}>₹{product.price}</Text>
        <Text style={styles.discountText}>{product.discount}% OFF</Text>
        <View style={styles.productInformationContainer}>
          <Text style={styles.titleText}>Product Information</Text>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>Taxable</Text>
              <Text style={styles.valueText}>
                {product.isTaxable ? 'GST' : 'Non-GST'}
              </Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>HSN Code</Text>
              <Text style={styles.valueText}>
                {product.isTaxable ? product.hsnCode : 'NA'}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>CGst</Text>
              <Text style={styles.valueText}>{product.cgst}%</Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>SGst</Text>
              <Text style={styles.valueText}>{product.sgst}%</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.subInformationContainer}>
            <View>
              <Text style={styles.informationTitle}>IGst</Text>
              <Text style={styles.valueText}>{product.igst}%</Text>
            </View>
            <View>
              <Text style={styles.informationTitle}>Unit</Text>
              <Text style={styles.valueText}>{product.unitType}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            navigation.navigate('AddProduct', {product: product, mode: 'edit'});
          }}>
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
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  btnText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#fff',
  },
});

export default ProductDetails;
