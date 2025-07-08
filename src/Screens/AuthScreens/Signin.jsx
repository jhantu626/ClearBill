import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../Layout/Layout';
import {DefaultInput, SecondaryHeader} from '../../Components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authService} from '../../Services/AuthService';
import {useAuth} from '../../Context/AuthContext';
import {verifyEmail} from '../../utils/validations';
import {useNavigation} from '@react-navigation/native';
GoogleSignin.configure({
  webClientId:
    '463145801056-p5vlj2ncocfa1lh75tk5mdgquimbo4g1.apps.googleusercontent.com',
  // scopes: ['https://www.googleapis.com/auth/drive.readonly', 'email'],
  scopes: ['email'],
  forceCodeForRefreshToken: false,
  iosClientId:
    '463145801056-dnf3ui4s91fq3jgj76o9a367pf8hcner.apps.googleusercontent.com',
  // 463145801056-84vo0914imkugs2a0dorkts84iqi2ni8.apps.googleusercontent.com -- android
});
const Signin = () => {
  const {login} = useAuth();
  const navigation = useNavigation();

  // State Variables
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoding] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);

  // Error State
  const [error, setError] = useState('');

  const signInWithGoogle = async ({email}) => {
    setGoogleLogin(true);
    try {
      const data = await authService.loginWithGoogle({
        email: email,
      });
      console.info('data ', data);
      if (data.status) {
        await login(data.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGoogleLogin(false);
    }
  };

  const googleSignIn = async () => {
    try {
      await googleSignOut();
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response.type === 'cancelled') {
        ToastAndroid.show('Cancelled', ToastAndroid.SHORT);
        return;
      }
      console.info('response ');
      console.log(response);
      const email = response?.data?.user?.email;
      console.log('email, ', email);
      signInWithGoogle({email});
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Google sign out error: ', error);
    }
  };

  useEffect(() => {
    if (!verifyEmail(email) && email !== '') {
      setError('Enter a valid email');
    } else {
      setError('');
    }
  }, [email]);

  const handleContinue = async () => {
    setIsLoding(true);
    try {
      if (!verifyEmail(email) || email === '') {
        setError('Enter a valid email');
        return;
      } else {
        setError('');
      }

      const data = await authService.login({email: email});
      console.log('Data ', data);

      if (data.status) {
        navigation.navigate('Otp', {email: email});
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <Layout>
      <SecondaryHeader title="Signin" />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Sign in to continue</Text>
          <DefaultInput
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.btnParentContainer}>
            <TouchableOpacity
              onPress={handleContinue}
              disabled={isLoading}
              style={[
                styles.btnContainer,
                {
                  backgroundColor: colors.primary,
                },
              ]}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : (
                <Text style={styles.btnText}>Continue</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.orText}>--or--</Text>
            <TouchableOpacity
              disabled={googleLogin}
              onPress={googleSignIn}
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
              {googleLogin ? (
                <ActivityIndicator size={'large'} color={colors.primary} />
              ) : (
                <>
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
                </>
              )}
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
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fonts.light,
    marginTop: -15,
  },
});

export default Signin;
