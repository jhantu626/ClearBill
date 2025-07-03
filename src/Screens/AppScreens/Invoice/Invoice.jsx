import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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

  const fetchInvoices = async ({reset=false}) => {
    try {
      const currentPage=reset?0:pageNo;
      const data = await invoiceService.getInvoice({
        authToken: authToken,
        pageNo: pageNo,
        pageSize: 10,
      });
      if (data.length === 0) {
        setHasMore(false);
      }
      setInvoices(prev => [...prev, ...data]);
      if(reset){
        setPageNo(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      setInvoices([]);
      setPageNo(0);
      fetchInvoices({reset: true});
      console.log('useFocusEffect');
    }, [authToken]),
  );

  // useEffect(() => {
  //   if (pageNo > 0) {
  //     fetchInvoices();
  //   }
  // }, [pageNo]);

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
        renderItem={({item}, index) => <InvoiceCard invoice={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log('end reached');
          if (hasMore) {
            setPageNo(prev => prev + 1);
          }
        }}
        ListFooterComponent={() =>
          hasMore ? (
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
