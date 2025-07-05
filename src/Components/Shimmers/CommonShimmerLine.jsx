import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const CommonShimmerLine = ({width = '100%', height = 14, style, ...rest}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        })
      ).start();
    }, []);
  
    const backgroundColor = shimmerAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#E0E0E0', '#F5F5F5', '#E0E0E0'],
    });
  
    return (
      <Animated.View
        style={[
          { backgroundColor, borderRadius: 6, marginVertical: 4 },
          { width, height },
          style,
        ]}
      />
    );
};

export default CommonShimmerLine;
