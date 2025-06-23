import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useState} from 'react';
import Layout from '../../Layout/Layout';
import {DefaultInput, SecondaryHeader} from '../../../Components';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {
  isValidIndianNumber,
  isValidName,
  verifyEmail,
} from '../../../utils/validations';
import {userService} from '../../../Services/UserService';
import {useAuth} from '../../../Context/AuthContext';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';

const CreateUser = () => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();

  const {mode, user} = route.params || {mode: 'create'};

  console.log('user', user);
  console.log('mode', mode);

  // Auth Context
  const {authToken} = useAuth();

  const [name, setName] = useState(mode === 'edit' ? user.name : '');
  const [email, setEmail] = useState(mode === 'edit' ? user.email : '');
  const [phone, setPhone] = useState(mode === 'edit' ? user.phone : '');
  const [otp, setOtp] = useState('');

  // Error State
  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    phoneError: '',
  });

  // LoadingState
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (!name) {
      setError({
        nameError: 'Name is Required',
      });
      return false;
    } else if (!email) {
      setError({
        emailError: 'Email is Required',
      });
      return false;
    } else if (!phone) {
      setError({
        phoneError: 'Phone Number is Required',
      });
      return false;
    } else if (!isValidName(name)) {
      setError({
        nameError: 'Name is Invalid',
      });
      return false;
    } else if (!verifyEmail(email)) {
      setError({
        emailError: 'Email is Invalid',
      });
      return false;
    } else if (!isValidIndianNumber(phone)) {
      setError({
        phoneError: 'Phone Number is Invalid',
      });
      return false;
    } else {
      setError({});
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validation()) {
      if (
        mode === 'edit' &&
        email === user.email &&
        phone === user.phone &&
        name === user.name
      ) {
        console.log('inside the update');
        ToastAndroid.show('No Changes Found!', ToastAndroid.SHORT);
        return;
      }
      try {
        setIsLoading(true);
        let data = null;
        if (mode === 'create') {
          data = await userService.generateOtpForNewUser({
            authToken: authToken,
            email: email,
          });
        } else {
          data = await userService.generateOtpForUpdateUser({
            authToken: authToken,
            email: email,
          });
        }
        if (data?.status) {
          setOtp(data.message);
          navigation.dispatch(
            StackActions.replace('ValidateOtp', {
              user: {
                name: name,
                email: email,
                phone: phone,
              },
              mode: mode,
              otp: data.message,
            }),
          );
        } else {
          console.log(data)
          setOtp('');
          ToastAndroid.show(
            data?.message || 'Something went wrong',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <SecondaryHeader title="Add User" navigation="back" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <DefaultInput
          placeholder="Enter User Name"
          value={name}
          setValue={setName}
        />
        {error.nameError && (
          <Text style={styles.errorText}>{error.nameError}</Text>
        )}
        <DefaultInput
          disabled={mode === 'edit'}
          placeholder="Enter User Email"
          value={email}
          setValue={setEmail}
        />
        {error.emailError && (
          <Text style={styles.errorText}>{error.emailError}</Text>
        )}
        <DefaultInput
          placeholder="Enter Phone Number"
          value={phone}
          setValue={setPhone}
          maxLength={10}
        />
        {error.phoneError && (
          <Text style={styles.errorText}>{error.phoneError}</Text>
        )}
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : mode === 'edit' ? (
            <Text style={styles.btnText}>Edit</Text>
          ) : (
            <Text style={styles.btnText}>Add User</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  btnContainer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#fff',
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.error,
    marginLeft: 5,
    marginTop: -10,
  },
});

export default CreateUser;
