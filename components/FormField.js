import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '../constants/theme';

export default function FormField({ label, testID, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        testID={testID}
        style={styles.input}
        placeholderTextColor={COLORS.muted}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    height: 46,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
});
