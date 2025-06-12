import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';

const UploadInput = ({title, subTitle}) => {
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.request(permission);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const handleImagePickcker = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
      return;
    }
    ImageCropPicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      avoidEmptySpaceAroundImage: true
    }).then(image => {
      ToastAndroid.show('Image Picked', ToastAndroid.SHORT);
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImagePickcker}>
      <AntDesign name="clouduploado" size={50} color={'#000'} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>{subTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBackground,
    borderStyle: 'dashed',
  },
  titleText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  subTitleText: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});

export default UploadInput;
