import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { COLORS } from '../constants/theme';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color={COLORS.green} />
      <TextInput
        testID="search-input"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={COLORS.muted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search menu items"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
});
