import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Layout } from '../constants';

interface Props {
  title: string;
  right?: React.ReactNode;
}

export default function Header({ title, right }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: c.surface, borderBottomColor: c.border }]}>
      <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  right: {},
});
