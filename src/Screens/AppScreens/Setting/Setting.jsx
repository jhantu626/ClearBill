import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from '../../Layout/Layout';
import {
  BusinessCardShimmer,
  SecondaryHeader,
  UserCardShimmer,
} from '../../../Components';
import {colors} from '../../../utils/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {fonts} from '../../../utils/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {userService} from '../../../Services/UserService';
import {useAuth} from '../../../Context/AuthContext';
import {FILE_URL} from '../../../utils/config';
import {useAccess} from '../../../Context/AccessContext';

const Setting = () => {
  // CONTEXTS
  const {setRole, setCurrentUserId} = useAccess();

  // NAVIGATION

  const {authToken, logout} = useAuth();
  const navigation = useNavigation();
  const [hasBusiness, setHasBusiness] = useState(false);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // State values
  const [user, setUser] = useState({});

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile({authToken: authToken});
      console.log('data ', data);
      setRole(prev => data?.role);
      setCurrentUserId(prev => data?.id);
      setHasBusiness(data?.business !== null);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  return (
    <Layout>
      <SecondaryHeader title="Setting" navigation="back" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {isLoading ? (
          <BusinessCardShimmer />
        ) : user?.business ? (
          <View style={styles.businessCard}>
            <View style={styles.leftContainer}>
              <Text style={styles.companyName}>{user?.business?.name}</Text>
              <Text style={styles.companyDetailasText}>
                GST No: {user?.business?.gstNo}
              </Text>
              <Text style={styles.companyDetailasText}>
                Address: {user?.business?.address}
              </Text>
              <Text style={styles.companyDetailasText}>
                State Code: {user?.business?.stateCode}
              </Text>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  if (user?.role === 'ADMIN') {
                    navigation.navigate('AddBusiness', {
                      mode: 'edit',
                      business: user?.business,
                    });
                  } else {
                    ToastAndroid.show(
                      'You dont have permission to edit business',
                      ToastAndroid.LONG,
                    );
                  }
                }}>
                <Text style={styles.exitText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.businessIcon}
              source={{
                uri: FILE_URL + `/business/logo/${user?.business?.logo}`,
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addBusinessCard}
            onPress={() =>
              navigation.navigate('AddBusiness', {
                mode: 'add',
              })
            }>
            <Octicons
              name="diff-added"
              size={48}
              color={colors.inputBackground}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.titleText}>User Management</Text>
        {user?.role === 'ADMIN' && (
          <TouchableOpacity
            style={styles.userMenuContainer}
            onPress={() => navigation.navigate('Users')}>
            <View>
              <Text style={styles.textTitle}>Team Members</Text>
              <Text style={styles.textDescription}>
                Add and Manage Team Members
              </Text>
            </View>
            <Entypo name="chevron-right" size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.userMenuContainer}
          onPress={() => {
            navigation.navigate('UserAccount', {
              user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                createdAt: user?.createdAt,
                updatedAt: user?.updatedAt,
                role: user?.role,
                phone: user?.phone,
              },
            });
          }}>
          <View>
            <Text style={styles.textTitle}>Account Setting</Text>
            <Text style={styles.textDescription}>
              Update your account information
            </Text>
          </View>
          <Entypo name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <MaterialIcons name="logout" size={24} color="#000" />
          <Text style={styles.logoutText}>Signout</Text>
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
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: '#000',
  },
  textDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.inputBackground,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    padding: 12,
    backgroundColor: colors.inputBackground + 50,
    borderRadius: 10,
  },
  logoutText: {
    fontFamily: fonts.semibold,
  },
});

export default Setting;
