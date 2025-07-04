import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '../../Layout/Layout';
import {useAuth} from '../../../Context/AuthContext';
import InvoiceCard from '../../../Components/Cards/InvoiceCard';
import {
  FloatingAddButton,
  SearchInput,
  SecondaryHeader,
  ShareBottomSheet,
} from '../../../Components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {invoiceService} from '../../../Services/InvoiceService';
import Loader from '../../../Components/Loaders/Loader';
import {RefreshControl} from 'react-native-gesture-handler';
import {colors} from '../../../utils/colors';

const Invoice = () => {
  // CONTEXT
  const {authToken} = useAuth();

  const navigation = useNavigation();
  const {logout} = useAuth();

  // STATES
  const [invoices, setInvoices] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [query, setQuery] = useState('');
  const [sharableInvoices, setSharableInvoices] = useState(null);

  // Ref States
  const bottomSheetRef = useRef(null);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInvoices = async ({reset = false}) => {
    try {
      setInvoices(prev => (reset ? [] : prev));
      const currentPage = reset ? 0 : pageNo;
      const data = await invoiceService.getInvoice({
        authToken: authToken,
        pageNo: currentPage,
        pageSize: 10,
      });
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setInvoices(prev => (pageNo === 0 ? data : [...prev, ...data]));
      if (reset) {
        setPageNo(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInvoices({reset: true});
    }, []),
  );

  useEffect(() => {
    if (pageNo > 0) {
      fetchInvoices({reset: pageNo === 0});
    }
  }, [pageNo]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInvoices({reset: true});
    setRefreshing(false);
  };

  const Header = useMemo(
    () => <SearchInput value={query} setValue={setQuery} />,
    [query, setQuery],
  );

  const filteredInvoices = useMemo(() => {
    if (!query) return invoices;

    const lowerCaseQuery = query.toLowerCase();
    return invoices.filter(
      item =>
        item.customerName?.toLowerCase().includes(lowerCaseQuery) ||
        item.invoiceNumber?.toLowerCase().includes(lowerCaseQuery),
    );
  }, [invoices, query]);

  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Invoice" />
      <FlatList
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={{paddingVertical: 15}}
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={filteredInvoices}
        keyExtractor={(item, index) => index + ' key'}
        renderItem={({item}, index) => (
          <InvoiceCard
            key={index + 'invoice-card'}
            invoice={item}
            onPressFunction={() => {
              setSharableInvoices(prev => index);
              bottomSheetRef.current?.expand();
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log('end reached');
          if (hasMore && query.length === 0) {
            setPageNo(prev => prev + 1);
          }
        }}
        ListFooterComponent={() =>
          hasMore && query.length === 0 ? (
            <Loader />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                }}
                source={require('.//../../../../assets/images/empty.webp')}
              />
              <Text
                style={{
                  textAlign: 'center',
                  width: '100%',
                  paddingVertical: 10,
                }}>
                No more invoices available
              </Text>
            </View>
          )
        }
        ListFooterComponentStyle={{
          paddingVertical: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      />
      <FloatingAddButton
        onPress={() => {
          navigation.navigate('CreateInvoice');
        }}
      />
      <ShareBottomSheet
        ref={bottomSheetRef}
        snapPoints={useMemo(() => ['15%'], [])}
        key={'bottomSheet-share'}
        invoice={filteredInvoices[sharableInvoices]}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
});
export default Invoice;
