import React, { useState, useMemo } from 'react';
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
import { scoreRecipes, MatchResult } from '../data/recipes';
import { Recipe } from '../data/recipes';

interface Props {
  ingredients: string[];
  onBack: () => void;
  onOpenRecipe: (recipe: Recipe, userIngredients: string[]) => void;
}

export default function IngredientsScreen({ ingredients, onBack, onOpenRecipe }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const [items, setItems] = useState(ingredients);
  const [showResults, setShowResults] = useState(false);

  function remove(item: string) {
    setItems(prev => prev.filter(i => i !== item));
  }

  const results: MatchResult[] = useMemo(() => scoreRecipes(items), [items]);

  if (showResults) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
        <View style={[styles.header, { borderBottomColor: c.border }]}>
          <TouchableOpacity onPress={() => setShowResults(false)} style={styles.backBtn}>
            <Text style={[styles.backText, { color: c.text2 }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.text }]}>Recipes for you</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.sub, { color: c.text2 }]}>
            {results.length > 0
              ? `${results.length} recipe${results.length !== 1 ? 's' : ''} match your ${items.length} ingredients`
              : 'No recipes matched — try adding more ingredients'}
          </Text>

          {results.map(({ recipe, matchCount, totalIngredients, matchPct }) => (
            <TouchableOpacity
              key={recipe.id}
              style={[styles.recipeCard, { backgroundColor: c.surface, borderColor: c.border }]}
              onPress={() => onOpenRecipe(recipe, items)}
              activeOpacity={0.8}
            >
              <View style={[styles.recipeEmoji, { backgroundColor: c.bg2 }]}>
                <Text style={{ fontSize: 28 }}>{recipe.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.recipeName, { color: c.text }]}>{recipe.name}</Text>
                <View style={styles.recipeMeta}>
                  <Text style={[styles.recipeMetaText, { color: c.text3 }]}>{recipe.time}</Text>
                  <Text style={[styles.recipeMetaText, { color: c.text3 }]}>·</Text>
                  <Text style={[styles.recipeMetaText, { color: c.text3 }]}>{recipe.difficulty}</Text>
                  <Text style={[styles.recipeMetaText, { color: c.text3 }]}>·</Text>
                  <Text style={[styles.recipeMetaText, { color: Colors.crumb }]}>
                    {matchCount}/{totalIngredients} ingredients
                  </Text>
                </View>
              </View>
              <View style={[
                styles.matchBadge,
                { backgroundColor: matchPct >= 80 ? Colors.crumb + '22' : c.bg2 },
              ]}>
                <Text style={[styles.matchText, { color: matchPct >= 80 ? Colors.crumb : c.text2 }]}>
                  {matchPct}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {results.length === 0 && (
            <View style={styles.empty}>
              <Text style={{ fontSize: 48 }}>🤷</Text>
              <Text style={[styles.emptyTitle, { color: c.text }]}>No matches yet</Text>
              <Text style={[styles.emptySub, { color: c.text2 }]}>
                Go back and add more ingredients to unlock recipes.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
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

        {/* Preview count */}
        {items.length > 0 && (
          <Text style={[styles.preview, { color: c.text3 }]}>
            Matches {results.length} recipe{results.length !== 1 ? 's' : ''}
          </Text>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { borderTopColor: c.border, backgroundColor: c.surface }]}>
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: Colors.crumb, opacity: items.length > 0 ? 1 : 0.5 }]}
          onPress={() => setShowResults(true)}
          disabled={items.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>
            Find recipes with {items.length} ingredient{items.length !== 1 ? 's' : ''} →
          </Text>
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
  preview: { fontSize: 13, marginTop: 20, textAlign: 'center', fontStyle: 'italic' },
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

  // Results view
  recipeCard: {
    marginBottom: 10,
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recipeEmoji: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeName: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  recipeMeta: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  recipeMetaText: { fontSize: 12 },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  matchText: { fontSize: 12, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
