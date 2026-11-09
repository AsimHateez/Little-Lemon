import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/theme';

const logo = require('../assets/images/little-lemon-logo.png');
const avatar = require('../assets/images/avatar.jpg');

export default function AppHeader({ onBackPress, onProfilePress }) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBackPress ? (
          <Pressable
            testID="back-button"
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBackPress}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.green} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.brand}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Little Lemon logo"
        />
        <Text style={styles.brandText}>LITTLE LEMON</Text>
      </View>

      <View style={[styles.side, styles.sideEnd]}>
        {onProfilePress ? (
          <Pressable
            testID="profile-avatar-button"
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={onProfilePress}
          >
            <Image source={avatar} style={styles.avatar} accessibilityLabel="Profile avatar" />
          </Pressable>
        ) : (
          <Image source={avatar} style={styles.avatar} accessibilityLabel="Profile avatar" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.separator,
  },
  side: {
    width: 40,
    justifyContent: 'center',
  },
  sideEnd: {
    alignItems: 'flex-end',
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logo: {
    width: 26,
    height: 26,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.green,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cream,
    backgroundColor: COLORS.cream,
  },
});
