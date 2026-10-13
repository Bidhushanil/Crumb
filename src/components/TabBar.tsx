import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Layout } from '../constants';

export type TabName = 'home' | 'saved' | 'profile';

const TABS: { id: TabName; label: string; emoji: string }[] = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'saved', label: 'Saved', emoji: '🔖' },
  { id: 'profile', label: 'Profile', emoji: '👤' },
];

interface Props {
  active: TabName;
  onPress: (tab: TabName) => void;
}

export default function TabBar({ active, onPress }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: c.surface, borderTopColor: c.border }]}>
      <SafeAreaView edges={['bottom']} style={styles.inner}>
        {TABS.map(tab => {
          const isActive = tab.id === active;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onPress(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.emoji, isActive && styles.emojiActive]}>
                {tab.emoji}
              </Text>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? Colors.crumb : c.text3 },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  inner: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    gap: 3,
  },
  emoji: { fontSize: 22, opacity: 0.45 },
  emojiActive: { opacity: 1 },
  label: { fontSize: 10, fontWeight: '600', letterSpacing: 0.2 },
});
