import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../components/AppHeader';
import FormField from '../components/FormField';
import { COLORS } from '../constants/theme';
import { EMPTY_PROFILE, useProfile } from '../context/ProfileContext';

const avatar = require('../assets/images/avatar.jpg');

const NOTIFICATIONS = [
  { key: 'orderStatuses', label: 'Order statuses' },
  { key: 'passwordChanges', label: 'Password changes' },
  { key: 'specialOffers', label: 'Special offers' },
  { key: 'newsletter', label: 'Newsletter' },
];

export default function ProfileScreen({ navigation }) {
  const { profile, saveProfile, logOut } = useProfile();
  const [draft, setDraft] = useState(profile ?? EMPTY_PROFILE);
  const [isSaved, setIsSaved] = useState(false);

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setIsSaved(false);
  };

  const toggleNotification = (key) => {
    setDraft((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    await saveProfile(draft);
    setIsSaved(true);
  };

  const handleDiscard = () => {
    setDraft(profile ?? EMPTY_PROFILE);
    setIsSaved(false);
  };

  const handleLogOut = async () => {
    await logOut();
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <AppHeader onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal information</Text>

            <Image source={avatar} style={styles.avatar} accessibilityLabel="Profile avatar" />

            <FormField
              label="First name"
              testID="profile-first-name"
              value={draft.firstName}
              onChangeText={(value) => updateField('firstName', value)}
              autoCapitalize="words"
            />
            <FormField
              label="Last name"
              testID="profile-last-name"
              value={draft.lastName}
              onChangeText={(value) => updateField('lastName', value)}
              autoCapitalize="words"
            />
            <FormField
              label="Email"
              testID="profile-email"
              value={draft.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormField
              label="Phone number"
              testID="profile-phone"
              value={draft.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Email notifications</Text>

            {NOTIFICATIONS.map(({ key, label }) => {
              const isChecked = draft.notifications[key];

              return (
                <Pressable
                  key={key}
                  testID={`notification-${key}`}
                  accessibilityRole="checkbox"
                  accessibilityLabel={label}
                  accessibilityState={{ checked: isChecked }}
                  aria-checked={isChecked}
                  onPress={() => toggleNotification(key)}
                  style={styles.checkboxRow}
                >
                  <Ionicons
                    name={isChecked ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={COLORS.green}
                  />
                  <Text style={styles.checkboxLabel}>{label}</Text>
                </Pressable>
              );
            })}

            <Pressable
              testID="logout-button"
              accessibilityRole="button"
              accessibilityLabel="Log out"
              onPress={handleLogOut}
              style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
            >
              <Text style={styles.logoutLabel}>Log out</Text>
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                testID="discard-changes-button"
                accessibilityRole="button"
                accessibilityLabel="Discard changes"
                onPress={handleDiscard}
                style={({ pressed }) => [styles.discardButton, pressed && styles.pressed]}
              >
                <Text style={styles.discardLabel}>Discard changes</Text>
              </Pressable>

              <Pressable
                testID="save-changes-button"
                accessibilityRole="button"
                accessibilityLabel="Save changes"
                onPress={handleSave}
                style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
              >
                <Text style={styles.saveLabel}>Save changes</Text>
              </Pressable>
            </View>

            {isSaved && (
              <Text testID="saved-message" style={styles.savedText}>
                Changes saved
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.separator,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: COLORS.cream,
  },
  sectionTitle: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  logoutButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: COLORS.yellow,
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  discardButton: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  discardLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.green,
  },
  saveButton: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.green,
  },
  saveLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.85,
  },
  savedText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.green,
    textAlign: 'center',
  },
});
