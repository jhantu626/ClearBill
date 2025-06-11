import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fonts} from '../../utils/fonts';
import { colors } from '../../utils/colors';

const ProductCard = () => {
  return (
    <Pressable style={styles.container} onPress={()=>{
        console.log("fuck you");
    }}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./../../../assets/images/product.png')}
          style={styles.productImage}
        />
        <View>
          <Text style={styles.productName}>Product Name</Text>
          <Text style={styles.hsnCode}>HSN CODE: 14589248</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>{
        console.log("fuck you beach")
      }}>
        <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: 56,
    height: 56,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productName: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.inputBackground
  },
  hsnCode:{
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.inputBackground+"80"
  }
});

export default ProductCard;
