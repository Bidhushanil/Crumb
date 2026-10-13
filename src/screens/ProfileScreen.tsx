import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../constants';

interface Props {
  onSignOut: () => void;
}

export default function ProfileScreen({ onSignOut }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const rows = [
    { label: 'Dietary preferences', icon: '🥗' },
    { label: 'Favourite cuisines', icon: '🌍' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'About Crumb', icon: 'ℹ️' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
      {/* Avatar */}
      <View style={styles.hero}>
        <View style={[styles.avatar, { backgroundColor: Colors.crumb }]}>
          <Text style={styles.avatarInitial}>B</Text>
        </View>
        <Text style={[styles.name, { color: c.text }]}>Bidhusha</Text>
        <Text style={[styles.email, { color: c.text2 }]}>bidhusha.anil@gmail.com</Text>
      </View>

      {/* Settings rows */}
      <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        {rows.map((row, i) => (
          <TouchableOpacity
            key={row.label}
            style={[
              styles.row,
              i < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border },
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.rowIcon}>{row.icon}</Text>
            <Text style={[styles.rowLabel, { color: c.text }]}>{row.label}</Text>
            <Text style={[styles.rowChevron, { color: c.text3 }]}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign out */}
      <TouchableOpacity
        style={[styles.signOut, { borderColor: c.border }]}
        onPress={onSignOut}
        activeOpacity={0.75}
      >
        <Text style={{ color: '#E03C3C', fontSize: 15, fontWeight: '500' }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitial: { color: '#fff', fontSize: 28, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  email: { fontSize: 14 },
  card: {
    marginHorizontal: 20,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  rowLabel: { flex: 1, fontSize: 15 },
  rowChevron: { fontSize: 20 },
  signOut: {
    marginHorizontal: 20,
    marginTop: 12,
    height: 52,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
