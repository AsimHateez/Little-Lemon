import { useState } from 'react';
import {
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
import HeroSection from '../components/HeroSection';
import { COLORS } from '../constants/theme';
import { useProfile } from '../context/ProfileContext';

export default function OnboardingScreen({ navigation }) {
  const { saveProfile } = useProfile();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const canContinue = name.trim().length > 0 && email.trim().length > 0;

  const handleNext = async () => {
    if (!canContinue) {
      return;
    }

    await saveProfile({ firstName: name.trim(), email: email.trim() });
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <AppHeader />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <HeroSection />

          <View style={styles.form}>
            <FormField
              label="Name *"
              testID="onboarding-name-input"
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <FormField
              label="Email *"
              testID="onboarding-email-input"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleNext}
            />

            <Pressable
              testID="onboarding-next-button"
              accessibilityRole="button"
              accessibilityLabel="Next"
              accessibilityState={{ disabled: !canContinue }}
              disabled={!canContinue}
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextButton,
                !canContinue && styles.nextButtonDisabled,
                pressed && canContinue && styles.nextButtonPressed,
              ]}
            >
              <Text style={styles.nextLabel}>Next</Text>
            </Pressable>
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
  scrollContent: {
    paddingBottom: 32,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  nextButton: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: COLORS.green,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  nextButtonPressed: {
    opacity: 0.85,
  },
  nextLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});
