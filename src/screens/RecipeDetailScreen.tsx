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
import { Recipe } from '../data/recipes';

// Re-export Recipe so App.tsx can import it from here (backwards compat)
export type { Recipe };

interface Props {
  recipe: Recipe;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  /** Ingredients the user has — highlighted in the list */
  userIngredients?: string[];
}

function normalise(s: string) {
  return s.toLowerCase().trim();
}

function userHasIngredient(ing: string, userIngredients: string[]) {
  const n = normalise(ing);
  return userIngredients.some(u => {
    const un = normalise(u);
    return un.includes(n) || n.includes(un);
  });
}

export default function RecipeDetailScreen({
  recipe,
  onBack,
  isSaved,
  onToggleSave,
  userIngredients = [],
}: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const [serves, setServes] = useState(recipe.serves);

  // Scale ingredient amounts when serves changes
  const scale = serves / recipe.serves;
  function scaleAmount(amount: string): string {
    // Extract leading number and scale it
    const match = amount.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (!match) return amount;
    const num = parseFloat(match[1]) * scale;
    const unit = match[2];
    const formatted = Number.isInteger(num) ? num.toString() : num.toFixed(1).replace(/\.0$/, '');
    return `${formatted}${unit}`;
  }

  const matchedCount = userIngredients.length > 0
    ? recipe.ingredients.filter(i => userHasIngredient(i.name, userIngredients)).length
    : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border, backgroundColor: c.surface }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: c.text2 }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>
          {recipe.name}
        </Text>
        <TouchableOpacity onPress={onToggleSave} style={styles.saveBtn}>
          <Text style={{ fontSize: 22 }}>{isSaved ? '🔖' : '🏷️'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: Colors.crumbDark }]}>
          <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
          <Text style={styles.heroName}>{recipe.name}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>⏱ {recipe.time}</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>📊 {recipe.difficulty}</Text>
            </View>
            {matchedCount !== null && (
              <View style={[styles.metaPill, { backgroundColor: Colors.crumb }]}>
                <Text style={styles.metaText}>✓ {matchedCount}/{recipe.ingredients.length} ingredients</Text>
              </View>
            )}
          </View>
        </View>

        {/* Serves selector */}
        <View style={[styles.servesRow, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={[styles.servesLabel, { color: c.text }]}>Serves</Text>
          <View style={styles.servesControls}>
            <TouchableOpacity
              onPress={() => setServes(s => Math.max(1, s - 1))}
              style={[styles.servesBtn, { borderColor: c.border }]}
            >
              <Text style={[styles.servesBtnText, { color: c.text }]}>−</Text>
            </TouchableOpacity>
            <Text style={[styles.servesCount, { color: c.text }]}>{serves}</Text>
            <TouchableOpacity
              onPress={() => setServes(s => Math.min(12, s + 1))}
              style={[styles.servesBtn, { borderColor: c.border }]}
            >
              <Text style={[styles.servesBtnText, { color: c.text }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Ingredients</Text>
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            {recipe.ingredients.map((ing, i) => {
              const hasIt = userIngredients.length > 0 && userHasIngredient(ing.name, userIngredients);
              return (
                <View
                  key={i}
                  style={[
                    styles.ingRow,
                    i < recipe.ingredients.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border },
                  ]}
                >
                  <Text style={[styles.ingDot, hasIt && { color: '#4CAF50' }]}>
                    {hasIt ? '✓' : '•'}
                  </Text>
                  <Text style={[styles.ingText, { color: c.text }]}>
                    {scaleAmount(ing.amount)}
                  </Text>
                  {!hasIt && userIngredients.length > 0 && (
                    <Text style={[styles.ingMissing, { color: c.text3 }]}>missing</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Method</Text>
          {recipe.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: Colors.crumb }]}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={[styles.stepText, { color: c.text }]}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: { width: 60 },
  backText: { fontSize: 15 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '600', textAlign: 'center' },
  saveBtn: { width: 60, alignItems: 'flex-end' },

  hero: {
    padding: 28,
    alignItems: 'center',
    gap: 8,
  },
  heroEmoji: { fontSize: 56 },
  heroName: { fontSize: 22, fontWeight: '700', color: '#fff', textAlign: 'center' },
  heroMeta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 },
  metaPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  metaText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  servesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  servesLabel: { fontSize: 15, fontWeight: '600' },
  servesControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  servesBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  servesBtnText: { fontSize: 18, fontWeight: '400', marginTop: -1 },
  servesCount: { fontSize: 18, fontWeight: '700', minWidth: 24, textAlign: 'center' },

  section: { padding: 20, paddingBottom: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },

  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  ingDot: { color: Colors.crumb, fontSize: 16, width: 16 },
  ingText: { flex: 1, fontSize: 15 },
  ingMissing: { fontSize: 11, fontStyle: 'italic' },

  stepRow: { flexDirection: 'row', gap: 14, marginBottom: 16, alignItems: 'flex-start' },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  stepNumText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 15, lineHeight: 22 },
});
