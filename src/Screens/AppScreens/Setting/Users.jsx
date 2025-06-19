import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader, UserCard} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils/colors';

const Users = () => {
  const userData = [
    {
      id: 1,
      name: null,
      email: 'jhantubala626@gmail.com',
      phone: null,
      role: 'ADMIN',
    },
    {
      id: 1,
      name: null,
      email: 'jhantubala626@gmail.com',
      phone: null,
      role: 'STAFF',
    },
    {
      id: 1,
      name: null,
      email: 'jhantubala626@gmail.com',
      phone: null,
      role: 'STAFF',
    },
    {
      id: 1,
      name: null,
      email: 'jhantubala626@gmail.com',
      phone: null,
      role: 'STAFF',
    },
    {
      id: 1,
      name: null,
      email: 'jhantubala626@gmail.com',
      phone: null,
      role: 'STAFF',
    },
  ];
  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Users" />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={userData}
        keyExtractor={(item, index) => index + ' fl-key-extractor'}
        renderItem={({item,index}) =>{ 
          return <UserCard person={item} key={index+" user-card"}/>
        }
      }
        ListHeaderComponent={
          <Text style={styles.mainText}>User Management</Text>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.addTeamMembers}>
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
