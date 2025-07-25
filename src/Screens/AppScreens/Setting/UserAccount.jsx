import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader} from '../../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {fonts} from '../../../utils/fonts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatDateToMonthYear} from '../../../utils/validations';
import {colors} from '../../../utils/colors';
import {useAccess} from '../../../Context/AccessContext';
import {useAuth} from '../../../Context/AuthContext';
import {userService} from '../../../Services/UserService';

const UserAccount = () => {
  // CONTEXTS
  const {authToken} = useAuth();

  // Route
  const route = useRoute();

  // Navigation
  const navigation = useNavigation();

  // Access Context
  const {role} = useAccess();

  const {user} = route.params || {user: {name: '', email: '', createdAt: ''}};

  console.log('user', user, role);

  const removeUserFromBusiness = async () => {
    if (role !== 'ADMIN') {
      ToastAndroid.show('You cannot perform this action', ToastAndroid.SHORT);
      return;
    }
    try {
      const data = await userService.removeUserFromBusiness({
        authToken: authToken,
        userId: user.id,
      });
      if (data?.status) {
        ToastAndroid.show('User removed from business', ToastAndroid.SHORT);
        navigation.dispatch(StackActions.replace('Users'));
      } else {
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <SecondaryHeader title="Account" navigation="back" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Ionicons name="person" size={50} color={'#000'} />
          </View>
          <View style={styles.textsContainer}>
            <Text style={styles.nameText}>{user.name || 'No Name'}</Text>
            <Text style={styles.subText}>{user.email}</Text>
            <Text style={styles.subText}>
              Member since {formatDateToMonthYear(user.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.btnCOntainer}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              navigation.navigate('CreateUser', {user: user, mode: 'edit'});
            }}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.editBtn,
              {
                backgroundColor: '#DC3545',
              },
            ]}
            onPress={removeUserFromBusiness}>
            <Text style={styles.editBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>Account Details</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.iconContainer}>
              <Entypo name="phone" size={28} color={'#000'} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitleText}>Phone Number</Text>
              <Text style={styles.contentSubText}>
                {user.phone || '+91 1234567890'}
              </Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.iconContainer}>
              <Feather name="user" size={28} color={'#000'} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitleText}>Role</Text>
              <Text style={styles.contentSubText}>{user?.role}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topContainer: {
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8C9A4',
    borderRadius: 100,
  },
  textsContainer: {
    alignItems: 'center',
    // gap: 2,
  },
  nameText: {
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
  subText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#4A739C',
  },
  titleText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#000',
    marginVertical: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8C9A4',
    borderRadius: 10,
  },
  bottomContainer: {
    gap: 20,
  },
  contentContainer: {
    gap: 0,
  },
  contentTitleText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#000',
  },
  contentSubText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#4A739C',
  },
  editBtn: {
    width: '47.5%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 10,
  },
  editBtnText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#fff',
  },
  btnCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UserAccount;
