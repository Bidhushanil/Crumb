import React from 'react';
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

export interface Recipe {
  id: string;
  name: string;
  time: string;
  difficulty: string;
  match: number;
  emoji: string;
}

interface Props {
  recipe: Recipe;
  onBack: () => void;
  onSave?: () => void;
}

const STEPS: Record<string, string[]> = {
  '1': [
    'Boil salted water and cook pasta until al dente.',
    'Sauté garlic and onion in olive oil until softened.',
    'Add chopped tomatoes and cook for 5 minutes.',
    'Toss pasta with the sauce, add butter and cheese.',
    'Season with salt and pepper. Serve immediately.',
  ],
  '2': [
    'Cook noodles according to package instructions.',
    'Stir-fry onion and garlic in a hot wok with oil.',
    'Add vegetables and toss for 2–3 minutes.',
    'Add noodles, soy sauce, and toss everything together.',
    'Finish with a drizzle of sesame oil.',
  ],
  '3': [
    'Heat oil in a pan and fry onion until golden.',
    'Add garlic, tomatoes and curry paste. Cook 3 min.',
    'Add vegetables and pour in coconut milk.',
    'Simmer for 20 minutes until vegetables are tender.',
    'Serve with rice and fresh coriander.',
  ],
  '4': [
    'Whisk eggs with a pinch of salt.',
    'Melt butter in a non-stick pan over medium heat.',
    'Pour in eggs and stir gently until just set.',
    'Add cheese and fold the omelette in half.',
    'Slide onto a plate and serve immediately.',
  ],
};

const DEFAULT_STEPS = [
  'Gather all your ingredients.',
  'Prepare and chop everything as needed.',
  'Cook following the recipe method.',
  'Season to taste and serve hot.',
];

const INGREDIENTS_MAP: Record<string, string[]> = {
  '1': ['200g pasta', '2 garlic cloves', '1 onion', '2 tomatoes', '50g butter', '50g parmesan'],
  '2': ['200g noodles', '1 onion', '2 garlic cloves', '2 tbsp soy sauce', '1 tsp sesame oil'],
  '3': ['1 onion', '3 garlic cloves', '2 tomatoes', '2 tbsp curry paste', '400ml coconut milk'],
  '4': ['3 eggs', '20g butter', '30g cheese', 'Salt & pepper'],
};

export default function RecipeDetailScreen({ recipe, onBack, onSave }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const steps = STEPS[recipe.id] ?? DEFAULT_STEPS;
  const ingredients = INGREDIENTS_MAP[recipe.id] ?? [];

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
        <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
          <Text style={{ fontSize: 20 }}>🔖</Text>
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
            <View style={[styles.metaPill, { backgroundColor: Colors.crumb }]}>
              <Text style={styles.metaText}>{recipe.match}% match</Text>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Ingredients</Text>
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            {ingredients.map((ing, i) => (
              <View
                key={i}
                style={[
                  styles.ingRow,
                  i < ingredients.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border },
                ]}
              >
                <Text style={styles.ingDot}>•</Text>
                <Text style={[styles.ingText, { color: c.text }]}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Method</Text>
          {steps.map((step, i) => (
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

  section: { padding: 20, paddingBottom: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },

  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  ingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  ingDot: { color: Colors.crumb, fontSize: 16 },
  ingText: { fontSize: 15 },

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
