import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {ChartBar, SecondaryHeader} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import {FlatList} from 'react-native-gesture-handler';
import InvoiceCard from '../../../Components/Cards/InvoiceCard';

const Home = () => {
  const options = ['Day', 'Week', 'Monthly'];

  // Selected State
  const [selectedSales, setSelectedSales] = React.useState('Day');

  return (
    <Layout>
      <SecondaryHeader
        navigation="simple"
        title="Dashboard"
        isNotification={true}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <Text style={styles.headerText}>Sales Overview</Text>
          <View style={styles.btnSelectContainer}>
            {options.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedSales(item)}
                style={[
                  styles.selectedBtnContainer,
                  selectedSales === item && {backgroundColor: colors.primary},
                ]}>
                <Text
                  style={[
                    styles.itemText,
                    selectedSales === item && {color: '#fff'},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text style={{fontSize: 16, fontFamily: fonts.medium}}>Sales</Text>
            <Text style={{fontSize: 28, fontFamily: fonts.bold}}>₹12,500</Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{fontSize: 16, fontFamily: fonts.regular}}>
                This Week
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.regular,
                  color: '#088738',
                }}>
                +15%
              </Text>
            </View>
            <ChartBar />
          </View>
        </View>
        <View style={styles.middleBtnContainer}>
          <TouchableOpacity
            style={[styles.middleBtn, {backgroundColor: colors.primary}]}>
            <Text style={styles.middleBtnText}>Create Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.middleBtn,
              {backgroundColor: colors.inputBackground + '40'},
            ]}>
            <Text style={[styles.middleBtnText, {color: '#000'}]}>
              View Reports
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.invoiceText}>Recent Invoices</Text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <InvoiceCard key={index + 'invoice'} />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topView: {
    gap: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  btnSelectContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.inputBackground + '40',
    height: 45,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedBtnContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.inputBackground,
  },
  middleBtnContainer: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  middleBtn: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  middleBtnText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: '#fff',
    letterSpacing: 1,
  },
  invoiceText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});

export default Home;
