import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader, SubscriptionCard} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';

const data = [
  {
    name: 'STARTER',
    price: 0,
    isPopular: false,
    features: [
      {name: '100 Daily Invoice Limit', has: true},
      {name: 'Basic Reporting', has: false},
      {name: 'Email Support', has: true},
      {name: '30 Days Transaction History', has: true},
      {name: '1 User Access', has: true},
    ],
    isSelected: true,
  },
  {
    name: 'PRO',
    price: 99,
    isPopular: true,
    features: [
      {name: '1000 Daily Invoice', has: true},
      {name: 'Standard Advanced Reporting', has: true},
      {name: 'Priority Support', has: true},
      {name: '90 Days Transaction History', has: true},
      {name: '3 user Access', has: true},
    ],
    isSelected: false,
  },
  {
    name: 'UNLIMITED',
    price: 299,
    isPopular: false,
    features: [
      {name: 'Unlimited Daily Invoice Limit', has: true},
      {name: 'Customizable Advanced Reporting', has: true},
      {name: '24/7 Support', has: true},
      {name: 'Unlimited Transaction History', has: true},
      {name: '10+user Access', has: true},
    ],
    isSelected: false,
  },
];

const Subscription = () => {
  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Choose Your Plan" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Select the plan that best fits your needs. You can upgrade or
          downgrade at any time.
        </Text>
        <View style={styles.cardContianer}>
          {data.map((item, index) => (
            <SubscriptionCard subcription={item} key={index} />
          ))}
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>7 Days Money Back Guarantee</Text>
          <Text style={styles.footerText}>Enterprise Solution</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.inputBackground,
  },
  cardContianer: {
    width: '100%',
    gap: 15,
  },
  footerContainer: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.inputBackground,
  },
});

export default Subscription;
