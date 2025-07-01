import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {FILE_URL} from '../../utils/config';
import {useNavigation} from '@react-navigation/native';

const ProductCard = ({product}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('ProductDetails', {
          product: product,
        });
      }}>
      <View style={styles.leftContainer}>
        <Image
          source={{uri: `${FILE_URL}/product/${product.logo}`}}
          style={styles.productImage}
        />
        <View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.hsnCode}>
            HSN CODE: {product.hsnCode || 'NA'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddProduct', {product: product, mode: 'edit'});
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
    color: colors.inputBackground,
  },
  hsnCode: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.inputBackground + '80',
  },
});

export default ProductCard;
