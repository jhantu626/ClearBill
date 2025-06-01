import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../Layout/Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useRoute} from '@react-navigation/native';
import {authService} from '../../Services/AuthService';
import {useAuth} from '../../Context/AuthContext';

const Otp = () => {
  const {login} = useAuth();

  const [otpText, setOtpText] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Loading State
  const [otpResendLoading, setOtpResendLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  console.log('route', route?.params?.email);

  const [timer, setTimer] = useState(120);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const verifyOtp = async () => {
    console.log('otpText', otpText.join(''));
    setIsLoading(true);
    try {
      const isCompleteOtp = otpText.every(item => item !== '');
      if (isCompleteOtp) {
        const complateOtp = otpText.join('');
        const data = await authService.verifyOtp({
          email: route?.params?.email,
          otp: complateOtp,
        });
        console.log(data);

        if (data.status) {
          await login(data.token);
        } else {
          ToastAndroid.showWithGravity(
            'Invalid OTP',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          setOtpText(['', '', '', '']);
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const otpVarification = async otp => {
    console.log('otpverification ', otp);
    setIsLoading(true);
    try {
      const complateOtp = otpText.join('');
      const data = await authService.verifyOtp({
        email: route?.params?.email,
        otp: otp,
      });
      console.log(data);

      if (data.status) {
        await login(data.token);
      } else {
        ToastAndroid.showWithGravity(
          'Invalid OTP',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
        setOtpText(['', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeText = (text, index) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');

    // Update the OTP array
    const newOtp = [...otpText];
    newOtp[index] = numericText;
    setOtpText(newOtp);

    // Auto focus next input if there's a value
    if (numericText && index < otpText.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all fields are filled
    if (newOtp.every(item => item !== '')) {
      otpVarification(newOtp.join(''));
    }
  };

  const handleKeyPress = ({nativeEvent: {key}}, index) => {
    if (key === 'Backspace' && !otpText[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount or timer change
    }
  }, [timer]);

  const resend = async () => {
    setOtpResendLoading(true);
    try {
      const data = await authService.login({email: route?.params?.email});
      if (data.status) {
        setTimer(120);
        ToastAndroid.showWithGravity(
          'Resend OTP successfully',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOtpResendLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.headerCOntainer}>
        <TouchableOpacity>
          <AntDesign name="questioncircleo" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Enter the code</Text>
        <Text style={styles.subHEaderText}>
          We sent a verification code to your email address. Please enter it
          below.
        </Text>
        <View style={styles.parentOtpContainer}>
          <View style={styles.otpCOntainer}>
            {otpText.map((item, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={item}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                ref={ref => (inputRefs.current[index] = ref)}
                autoFocus={index === 0}
                selectionColor={colors.primary}
                editable={timer > 0}
              />
            ))}
          </View>
          <View style={styles.resetnContainer}>
            <Text style={styles.resetText}>
              Resend code in {timer > 0 && formatTime(timer)}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={resend}>
                {otpResendLoading ? (
                  <ActivityIndicator size={'small'} color={'#000'} />
                ) : (
                  <Text style={[styles.resetText, {fontFamily: fonts.bold}]}>
                    {' '}
                    Resend
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          disabled={isLoading}
          onPress={verifyOtp}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Text style={styles.btnText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerCOntainer: {
    paddingHorizontal: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mainContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 26,
    fontFamily: fonts.bold,
  },
  subHEaderText: {
    textAlign: 'center',
    width: 320,
  },
  parentOtpContainer: {
    marginTop: 30,
  },
  otpCOntainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    height: 55,
    width: 55,
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.semibold,
  },
  resetnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resetText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  btnContainer: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
});

export default Otp;
