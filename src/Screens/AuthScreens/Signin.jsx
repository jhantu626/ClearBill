import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../Layout/Layout';
import {DefaultInput, SecondaryHeader} from '../../Components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const Signin = () => {
  return (
    <Layout>
      <SecondaryHeader title="Signin" />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Sign in to continue</Text>
          <DefaultInput />
          <View style={styles.btnParentContainer}>
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>--or--</Text>
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {
                  borderWidth: 1,
                  borderColor: '#000',
                  flexDirection: 'row',
                  gap: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Image
                style={styles.googleImage}
                source={require('./../../../assets/images/google.webp')}
              />
              <Text
                style={[
                  styles.btnText,
                  {
                    color: '#000',
                  },
                ]}>
                Signin with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingTop: 30,
    gap: 20,
  },
  titleText: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: '#000',
  },
  btnParentContainer: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    height: 55,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#fff',
  },
  googleImage: {
    width: 24,
    height: 24,
  },
  orText: {
    fontSize: 12,
    fontFamily: fonts.light,
    color: '#000',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomText: {
    textAlign: 'center',
  },
});

export default Signin;
