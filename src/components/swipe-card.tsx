import { useWindowDimensions } from 'react-native';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Country } from '../data/countries';
import { label, secondaryLabel, tertiaryLabel, systemBackground, systemGreen, systemRed } from '@bacons/apple-colors';

interface SwipeCardProps {
  country: Country;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
  totalCards: number;
}

const SWIPE_THRESHOLD = 120;
const ROTATION_ANGLE = 20;

export default function SwipeCard({ country, onSwipeLeft, onSwipeRight, index, totalCards }: SwipeCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const scale = interpolate(
    index,
    [0, 1, 2],
    [1, 0.95, 0.9]
  );

  const yOffset = interpolate(
    index,
    [0, 1, 2],
    [0, -10, -20]
  );

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 1 : -1;
        translateX.value = withTiming(direction * screenWidth * 1.5, { duration: 300 });
        translateY.value = withTiming(event.translationY + direction * 100, { duration: 300 });

        if (direction > 0) {
          runOnJS(onSwipeRight)();
        } else {
          runOnJS(onSwipeLeft)();
        }
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-ROTATION_ANGLE, 0, ROTATION_ANGLE]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale },
      ],
      opacity: index === 0 ? 1 : 0.5,
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: screenWidth - 40,
          height: 560,
          alignSelf: 'center',
          top: yOffset,
        },
        animatedStyle,
      ]}
    >
      <GestureDetector gesture={panGesture}>
        <View
          style={{
            flex: 1,
            backgroundColor: systemBackground as any,
            borderRadius: 24,
            borderCurve: 'continuous',
            padding: 20,
            gap: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
          }}
        >
          {/* Like/Nope stamps */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 40,
                right: 40,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderWidth: 4,
                borderColor: systemGreen as any,
                borderRadius: 8,
                transform: [{ rotate: '20deg' }],
                zIndex: 10,
              },
              likeOpacity,
            ]}
          >
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: systemGreen as any }}>
              LOVE
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 40,
                left: 40,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderWidth: 4,
                borderColor: systemRed as any,
                borderRadius: 8,
                transform: [{ rotate: '-20deg' }],
                zIndex: 10,
              },
              nopeOpacity,
            ]}
          >
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: systemRed as any }}>
              NOPE
            </Text>
          </Animated.View>

          {/* Flag */}
          <View style={{ alignItems: 'center', paddingTop: 20 }}>
            <Text style={{ fontSize: 120 }}>{country.flag}</Text>
          </View>

          {/* Country name */}
          <Text
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: label as any,
              textAlign: 'center',
            }}
            selectable
          >
            {country.name}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 18,
              color: secondaryLabel as any,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
            selectable
          >
            {country.description}
          </Text>

          {/* Info */}
          <View style={{ gap: 12, marginTop: 8 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontSize: 16, color: tertiaryLabel as any }}>Capital:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: label as any }} selectable>
                {country.capital}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontSize: 16, color: tertiaryLabel as any }}>Region:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: label as any }} selectable>
                {country.region}
              </Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={{ gap: 8, marginTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: label as any }}>
              Highlights:
            </Text>
            {country.highlights.map((highlight, idx) => (
              <Text
                key={idx}
                style={{ fontSize: 15, color: secondaryLabel as any, paddingLeft: 8 }}
                selectable
              >
                • {highlight}
              </Text>
            ))}
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
}
