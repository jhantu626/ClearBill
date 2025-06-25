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
import React, {useEffect, useState, useTransition} from 'react';
import Layout from '../../Layout/Layout';
import {DefaultInput, SecondaryHeader} from '../../../Components';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import UploadInput from '../../../Components/Input/UploadInput';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {
  isValidGSTNumber,
  isValidIndianAddress,
  isValidName,
} from '../../../utils/validations';
import {useAuth} from '../../../Context/AuthContext';
import {businessService} from '../../../Services/BusinessService';
import {FILE_URL} from '../../../utils/config';

const AddBusiness = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {mode} = route.params || {mode: 'add'};

  const {authToken} = useAuth();

  // State values
  const [name, setName] = useState(
    mode === 'edit' ? route.params.business.name : '',
  );
  const [address, setAddress] = useState(
    mode === 'edit' ? route.params.business.address : '',
  );
  const [gstNo, setGstNo] = useState(
    mode === 'edit' ? route.params.business.gstNo : '',
  );
  const [stateCode, setStateCode] = useState(
    mode === 'edit' ? String(route.params.business.stateCode) : '',
  );
  const [logo, setLogo] = useState(
    mode === 'edit' ? route.params.business.logo : null,
  );


  // Error State
  const [error, setError] = useState({
    nameError: '',
    addressError: '',
    gstNoError: '',
    stateCodeError: '',
    logoError: '',
  });


  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!name) {
      setError({
        nameError: 'Business name is required',
      });
      return false;
    } else if (!address) {
      setError({
        addressError: 'Address is required',
      });
      return false;
    } else if (!gstNo) {
      setError({
        gstNoError: 'GST Number is required',
      });
      return false;
    } else if (!stateCode) {
      setError({
        stateCodeError: 'State Code is required',
      });
      return false;
    } else if (!logo) {
      setError({
        logoError: 'Logo is required',
      });
      return false;
    } else if (!isValidName(name)) {
      setError({
        nameError: 'Business name is invalid',
      });
      return false;
    } else if (!isValidGSTNumber(gstNo)) {
      setError({
        gstNoError: 'GST Number is invalid',
      });
      return false;
    } else if (!isValidIndianAddress(address)) {
      setError({
        addressError: 'Address is invalid',
      });
      return false;
    } else {
      setError({
        nameError: '',
        addressError: '',
        gstNoError: '',
        stateCodeError: '',
        logoError: '',
      });
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (mode === 'add') {
        try {
          setIsLoading(true);
          const data = await businessService.addBusiness({
            authToken: authToken,
            name: name,
            address: address,
            gstNo: gstNo,
            stateCode: stateCode,
            logoImage: {
              uri: logo.path,
              type: logo.mime,
              name: logo.filename,
            },
          });
          console.log('data ', data);
          if (data.status) {
            ToastAndroid.show(
              data.message,
              ToastAndroid.TOP,
              ToastAndroid.LONG,
            );
            setName('');
            setAddress('');
            setGstNo('');
            setStateCode('');
            setLogo(null);
            navigation.navigate('Setting');
          } else {
            ToastAndroid.show(
              data.message,
              ToastAndroid.TOP,
              ToastAndroid.LONG,
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
        return;
      }
      
      if (mode === 'edit') {
        console.log("edit mode")
        if(route.params.name===name && route.params.address===address && route.params.gstNo===gstNo && route.params.stateCode===Integer.parseInt(stateCode) &&  route.params.logo===logo){
          ToastAndroid.show("No changes made", ToastAndroid.TOP, ToastAndroid.LONG);
          return
        }
        setIsLoading(true);
        try {
          const data = await businessService.updateBusiness({
            authToken: authToken,
            id: route.params.business.id,
            name: name,
            address: address,
            gstNo: gstNo,
            stateCode: stateCode,
            image: logo?.path
              ? {
                  uri: logo.path,
                  type: logo.mime,
                  name: logo.filename,
                }
              : null
          });
          console.log(data)
          if(data.status){
            ToastAndroid.show(data.message, ToastAndroid.TOP, ToastAndroid.LONG);
            navigation.dispatch(StackActions.replace('Setting'));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
        return
      }
    } else {
      console.log(error);
    }
  };

  return (
    <Layout>
      <SecondaryHeader
        navigation="back"
        title={mode === 'add' ? 'Add Business' : 'Edit Business'}
      />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <DefaultInput
          placeholder="Enter Business Name"
          value={name}
          setValue={setName}
        />
        {error.nameError && (
          <Text style={styles.errorText}>{error.nameError}</Text>
        )}
        <DefaultInput
          placeholder="Enter Address"
          value={address}
          setValue={setAddress}
        />
        {error.addressError && (
          <Text style={styles.errorText}>{error.addressError}</Text>
        )}
        <DefaultInput
          placeholder="Enter GST Number"
          value={gstNo}
          setValue={setGstNo}
          maxLength={15}
        />
        {error.gstNoError && (
          <Text style={styles.errorText}>{error.gstNoError}</Text>
        )}
        <DefaultInput
          placeholder="Enter State Code"
          value={stateCode}
          setValue={setStateCode}
          maxLength={2}
        />
        {error.stateCodeError && (
          <Text style={styles.errorText}>{error.stateCodeError}</Text>
        )}
        <UploadInput
          title={'Upload Business Logo'}
          subTitle={'Tap to upload an image of the business logo'}
          value={logo}
          setValue={setLogo}
        />
        {error.logoError && (
          <Text style={styles.errorText}>{error.logoError}</Text>
        )}
        <TouchableOpacity
          style={styles.btnCOntainer}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Text style={styles.btnText}>
              {mode === 'add' ? 'Add Business' : 'Update Business'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  errorText: {
    marginTop: -10,
    marginLeft: 10,
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  btnCOntainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default AddBusiness;
