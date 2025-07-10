import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Layout from '../../Layout/Layout';
import {SecondaryHeader, SubscriptionCard} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import {subscription} from '../../../Services/Subscription';
import {useAuth} from '../../../Context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';

const Subscription = () => {
  // CONTEXTS
  const {authToken} = useAuth();

  // LOADING STATE
  const [isRefreshing, setIsRefreshing] = useState(false);

  // STATE VALUES
  const [currentSubscription, setCurrentSubscription] = useState({
    id: 0,
    subscriptionType: '',
    purchaseDate: '',
    expirationDate: '',
  });
  const [subscriptionData, setSubscriptionData] = useState([
    {
      name: 'STARTER',
      price: 0,
      tagline: 'Free Trial',
      features: [
        {name: 'Frist 1 Months free trial', has: true},
        {name: '100 Daily Invoice Limit', has: true},
        {name: 'Basic Reporting', has: false},
        {name: 'Email Support', has: true},
        {name: '30 Days Transaction History', has: true},
        {name: '1 User Access', has: true},
      ],
      isSelected: false,
    },
    {
      name: 'PRO',
      price: 99,
      tagline: 'Most Popular',
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
      tagline: '',
      features: [
        {name: 'Unlimited Daily Invoice Limit', has: true},
        {name: 'Customizable Advanced Reporting', has: true},
        {name: '24/7 Support', has: true},
        {name: 'Unlimited Transaction History', has: true},
        {name: '10+user Access', has: true},
      ],
      isSelected: false,
    },
  ]);

  // Fetch Current Subscription
  const fetchSubscription = async () => {
    try {
      const data = await subscription.getCurrentSubscription({
        authToken: authToken,
      });
      if (data.hasOwnProperty('status') && data.status === false) {
        return;
      } else {
        setCurrentSubscription(data);
        const updatedData = subscriptionData
          .map(item => {
            if (item?.name === data?.subscriptionType) {
              return {...item, tagline: 'Current Plan', isSelected: true};
            }
            return {
              ...item,
              isSelected: false,
              tagline: '',
            };
          })
          .sort((a, b) => a.price - b.price)
          .sort((a, b) => b.isSelected - a.isSelected);
        setSubscriptionData(updatedData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSubscription();
    }, []),
  );

  // ON-REFRESH
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchSubscription();
    setIsRefreshing(false);
  };

  return (
    <Layout>
      <SecondaryHeader navigation="back" title="Choose Your Plan" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <Text style={styles.text}>
          Select the plan that best fits your needs. You can upgrade or
          downgrade at any time.
        </Text>
        <View style={styles.cardContianer}>
          {subscriptionData.map((item, index) => (
            <SubscriptionCard
              subcription={item}
              key={index}
              currentSubscription={currentSubscription?.subscriptionType}
            />
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
