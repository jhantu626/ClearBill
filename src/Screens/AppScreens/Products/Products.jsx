import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {
  FloatingAddButton,
  ProductCard,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const Products = () => {
  const navigation = useNavigation();

  const restaurantProducts = [
    {name: 'Margherita Pizza', hsnCode: '996331', price: 250},
    {name: 'Paneer Butter Masala', hsnCode: '996331', price: 180},
    {name: 'Chicken Biryani', hsnCode: '996331', price: 220},
    {name: 'Veg Fried Rice', hsnCode: '996331', price: 150},
    {name: 'Masala Dosa', hsnCode: '996331', price: 100},
    {name: 'Tandoori Roti', hsnCode: '996331', price: 20},
    {name: 'Butter Naan', hsnCode: '996331', price: 30},
    {name: 'Cold Coffee', hsnCode: '996331', price: 90},
    {name: 'Gulab Jamun', hsnCode: '996331', price: 60},
    {name: 'Ice Cream Sundae', hsnCode: '996331', price: 120},
    {name: 'Chicken Tikka', hsnCode: '996331', price: 200},
    {name: 'Spring Rolls', hsnCode: '996331', price: 140},
    {name: 'Caesar Salad', hsnCode: '996331', price: 130},
    {name: 'Lemon Soda', hsnCode: '996331', price: 40},
    {name: 'Pav Bhaji', hsnCode: '996331', price: 110},
  ];

  const navigateToAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <Layout>
      <SecondaryHeader
        navigation="back"
        title="Products"
        isAddbtn={true}
        addBtnFunction={navigateToAddProduct}
      />
      {/* <SearchInput /> */}
      <FlatList
        data={restaurantProducts}
        keyExtractor={(item, index) => item.name + index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'column', gap: 10}}>
            <SearchInput />
            <Text style={styles.headerText}>All Products</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => <ProductCard />}
      />
      <FloatingAddButton onPress={navigateToAddProduct} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 80,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});

export default Products;
