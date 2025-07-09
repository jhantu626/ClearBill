import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SubscriptionCard = ({subcription}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topCOntainer}>
        <Text style={styles.text}>{subcription.name}</Text>
        {subcription.isPopular && (
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>Most Popular</Text>
          </View>
        )}
      </View>
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyText}>₹{subcription.price}</Text>
        <Text style={[styles.currencyText, {fontSize: 16}]}>/month</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.selectPlanBtn,
          subcription.isSelected && {
            backgroundColor: colors.inputBackground + 50,
          },
        ]}
        disabled={subcription.isSelected}>
        <Text style={{color: '#fff', fontSize: 14, fontFamily: fonts.medium}}>
          {subcription.isSelected ? 'Selected' : 'Select Plan'}
        </Text>
      </TouchableOpacity>
      <View style={styles.featuresContainer}>
        {subcription.features.map((feature, index) => (
          <View style={styles.featuresView}>
            {feature.has ? (
              <Octicons name="check" size={21} color={'green'} />
            ) : (
              <Ionicons name="close" size={21} color={colors.error} />
            )}

            <Text style={styles.featureText}>{feature.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.itemBackgrounds,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 0.5,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#000',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 1,
    marginTop: -10,
  },
  currencyText: {
    fontSize: 36,
    fontFamily: fonts.bold,
  },
  selectPlanBtn: {
    width: '100%',
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  featuresView: {
    flexDirection: 'row',
    gap: 15,
    alignItms: 'center',
  },
  featuresContainer: {
    marginTop: 10,
    gap: 3,
  },
  featureText: {
    fontSize: 14,
    color: colors.inputBackground,
    fontFamily: fonts.semibold,
  },
  topCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularContainer: {
    backgroundColor: '#1e81b0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  popularText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#fff',
  },
});
