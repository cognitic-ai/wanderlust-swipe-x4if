import { useState } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeCard from '../../components/swipe-card';
import { countries, Country } from '../../data/countries';
import { label, secondaryLabel, systemBackground, systemGreen, systemRed, systemFill } from '@bacons/apple-colors';

export default function IndexRoute() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [passed, setPassed] = useState<Country[]>([]);
  const { height } = useWindowDimensions();

  const handleSwipeRight = () => {
    if (currentIndex < countries.length) {
      setFavorites([...favorites, countries[currentIndex]]);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < countries.length) {
      setPassed([...passed, countries[currentIndex]]);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setFavorites([]);
    setPassed([]);
  };

  const visibleCards = countries.slice(currentIndex, currentIndex + 3);
  const isComplete = currentIndex >= countries.length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: systemBackground as any,
        }}
      >
        {/* Header with counter */}
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              color: label as any,
              fontVariant: 'tabular-nums' as any,
            }}
            selectable
          >
            {currentIndex} / {countries.length}
          </Text>
        </View>

        {/* Card stack */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {!isComplete ? (
            <>
              {visibleCards.reverse().map((country, idx) => (
                <SwipeCard
                  key={country.id}
                  country={country}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  index={visibleCards.length - 1 - idx}
                  totalCards={visibleCards.length}
                />
              ))}
            </>
          ) : (
            <View style={{ alignItems: 'center', gap: 24, paddingHorizontal: 40 }}>
              <Text style={{ fontSize: 48 }}>🎉</Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: label as any,
                  textAlign: 'center',
                }}
                selectable
              >
                All Done!
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: secondaryLabel as any,
                  textAlign: 'center',
                }}
                selectable
              >
                You've reviewed all {countries.length} countries
              </Text>

              {/* Stats */}
              <View style={{ gap: 16, width: '100%', marginTop: 8 }}>
                <View
                  style={{
                    backgroundColor: systemFill as any,
                    borderRadius: 16,
                    borderCurve: 'continuous',
                    padding: 20,
                    gap: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                      color: label as any,
                    }}
                  >
                    Your Favorites ({favorites.length})
                  </Text>
                  {favorites.length > 0 ? (
                    favorites.map((country) => (
                      <View
                        key={country.id}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <Text style={{ fontSize: 32 }}>{country.flag}</Text>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: label as any,
                          }}
                          selectable
                        >
                          {country.name}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={{ fontSize: 15, color: secondaryLabel as any }}>
                      No favorites selected
                    </Text>
                  )}
                </View>
              </View>

              <Pressable
                onPress={handleReset}
                style={({ pressed }) => ({
                  backgroundColor: systemGreen as any,
                  paddingHorizontal: 32,
                  paddingVertical: 16,
                  borderRadius: 16,
                  borderCurve: 'continuous',
                  marginTop: 16,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    color: 'white',
                  }}
                >
                  Start Over
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Action buttons */}
        {!isComplete && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 48,
              paddingBottom: 48,
              paddingHorizontal: 20,
            }}
          >
            <Pressable
              onPress={handleSwipeLeft}
              style={({ pressed }) => ({
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: systemFill as any,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ fontSize: 32 }}>✕</Text>
            </Pressable>

            <Pressable
              onPress={handleSwipeRight}
              style={({ pressed }) => ({
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: systemGreen as any,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ fontSize: 36 }}>♥</Text>
            </Pressable>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
