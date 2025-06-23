import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Layout from '../Layout/Layout';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Navigation
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      navigation.replace('Signin');
    }, 1500);
  }, []);

  // Interpolate the animated value to width percentage
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require('./../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.taglineText}>Your bill is being generated</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.billTxt}>Generating bill...</Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[styles.progressBarAnimation, {width: progressWidth}]}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Powered by ClearBill</Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  taglineText: {
    color: '#000',
    fontSize: 24,
    fontFamily: fonts.semibold,
    marginTop: 20,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    gap: 10,
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: colors.primaryBackground,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarAnimation: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.primary,
    // backgroundColor: '#000',
    borderRadius: 5,
  },
  billTxt: {
    color: '#000',
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  bottomText: {
    color: '#000',
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
});

export default SplashScreen;
