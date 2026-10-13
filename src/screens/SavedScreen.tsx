import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants';

export default function SavedScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Text style={[styles.emoji]}>🔖</Text>
      <Text style={[styles.title, { color: c.text }]}>No saved recipes yet</Text>
      <Text style={[styles.sub, { color: c.text2 }]}>
        Tap the bookmark on any recipe to save it here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
