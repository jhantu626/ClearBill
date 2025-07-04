import {
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
import React, {useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {invoicePDFTemplate} from '../../utils/InvoiceTemplate';
import RNHtmltoPdf from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const ShareBottomSheet = ({
  ref,
  snapPoints = useMemo(() => ['15%'], []),
  invoice,
}) => {
  console.log('share invoice', invoice);
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

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const sdkInt = parseInt(Platform.constants?.Release || '29', 10);

        // Android 13+ (API 33)
        if (sdkInt >= 33) {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ];

          const granted = await PermissionsAndroid.requestMultiple(permissions);

          const allGranted = permissions.every(
            perm => granted[perm] === PermissionsAndroid.RESULTS.GRANTED,
          );

          if (!allGranted) {
            Alert.alert(
              'Permission Denied',
              'App needs media access permissions to save/share invoices.',
            );
          }

          return allGranted;
        }

        // Android 10–12
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
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
    }

    return true; // iOS
  };

  const handleShare = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
        return;
      }
      console.log('invoice', invoice);
      const html = invoicePDFTemplate(invoice);

      const options = {
        html: html,
        fileName: `invoice_${invoice.id}`,
        directory: 'Documents',
      };

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
        <TouchableOpacity onPress={handleShare}>
          <Image
            source={require('./../../../assets/images/whatsapp.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ShareBottomSheet;

const styles = StyleSheet.create({});
