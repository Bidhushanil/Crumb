import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../constants';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.72;

type ScanState = 'idle' | 'scanning' | 'done';

interface Props {
  onBack: () => void;
  onIngredientsFound: (ingredients: string[]) => void;
}

export default function CameraScreen({ onBack, onIngredientsFound }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const [state, setState] = useState<ScanState>('idle');

  const MOCK_INGREDIENTS = ['Eggs', 'Butter', 'Milk', 'Onion', 'Tomatoes', 'Garlic', 'Pasta', 'Cheese'];

  function simulate() {
    setState('scanning');
    setTimeout(() => {
      setState('done');
    }, 2000);
  }

  return (
    <View style={[styles.container, { backgroundColor: '#1A1714' }]}>
      {/* Dark viewfinder area */}
      <View style={styles.viewfinder}>
        {/* Corner brackets */}
        {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
          <View key={pos} style={[styles.bracket, styles[pos]]} />
        ))}

        {state === 'idle' && (
          <Text style={styles.hint}>Point at your ingredients</Text>
        )}
        {state === 'scanning' && (
          <View style={styles.scanLine} />
        )}
        {state === 'done' && (
          <View style={styles.doneOverlay}>
            <Text style={styles.doneCheck}>✓</Text>
            <Text style={styles.doneText}>Ingredients detected!</Text>
          </View>
        )}
      </View>

      {/* Bottom controls */}
      <SafeAreaView edges={['bottom']} style={[styles.controls, { backgroundColor: '#1A1714' }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        {state !== 'done' ? (
          <TouchableOpacity
            style={[styles.shutterOuter]}
            onPress={simulate}
            activeOpacity={0.8}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.useBtn, { backgroundColor: Colors.crumb }]}
            onPress={() => onIngredientsFound(MOCK_INGREDIENTS)}
            activeOpacity={0.85}
          >
            <Text style={styles.useBtnText}>Use these ingredients →</Text>
          </TouchableOpacity>
        )}

        <View style={{ width: 60 }} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewfinder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
    borderRadius: 24,
    backgroundColor: '#0D0B09',
    overflow: 'hidden',
  },
  bracket: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#3B1F0C',
    borderStyle: 'solid',
  },
  tl: { top: 20, left: 20, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 6 },
  tr: { top: 20, right: 20, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 6 },
  bl: { bottom: 20, left: 20, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 6 },
  br: { bottom: 20, right: 20, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 6 },
  hint: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: Colors.crumb,
    top: '40%',
  },
  doneOverlay: { alignItems: 'center', gap: 8 },
  doneCheck: { fontSize: 48, color: Colors.crumb },
  doneText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 60 },
  backBtnText: { color: 'rgba(255,255,255,0.6)', fontSize: 15 },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
  useBtn: {
    flex: 1,
    marginHorizontal: 16,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  useBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
