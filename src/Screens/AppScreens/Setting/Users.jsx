import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader, UserCard, UserCardShimmer} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../Context/AuthContext';
import {userService} from '../../../Services/UserService';

const Users = () => {
  // Auth Context
  const {authToken} = useAuth();

  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Fetch UsersData
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsersByBusiness({authToken: authToken});
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Users" />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={isLoading ? Array(5).fill({}) : userData}
        keyExtractor={(item, index) => index + ' fl-key-extractor'}
        renderItem={({item, index}) => {
          console.log(item);
          return isLoading ? (
            <UserCardShimmer />
          ) : (
            <UserCard personData={item} key={index + ' user-card'} />
          );
        }}
        ListHeaderComponent={
          <Text style={styles.mainText}>User Management</Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addTeamMembers}
            onPress={() => {
              navigation.navigate('CreateUser');
            }}>
            <View style={styles.addBtnContainer}>
              <Ionicons name="add-outline" size={24} color="#000" />
            </View>
            <Text style={styles.addBtnText}>Add Team Members</Text>
          </TouchableOpacity>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  addTeamMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginVertical: 20,
  },
  addBtnContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.inputBackground + 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addBtnText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
  },
});

export default Users;
