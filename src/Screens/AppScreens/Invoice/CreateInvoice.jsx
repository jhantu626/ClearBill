import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '../../Layout/Layout';
import {
  DefaultInput,
  PrimaryDivider,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {FILE_URL} from '../../../utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
import {productService} from '../../../Services/ProductService';
import {useAuth} from '../../../Context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
import {isValidIndianNumber, isValidName} from '../../../utils/validations';
import {customerService} from '../../../Services/CustomerService';
import {invoiceService} from '../../../Services/InvoiceService';
import {printableTemplate, printBill} from '../../../utils/InvoiceTemplate';

const CreateInvoice = () => {
  // CONTEXT
  const {authToken} = useAuth();

  // REF VAR'S
  const bottomSheetRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalGst, setTotalGst] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');

  // ERROR STATE
  const [error, setError] = useState({
    mobileError: '',
    nameError: '',
  });

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialProductData = async () => {
    try {
      const data = await productService.getProducts({authToken: authToken});
      setProducts(prev => {
        return data.map(item => ({...item, quantity: 0}));
      });
    } catch (error) {
      console.error(error);
    }
  };

  // BOTTOM SHEET OPEN
  const handleOpenItemBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  // FOR BOTTOM SHEET BACKDROP
  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
        />
      ),
    [],
  );

  // STATE VARIABLES
  const [searchQuery, setSearchQuery] = useState('');

  // FUNCTION FOR FILTER ITEM
  const filteredItems = useMemo(() => {
    return products.filter(item =>
      item.name.toLowerCase().includes(searchQuery),
    );
  }, [searchQuery, products]);

  // INCREASE PRODUCTS QUANTITY
  const increaseProductQuantity = id => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };
  const decreaseProductQuantity = id => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id
          ? {...item, quantity: item.quantity > 0 && item.quantity - 1}
          : item,
      ),
    );
  };

  // Fetch Customer data
  const fetchCustomerData = async () => {
    try {
      const data = await customerService.getCustomerByMobile({
        authToken: authToken,
        mobile: customerMobile,
      });
      if (data?.name) {
        setCustomerName(data?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // HOOKS Functions
  useFocusEffect(
    useCallback(() => {
      fetchInitialProductData();
    }, []),
  );

  useEffect(() => {
    setTotalDiscount(0);
    setTotalGst(0);
    setSubTotal(0);
    products
      .filter(item => item.quantity > 0)
      .forEach(item => {
        setSubTotal(prev => prev + item.price * item.quantity);
        const discountAmount = item.price * (item.discount / 100);
        setTotalDiscount(prev => prev + discountAmount * item.quantity);
        setTotalGst(
          prev =>
            prev +
            (item.price - discountAmount) *
              item.quantity *
              (item.igst !== 0
                ? item.igst / 100
                : (item.cgst + item.sgst) / 100),
        );
      });
  }, [products]);

  // USEEFFECT FOR MOBILE NUMBER
  useEffect(() => {
    if (customerMobile.length > 0 && !isValidIndianNumber(customerMobile)) {
      setError({
        mobileError: 'Invalid Mobile Number',
      });
    } else {
      if (customerMobile.length === 10) {
        console.log('reached');
        fetchCustomerData();
      }
      setError({
        mobileError: '',
      });
    }
  }, [customerMobile]);

  // Validations
  const validation = () => {
    if (!customerMobile) {
      setError({
        mobileError: 'Mobile Number is Required',
      });
      return false;
    } else if (!customerName || !isValidName(customerName)) {
      setError({
        nameError: 'Name is Invalid',
      });
      return false;
    } else {
      setError({
        mobileError: '',
        nameError: '',
      });
    }
    return true;
  };

  // HANDLE CREATE INVOICE
  const handleSubmit = async () => {
    if (!validation()) return;
    try {
      setIsLoading(true);
      const items = products
        .filter(item => item.quantity > 0)
        .map(item => ({
          name: item.name,
          hsnCode: item.hsnCode,
          unitType: item.unitType,
          price: item.price,
          gstType:
            item.cgst !== 0 ? 'CGST+SGST' : item.igst !== 0 ? 'IGST' : 'NA',
          totalGst:
            item.cgst !== 0
              ? item.cgst + item.sgst
              : item.igst !== 0
              ? item.igst
              : 0,
          discount: item.discount,
          quantity: item.quantity,
          logo: item.logo,
          taxable: item.isTaxable,
        }));

      if (items.length === 0) {
        return;
      }
      const data = await invoiceService.createInvoice({
        authToken: authToken,
        payload: items,
        customerName: customerName,
        customerNumber: customerMobile,
      });
      // if (!data?.status) {
      //   ToastAndroid.show(data?.message, ToastAndroid.LONG);
      //   return;
      // }
      await printBill(data);
      console.log(printableTemplate(data));
      ToastAndroid.show('Invoice Created Successfully', ToastAndroid.LONG);
      setCustomerMobile('');
      setCustomerName('');
      setProducts([]);
      fetchInitialProductData();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Layout>
        <SecondaryHeader navigation="back" title="Create Invoice" />
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <DefaultInput
            keyboardType="phone-pad"
            placeholder="Customer Number"
            value={customerMobile}
            setValue={setCustomerMobile}
            maxLength={10}
          />
          {error.mobileError && (
            <Text style={styles.errorText}>{error.mobileError}</Text>
          )}
          <DefaultInput
            placeholder="Customer Name"
            value={customerName}
            setValue={setCustomerName}
          />
          {error.nameError && (
            <Text style={styles.errorText}>{error.nameError}</Text>
          )}
          <DefaultInput placeholder="GST No(Optional)" />
          <View style={styles.itemsContainer}>
            <Text style={styles.itemTitle}>Items</Text>
            {products
              .filter(item => item.quantity > 0)
              .map((item, index) => {
                return (
                  <View
                    style={styles.selectedItemsContainer}
                    key={index + '-selectedProducts'}>
                    <View style={styles.leftContainer}>
                      <Text style={styles.itemText}>
                        {item.name.slice(0, 17)}
                        {item.name.length > 17 && '...'}
                      </Text>
                      <Text style={styles.itemSubText}>
                        Quantity: {item.quantity}, Rate: {item.price}
                      </Text>
                    </View>
                    <Text style={styles.priceText}>
                      ₹{item.quantity * item.price}
                    </Text>
                  </View>
                );
              })}
            <TouchableOpacity
              style={styles.addItemBtn}
              onPress={handleOpenItemBottomSheet}>
              <Text style={styles.addItemBtnText}>Add Item</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemTitle}>Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>₹{subTotal}</Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Discount</Text>
              <Text style={styles.summaryText}>
                ₹{totalDiscount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>CGST+SGST/IGST</Text>
              <Text style={styles.summaryText}>₹{totalGst.toFixed(2)}</Text>
            </View>
            <PrimaryDivider />
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Total</Text>
              <Text style={styles.summaryText}>
                ₹{(subTotal - totalDiscount + totalGst).toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.createInvoiceBtn}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
              <Text style={styles.createInvoiceBtnText}>Create Invoice</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={useMemo(() => ['70%'], [])}
        backdropComponent={renderBackdrop}
        index={-1}
        animationConfigs={{
          duration: 300,
        }}>
        <BottomSheetFlatList
          contentContainerStyle={styles.bottomSheetContainer}
          data={filteredItems}
          ListHeaderComponent={() => (
            <SearchInput value={searchQuery} setValue={setSearchQuery} />
          )}
          stickyHeaderIndices={[0]}
          keyExtractor={(item, index) => index + 'selectItemKey'}
          renderItem={({item}, index) => {
            return (
              <View style={styles.bottomSheetItemContainer}>
                <View style={styles.itemLeftContainer}>
                  <Image
                    style={styles.itemImage}
                    source={{uri: `${FILE_URL}/product/${item?.logo}`}}
                  />
                  <View>
                    <Text style={styles.bItemText}>
                      {item.name.slice(0, 17)}
                      {item.name.length > 17 && '...'}
                    </Text>
                    <Text style={styles.bItemSubText}>
                      ₹{item.price}/{item.unitType}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    style={styles.increaseDecreaseBtn}
                    onPress={() => {
                      decreaseProductQuantity(item.id);
                    }}>
                    <Entypo name="minus" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: fonts.regular,
                      textAlign: 'center',
                    }}>
                    {item.quantity ? item.quantity : 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.increaseDecreaseBtn}
                    onPress={() => {
                      increaseProductQuantity(item.id);
                    }}>
                    <Entypo name="plus" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
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
    paddingVertical: 10,
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
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  bottomSheetItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  itemLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  bItemText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
  },
  bItemSubText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.inputBackground,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  increaseDecreaseBtn: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.inputBackground + '40',
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.error,
    marginTop: -5,
    marginLeft: 5,
  },
});

export default CreateInvoice;
