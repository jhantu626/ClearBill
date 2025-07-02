import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from '../../Layout/Layout';
import {useAuth} from '../../../Context/AuthContext';
import InvoiceCard from '../../../Components/Cards/InvoiceCard';
import {
  FloatingAddButton,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {invoiceService} from '../../../Services/InvoiceService';
import Loader from '../../../Components/Loaders/Loader';

const Invoice = () => {
  // CONTEXT
  const {authToken} = useAuth();

  const navigation = useNavigation();
  const {logout} = useAuth();

  // STATES
  const [invoices, setInvoices] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchInvoices = async () => {
    try {
      const data = await invoiceService.getInvoice({
        authToken: authToken,
        pageNo: pageNo,
        pageSize: 10,
      });
      console.log('invoice data ', data);
      if (data.length === 0) {
        setHasMore(false);
      }
      setInvoices(prev => [...prev, ...data]);
      console.log(invoices.length);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      // fetchInvoices();
      console.log("authToken",authToken)
    }),
  );

  useEffect(() => {
    if (pageNo > 0) {
      fetchInvoices();
    }
  }, [pageNo]);

  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Invoice" />
      <FlatList
        ListHeaderComponent={() => <SearchInput />}
        ListHeaderComponentStyle={{paddingVertical: 15}}
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={invoices}
        keyExtractor={(item, index) => index + ' key'}
        renderItem={({item}, index) => <InvoiceCard invoice={item}/>}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log('end reached');
          if (hasMore) {
            setPageNo(prev => prev + 1);
          }
        }}
        ListFooterComponent={() => (hasMore ? <Loader /> : <Text style={{textAlign: 'center',width: '100%',paddingVertical: 10}}>
          No more invoices available
        </Text>)}
        ListFooterComponentStyle={{
          paddingVertical: 10,
        }}
      />
      <FloatingAddButton
        onPress={() => {
          navigation.navigate('CreateInvoice');
        }}
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
