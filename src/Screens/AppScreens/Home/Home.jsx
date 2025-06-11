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
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
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
            <ChartBar/>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Home;
