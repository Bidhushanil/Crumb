import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors, Radius } from '../constants';
import { ALL_RECIPES, Recipe } from '../data/recipes';

interface Props {
  savedIds: string[];
  onOpenRecipe: (recipe: Recipe) => void;
}

export default function SavedScreen({ savedIds, onOpenRecipe }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const saved = ALL_RECIPES.filter(r => savedIds.includes(r.id));

  if (saved.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: c.bg }]}>
        <Text style={styles.emptyEmoji}>🔖</Text>
        <Text style={[styles.emptyTitle, { color: c.text }]}>No saved recipes yet</Text>
        <Text style={[styles.emptySub, { color: c.text2 }]}>
          Tap the bookmark icon on any recipe to save it here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.bg }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.count, { color: c.text3 }]}>
        {saved.length} saved recipe{saved.length !== 1 ? 's' : ''}
      </Text>

      {saved.map(recipe => (
        <TouchableOpacity
          key={recipe.id}
          style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}
          onPress={() => onOpenRecipe(recipe)}
          activeOpacity={0.8}
        >
          <View style={[styles.emojiBox, { backgroundColor: c.bg2 }]}>
            <Text style={{ fontSize: 28 }}>{recipe.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: c.text }]}>{recipe.name}</Text>
            <View style={styles.meta}>
              <Text style={[styles.metaText, { color: c.text3 }]}>{recipe.time}</Text>
              <Text style={[styles.metaText, { color: c.text3 }]}>·</Text>
              <Text style={[styles.metaText, { color: c.text3 }]}>{recipe.difficulty}</Text>
              <Text style={[styles.metaText, { color: c.text3 }]}>·</Text>
              <Text style={[styles.metaText, { color: c.text3 }]}>Serves {recipe.serves}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20 }}>🔖</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 22 },

  content: { padding: 20 },
  count: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  emojiBox: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  meta: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  metaText: { fontSize: 12 },
});
