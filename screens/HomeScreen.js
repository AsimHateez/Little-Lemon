import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../components/AppHeader';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import { COLORS } from '../constants/theme';
import { CATEGORIES, MENU_ITEMS } from '../data/menuItems';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesQuery =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemText}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.itemPrice}>{`$${item.price.toFixed(2)}`}</Text>
      </View>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
    </View>
  );

  const listHeader = (
    <>
      <HeroSection>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </HeroSection>

      <View style={styles.breakdown}>
        <Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <Pressable
                key={category.id}
                testID={`category-${category.id}`}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${category.label}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedCategory(isSelected ? null : category.id)}
                style={[styles.chip, isSelected && styles.chipSelected]}
              >
                <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <AppHeader onProfilePress={() => navigation.navigate('Profile')} />

      <FlatList
        testID="menu-list"
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text testID="empty-menu-message" style={styles.emptyText}>
            No dishes found.
          </Text>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingBottom: 32,
  },
  breakdown: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.text,
  },
  chips: {
    gap: 10,
    paddingTop: 14,
    paddingBottom: 6,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: COLORS.cream,
  },
  chipSelected: {
    backgroundColor: COLORS.green,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.green,
  },
  chipLabelSelected: {
    color: COLORS.white,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemText: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  itemDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.muted,
  },
  itemPrice: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.green,
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 8,
    marginLeft: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    backgroundColor: COLORS.separator,
  },
  emptyText: {
    paddingHorizontal: 16,
    paddingTop: 32,
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
