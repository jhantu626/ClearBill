import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {invoicePDFTemplate} from '../../utils/InvoiceTemplate';
import RNHtmltoPdf from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import Loader from '../Loaders/Loader';
import {colors} from '../../utils/colors';

const ShareBottomSheet = ({
  ref,
  snapPoints = useMemo(() => ['15%'], []),
  invoice,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
        />
      ),
    [],
  );

  // const requestPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const sdkInt = parseInt(Platform.constants?.Release || '29', 10);

  //       // Android 13+ (API 33)
  //       if (sdkInt >= 33) {
  //         const permissions = [
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //         ];

  //         const granted = await PermissionsAndroid.requestMultiple(permissions);

  //         const allGranted = permissions.every(
  //           perm => granted[perm] === PermissionsAndroid.RESULTS.GRANTED,
  //         );

  //         if (!allGranted) {
  //           Alert.alert(
  //             'Permission Denied',
  //             'App needs media access permissions to save/share invoices.',
  //           );
  //         }

  //         return allGranted;
  //       }

  //       // Android 10–12
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;

  //       if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //         Alert.alert(
  //           'Permission Required',
  //           'Storage permission permanently denied. Enable it from settings.',
  //           [
  //             {text: 'Cancel', style: 'cancel'},
  //             {text: 'Open Settings', onPress: () => Linking.openSettings()},
  //           ],
  //         );
  //       } else {
  //         Alert.alert(
  //           'Permission Denied',
  //           'Storage permission is required to share the invoice.',
  //         );
  //       }
  //       return false;
  //     } catch (err) {
  //       console.warn('Permission error:', err);
  //       return false;
  //     }
  //   }

  //   return true; // iOS
  // };

  const requestPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const sdkInt = Platform.Version;

      if (sdkInt >= 33) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = permissions.every(
          perm => granted[perm] === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (!allGranted) {
          Alert.alert(
            'Permission Denied',
            'App needs media access permissions to save or share invoices.',
          );
        }

        return allGranted;
      }

      // For Android 10-12 (API 29-32)
      // Request both READ_EXTERNAL_STORAGE and WRITE_EXTERNAL_STORAGE for better compatibility
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allGranted = permissions.every(
        perm => granted[perm] === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        return true;
      }

      if (
        permissions.some(
          perm => granted[perm] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
        )
      ) {
        Alert.alert(
          'Permission Required',
          'Storage permission permanently denied. Enable it from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
      } else {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to share the invoice.',
        );
      }

      return false;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const handleShare = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
        return;
      }
      const html = invoicePDFTemplate(invoice);

      const options = {
        html: html,
        fileName: `invoice_${invoice.id}`,
        directory: 'Documents',
      };

      setIsLoading(true);

      const file = await RNHtmltoPdf.convert(options);
      const filePath = `file://${file.filePath}`; // Prefix with file://

      await Share.shareSingle({
        title: 'Invoice',
        url: filePath,
        type: 'application/pdf',
        social: Share.Social.WHATSAPP,
        whatsAppNumber: `91${invoice.customerMobile}`, // WhatsApp expects number with country code, no '+'
        message: `${invoice.name} - invoice #${invoice.id}`,
      });
    } catch (error) {
      console.error('Error sharing invoice via WhatsApp:', error);
      ToastAndroid.show('Failed to share invoice', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // handleComponent={null}
      index={-1}
      animationConfigs={{
        duration: 300,
      }}>
      <BottomSheetView style={{flex: 1, padding: 20}}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: colors.inputBackground + '40',
          }}>
          <TouchableOpacity onPress={handleShare}>
            {isLoading ? (
              <Loader />
            ) : (
              <Image
                source={require('./../../../assets/images/whatsapp.png')}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ShareBottomSheet;

const styles = StyleSheet.create({});
