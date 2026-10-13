import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../constants';

interface Props {
  ingredients: string[];
  onBack: () => void;
  onFindRecipes: () => void;
}

export default function IngredientsScreen({ ingredients, onBack, onFindRecipes }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const [items, setItems] = useState(ingredients);

  function remove(item: string) {
    setItems(prev => prev.filter(i => i !== item));
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: c.text2 }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Ingredients</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sub, { color: c.text2 }]}>
          {items.length} ingredient{items.length !== 1 ? 's' : ''} detected — tap to remove any
        </Text>

        <View style={styles.chips}>
          {items.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, { backgroundColor: c.surface, borderColor: c.border }]}
              onPress={() => remove(item)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, { color: c.text }]}>{item}</Text>
              <Text style={[styles.chipX, { color: c.text3 }]}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { borderTopColor: c.border, backgroundColor: c.surface }]}>
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: Colors.crumb }]}
          onPress={onFindRecipes}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Find recipes with {items.length} ingredients →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backBtn: { width: 60 },
  backText: { fontSize: 15 },
  title: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600' },
  content: { padding: 20 },
  sub: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 14, fontWeight: '500' },
  chipX: { fontSize: 16 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  cta: {
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
