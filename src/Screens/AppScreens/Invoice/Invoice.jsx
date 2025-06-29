import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import {useAuth} from '../../../Context/AuthContext';
import InvoiceCard from '../../../Components/Cards/InvoiceCard';
import {
  FloatingAddButton,
  SearchInput,
  SecondaryHeader,
} from '../../../Components';
import {useNavigation} from '@react-navigation/native';

const Invoice = () => {
  const navigation = useNavigation();
  const {logout} = useAuth();
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Invoice" />
      <FlatList
        ListHeaderComponent={() => <SearchInput />}
        ListHeaderComponentStyle={{paddingVertical: 15}}
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item, index) => index + ' key'}
        renderItem={(item, index) => <InvoiceCard />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log('end reached');
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
