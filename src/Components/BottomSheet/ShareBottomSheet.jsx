import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const ShareBottomSheet = ({ref, snapPoints = useMemo(() => ['15%'], [])}) => {
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

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      index={-1}
      animationConfigs={{
        duration: 300
      }}
     >
      <BottomSheetView style={{flex: 1, padding: 20}}>
        <TouchableOpacity>
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
