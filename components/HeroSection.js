import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, HEADING_FONT } from '../constants/theme';

const heroImage = require('../assets/images/hero.jpg');

export default function HeroSection({ children }) {
  return (
    <View style={styles.hero}>
      <View style={styles.top}>
        <View style={styles.textColumn}>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes
            served with a modern twist.
          </Text>
        </View>
        <Image
          source={heroImage}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel="Little Lemon signature dish"
        />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontFamily: HEADING_FONT,
    fontSize: 36,
    lineHeight: 40,
    color: COLORS.yellow,
  },
  subtitle: {
    fontFamily: HEADING_FONT,
    fontSize: 26,
    lineHeight: 30,
    color: COLORS.white,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.white,
  },
  image: {
    width: 120,
    height: 145,
    borderRadius: 12,
  },
});
