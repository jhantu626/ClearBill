import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
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
    setIsLoading(true);
    try {
      const data = await productService.getProducts({
        authToken: authToken,
      });
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, []),
  );

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter(product => 
      product?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const SearchInputHeader = useMemo(
    () => (
      <View style={{flexDirection: 'column', gap: 10}}>
        <SearchInput 
          value={search} 
          setValue={setSearch} 
          disable={isLoading} 
          placeholder="Search products..."
        />
        <Text style={styles.headerText}>All Products</Text>
      </View>
    ),
    [search, setSearch, isLoading],
  );

  return (
    <Layout>
      <SecondaryHeader
        navigation="back"
        title="Products"
        isAddbtn={true}
        addBtnFunction={navigateToAddProduct}
      />
      
      <FlatList
        data={isLoading ? Array(6).fill(0) : filteredProducts}
        keyExtractor={(item, index) => 'Product-' + index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={SearchInputHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) =>
          isLoading ? (
            <ProductCardShimmer key={`shimmer-${index}`} />
          ) : (
            <ProductCard product={item} key={`product-${item?.id || index}`} />
          )
        }
        ListEmptyComponent={() => {
          if (isLoading) return null;
          
          return (
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={require('./../../../../assets/images/empty.webp')}
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>No products found</Text>
              {search && (
                <Text style={styles.emptySubText}>
                  Try a different search term
                </Text>
              )}
            </View>
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
    flexGrow: 1,
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
    opacity: 0.7,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#666',
  },
  emptySubText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#999',
  },
});

export default Products;