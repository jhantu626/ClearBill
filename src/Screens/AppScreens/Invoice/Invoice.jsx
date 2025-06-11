import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {useAuth} from '../../../Context/AuthContext';

const Invoice = () => {
  const {logout} = useAuth();
  return (
    <Layout>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default Invoice;

const styles = StyleSheet.create({});
