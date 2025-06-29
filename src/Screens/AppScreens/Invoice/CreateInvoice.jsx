import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import Layout from '../../Layout/Layout';
import {
  DefaultInput,
  PrimaryDivider,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {FILE_URL} from '../../../utils/config';
import Entypo from 'react-native-vector-icons/Entypo';

// Items
const data = [
  {
    id: 1,
    name: 'Professional Smart Watch',
    description: 'Professional formal watch with lather belt',
    isTaxable: true,
    hsnCode: '2566',
    unitType: 'PCS',
    price: 750,
    discount: 10,
    logo: '44648aa2-3919-47c6-8602-e60462c04306.jpg',
    createdAt: '2025-06-27T00:15:13.379946',
    updateAt: '2025-06-27T15:28:47.101502',
    cgst: 9,
    sgst: 9,
    igst: 0,
  },
  {
    id: 2,
    name: 'Premium Wireless Headphone',
    description: 'Black Headphone',
    isTaxable: true,
    hsnCode: '2568',
    unitType: 'PCS',
    price: 1250,
    discount: 7,
    logo: 'd6411d4a-2a71-4ffb-8098-13e1a122d269.jpg',
    createdAt: '2025-06-27T00:16:45.088028',
    updateAt: '2025-06-27T00:19:02.47866',
    cgst: 14,
    sgst: 14,
    igst: 0,
  },
  {
    id: 3,
    name: 'Luxury Chronograph Watch',
    description: '',
    isTaxable: true,
    hsnCode: '55',
    unitType: 'PCS',
    price: 2500,
    discount: 10,
    logo: '2682a8f0-b2c6-45cb-a632-8925e74c175c.jpg',
    createdAt: '2025-06-27T12:58:47.994625',
    updateAt: '2025-06-27T16:40:54.33763',
    cgst: 0,
    sgst: 0,
    igst: 0,
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    description: 'Portable mini speaker with bass boost',
    isTaxable: true,
    hsnCode: '8543',
    unitType: 'PCS',
    price: 1800,
    discount: 5,
    logo: 'b1c0c8e5-3a4a-4714-9f88-48e45d5ea6b4.jpg',
    createdAt: '2025-06-28T10:20:13.000000',
    updateAt: '2025-06-28T10:45:22.000000',
    cgst: 9,
    sgst: 9,
    igst: 0,
  },
  {
    id: 5,
    name: 'Pro Gaming Mouse',
    description: 'Ergonomic RGB mouse for pro gaming',
    isTaxable: true,
    hsnCode: '8471',
    unitType: 'PCS',
    price: 950,
    discount: 8,
    logo: 'e3a2c8d0-bc93-4f1c-a8f1-92d4048bc9a8.jpg',
    createdAt: '2025-06-28T11:30:55.000000',
    updateAt: '2025-06-28T11:45:00.000000',
    cgst: 6,
    sgst: 6,
    igst: 0,
  },
  {
    id: 6,
    name: 'Multi-Port USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI and PD',
    isTaxable: true,
    hsnCode: '8473',
    unitType: 'PCS',
    price: 2100,
    discount: 12,
    logo: 'f7c18fd4-5c91-43f5-98d7-ffe4adcb3e2f.jpg',
    createdAt: '2025-06-28T12:45:33.000000',
    updateAt: '2025-06-28T13:05:45.000000',
    cgst: 9,
    sgst: 9,
    igst: 0,
  },
  {
    id: 7,
    name: 'Adjustable Laptop Stand',
    description: 'Aluminum adjustable laptop stand',
    isTaxable: true,
    hsnCode: '8302',
    unitType: 'PCS',
    price: 1450,
    discount: 6,
    logo: '1a2b3c-laptop-stand.jpg',
    createdAt: '2025-06-29T09:00:00.000000',
    updateAt: '2025-06-29T09:15:00.000000',
    cgst: 5,
    sgst: 5,
    igst: 0,
  },
  {
    id: 8,
    name: 'High-Speed Portable SSD',
    description: '500GB USB 3.2 Gen2 External SSD',
    isTaxable: true,
    hsnCode: '8471',
    unitType: 'PCS',
    price: 4800,
    discount: 15,
    logo: 'ssd-500gb-external.jpg',
    createdAt: '2025-06-29T10:00:00.000000',
    updateAt: '2025-06-29T10:30:00.000000',
    cgst: 12,
    sgst: 12,
    igst: 0,
  },
  {
    id: 9,
    name: 'RGB Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard',
    isTaxable: true,
    hsnCode: '8471',
    unitType: 'PCS',
    price: 3100,
    discount: 10,
    logo: 'mech-keyboard-rgb.jpg',
    createdAt: '2025-06-29T11:00:00.000000',
    updateAt: '2025-06-29T11:30:00.000000',
    cgst: 6,
    sgst: 6,
    igst: 0,
  },
  {
    id: 10,
    name: 'Flexible Smartphone Tripod',
    description: 'Flexible mini tripod for phone and camera',
    isTaxable: true,
    hsnCode: '9006',
    unitType: 'PCS',
    price: 600,
    discount: 4,
    logo: 'tripod-phone-camera.jpg',
    createdAt: '2025-06-29T12:00:00.000000',
    updateAt: '2025-06-29T12:10:00.000000',
    cgst: 5,
    sgst: 5,
    igst: 0,
  },
  {
    id: 11,
    name: 'Fast Wireless Charger',
    description: 'Fast charging pad for smartphones',
    isTaxable: true,
    hsnCode: '8504',
    unitType: 'PCS',
    price: 1200,
    discount: 9,
    logo: 'wireless-charger-pad.jpg',
    createdAt: '2025-06-29T12:30:00.000000',
    updateAt: '2025-06-29T12:45:00.000000',
    cgst: 9,
    sgst: 9,
    igst: 0,
  },
  {
    id: 12,
    name: 'Premium Noise Cancelling Earbuds',
    description: 'In-ear wireless earbuds with ANC',
    isTaxable: true,
    hsnCode: '8518',
    unitType: 'PCS',
    price: 3500,
    discount: 11,
    logo: 'earbuds-anc.jpg',
    createdAt: '2025-06-29T13:00:00.000000',
    updateAt: '2025-06-29T13:15:00.000000',
    cgst: 14,
    sgst: 14,
    igst: 0,
  },
  {
    id: 13,
    name: '10" Tablet Folio Case',
    description: 'Protective folio case for 10" tablet',
    isTaxable: false,
    hsnCode: '3926',
    unitType: 'PCS',
    price: 800,
    discount: 5,
    logo: 'tablet-case.jpg',
    createdAt: '2025-06-29T13:30:00.000000',
    updateAt: '2025-06-29T13:45:00.000000',
    cgst: 0,
    sgst: 0,
    igst: 0,
  },
  {
    id: 14,
    name: 'Wi-Fi Smart Plug',
    description: 'Wi-Fi enabled smart plug with timer',
    isTaxable: true,
    hsnCode: '8536',
    unitType: 'PCS',
    price: 950,
    discount: 6,
    logo: 'smart-plug.jpg',
    createdAt: '2025-06-29T14:00:00.000000',
    updateAt: '2025-06-29T14:15:00.000000',
    cgst: 6,
    sgst: 6,
    igst: 0,
  },
  {
    id: 15,
    name: 'Touch Control LED Desk Lamp',
    description: 'Touch control LED lamp with USB port',
    isTaxable: true,
    hsnCode: '9405',
    unitType: 'PCS',
    price: 1300,
    discount: 7,
    logo: 'led-lamp.jpg',
    createdAt: '2025-06-29T14:30:00.000000',
    updateAt: '2025-06-29T14:45:00.000000',
    cgst: 5,
    sgst: 5,
    igst: 0,
  },
];

const CreateInvoice = () => {
  // REF VAR'S
  const bottomSheetRef = useRef(null);
  const [products, setProducts] = useState(
    data.map(item => ({...item, quantity: 0})),
  );

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
  }, [searchQuery]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Layout>
        <SecondaryHeader navigation="back" title="Create Invoice" />
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <DefaultInput placeholder="Customer Number" />
          <DefaultInput placeholder="Customer Name" />
          <DefaultInput placeholder="GST No(Optional)" />
          <View style={styles.itemsContainer}>
            <Text style={styles.itemTitle}>Items</Text>
            <View style={styles.selectedItemsContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.itemText}>Product 1</Text>
                <Text style={styles.itemSubText}>Quantity: 2, Rate: 50</Text>
              </View>
              <Text style={styles.priceText}>₹100</Text>
            </View>
            <View style={styles.selectedItemsContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.itemText}>Product 1</Text>
                <Text style={styles.itemSubText}>Quantity: 2, Rate: 50</Text>
              </View>
              <Text style={styles.priceText}>₹100</Text>
            </View>
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
              <Text style={styles.summaryText}>₹150</Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Discount</Text>
              <Text style={styles.summaryText}>₹150</Text>
            </View>
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>CGST/SGST</Text>
              <Text style={styles.summaryText}>₹28</Text>
            </View>
            <PrimaryDivider />
            <View style={styles.subSummaryCOntainer}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>₹150</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.createInvoiceBtn}>
            <Text style={styles.createInvoiceBtnText}>Create Invoice</Text>
          </TouchableOpacity>
        </ScrollView>
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={useMemo(() => ['70%'], [])}
        backdropComponent={renderBackdrop}
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
                      if (data[index]?.quantity > 0) {
                        item.quantity = item.quantity - 1;
                      }
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
                      data[index].quantity = data[index].quantity + 1;
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
    paddingVertical: 15,
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
});

export default CreateInvoice;
