import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Layout from '../../Layout/Layout';
import {
  FloatingAddButton,
  ProductCard,
  ProductCardShimmer,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {productService} from '../../../Services/ProductService';
import {useAuth} from '../../../Context/AuthContext';

const Products = () => {
  const navigation = useNavigation();

  // AUTH CONTEXT
  const {authToken} = useAuth();

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const navigateToAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts({
        authToken: authToken,
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        data={isLoading ? [0, 1, 2, 3, 4, 5] : filteredProducts}
        keyExtractor={(item, index) => 'Product-' + index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'column', gap: 10}}>
            <SearchInput
              value={search}
              setValue={setSearch}
              disable={isLoading}
            />
            <Text style={styles.headerText}>All Products</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) =>
          isLoading ? (
            <ProductCardShimmer />
          ) : (
            <ProductCard product={item.item} />
          )
        }
        ListEmptyComponent={() => {
          return (
            !isLoading && (
              <View style={styles.emptyContainer}>
                <Image
                  style={styles.emptyImage}
                  source={require('./../../../../assets/images/empty.webp')}
                />
              </View>
            )
          );
        }}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyImage: {
    width: 200,
    height: 200,
  },
});

export default Products;
