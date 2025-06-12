import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {DefaultInput, SecondaryHeader} from '../../../Components';
import UploadInput from '../../../Components/Input/UploadInput';
import { colors } from '../../../utils/colors';

const AddProducts = () => {
  return (
    <Layout>
      <SecondaryHeader title="Add Product" navigation="back" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <DefaultInput placeholder="Enter Product Name" />
        <DefaultInput placeholder="Enter HSN Code" />
        <DefaultInput placeholder="Enter Price" />
        <DefaultInput placeholder="Enter Tax Rate" />
        <UploadInput
          title={'Upload Product Name'}
          subTitle={'Tap to upload an image of the product'}
        />
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.btnText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 15,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  btnText:{
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  }
});

export default AddProducts;
