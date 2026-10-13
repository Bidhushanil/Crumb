import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors, Spacing, Radius } from '../constants';

const RECIPES = [
  { id: '1', name: 'Pasta Primavera', time: '25 min', difficulty: 'Easy', match: 94, emoji: '🍝' },
  { id: '2', name: 'Stir-fry Noodles', time: '20 min', difficulty: 'Easy', match: 87, emoji: '🍜' },
  { id: '3', name: 'Vegetable Curry', time: '35 min', difficulty: 'Medium', match: 82, emoji: '🍛' },
  { id: '4', name: 'Omelette Florentine', time: '15 min', difficulty: 'Easy', match: 79, emoji: '🍳' },
];

interface Props {
  onOpenCamera: () => void;
  onOpenRecipe: (recipe: (typeof RECIPES)[0]) => void;
  onOpenType: () => void;
  onOpenSaved: () => void;
}

export default function HomeScreen({ onOpenCamera, onOpenRecipe, onOpenType, onOpenSaved }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.bg }}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={[styles.greetingSub, { color: c.text2 }]}>Good evening,</Text>
        <Text style={[styles.greetingName, { color: c.text }]}>Bidhusha 👋</Text>
      </View>

      {/* Scan hero */}
      <TouchableOpacity
        style={styles.hero}
        onPress={onOpenCamera}
        activeOpacity={0.9}
      >
        <Text style={styles.heroLabel}>SCAN YOUR KITCHEN</Text>
        <Text style={styles.heroTitle}>What's in your fridge today?</Text>
        <View style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>📷  Open camera</Text>
        </View>
      </TouchableOpacity>

      {/* Quick actions */}
      <Text style={[styles.sectionLabel, { color: c.text3 }]}>Add ingredients</Text>
      <View style={styles.tiles}>
        {[
          { label: 'Scan', emoji: '📷', action: onOpenCamera },
          { label: 'Type', emoji: '✏️', action: onOpenType },
          { label: 'Saved', emoji: '🔖', action: onOpenSaved },
        ].map(tile => (
          <TouchableOpacity
            key={tile.label}
            style={[styles.tile, { backgroundColor: c.surface, borderColor: c.border }]}
            onPress={tile.action}
            activeOpacity={0.8}
          >
            <Text style={styles.tileEmoji}>{tile.emoji}</Text>
            <Text style={[styles.tileLabel, { color: c.text2 }]}>{tile.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Suggestions */}
      <Text style={[styles.sectionLabel, { color: c.text3, marginTop: 8 }]}>
        Suggested for you
      </Text>
      {RECIPES.map(recipe => (
        <TouchableOpacity
          key={recipe.id}
          style={[styles.recipeCard, { backgroundColor: c.surface, borderColor: c.border }]}
          onPress={() => onOpenRecipe(recipe)}
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
            </View>
          </View>
          <View style={[styles.matchBadge, { backgroundColor: Colors.crumb + '20' }]}>
            <Text style={[styles.matchText, { color: Colors.crumb }]}>{recipe.match}%</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 0 },
  greetingSub: { fontSize: 13, marginBottom: 2 },
  greetingName: { fontSize: 26, fontWeight: '700', marginBottom: 20 },

  hero: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: Radius.lg,
    padding: 20,
    backgroundColor: Colors.crumbDark,
    overflow: 'hidden',
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 14,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  heroBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  sectionLabel: {
    paddingHorizontal: 20,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  tiles: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tileEmoji: { fontSize: 24 },
  tileLabel: { fontSize: 12, fontWeight: '500' },

  recipeCard: {
    marginHorizontal: 20,
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
  recipeMeta: { flexDirection: 'row', gap: 6 },
  recipeMetaText: { fontSize: 12 },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  matchText: { fontSize: 12, fontWeight: '700' },
});
