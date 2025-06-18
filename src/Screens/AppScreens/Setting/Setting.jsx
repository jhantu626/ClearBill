import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader} from '../../../Components';
import {colors} from '../../../utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {fonts} from '../../../utils/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

const Setting = () => {
  const [hasBusiness, setHasBusiness] = useState(true);
  const company = {
    id: 1,
    name: 'RP Enterprise',
    gstNo: 'JSHR9493KDIFMFK',
    address: '8/1/C, KOLKATA 700067, WESTBENGAL',
    stateCode: 19,
    logo: 'f8a44fc4-fde9-47bc-bcf0-73978aff77ca.jpg',
    createdAt: '2025-06-17T23:54:56.167313',
    updatedAt: null,
  };
  return (
    <Layout>
      <SecondaryHeader title="Setting" navigation="back" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {hasBusiness ? (
          <View style={styles.businessCard}>
            <View style={styles.leftContainer}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyDetailasText}>
                GST No: {company.gstNo}
              </Text>
              <Text style={styles.companyDetailasText}>
                Address: {company.address}
              </Text>
              <Text style={styles.companyDetailasText}>
                State Code: {company.stateCode}
              </Text>
              <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.exitText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.businessIcon}
              source={require('./../../../../assets/images/company.png')}
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.addBusinessCard}>
            <Octicons
              name="diff-added"
              size={48}
              color={colors.inputBackground}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.titleText}>User Management</Text>
        <TouchableOpacity style={styles.userMenuContainer}>
          <View>
            <Text style={styles.textTitle}>Team Members</Text>
            <Text style={styles.textDescription}>Add and Manage Team Members</Text>
          </View>
          <Entypo name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userMenuContainer}>
          <View>
            <Text style={styles.textTitle}>Account Setting</Text>
            <Text style={styles.textDescription}>Update your account information</Text>
          </View>
          <Entypo name="chevron-right" size={24} />
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addBusinessCard: {
    width: '100%',
    height: 200,
    backgroundColor: colors.itemBackgrounds,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.inputBackground,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    maxWidth: '70%',
  },
  businessIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  companyName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#000',
  },
  companyDetailasText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.inputBackground,
  },
  btnContainer: {
    width: 100,
    height: 45,
    backgroundColor: colors.itemBackgrounds,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  exitText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: '#000',
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: '#000',
    marginTop: 25,
  },
  userMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  textTitle:{
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#000',
  },
  textDescription:{
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.inputBackground
  }
});

export default Setting;
