import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Colors, Radius } from '../constants';

const { width } = Dimensions.get('window');

type ScanState = 'idle' | 'scanning' | 'done';

interface Props {
  onBack: () => void;
  onIngredientsFound: (ingredients: string[]) => void;
}

const MOCK_INGREDIENTS = ['Eggs', 'Butter', 'Milk', 'Onion', 'Tomatoes', 'Garlic', 'Pasta', 'Cheese'];

export default function CameraScreen({ onBack, onIngredientsFound }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [state, setState] = useState<ScanState>('idle');

  function handleShutter() {
    setState('scanning');
    setTimeout(() => setState('done'), 2000);
  }

  // Permission not yet determined
  if (!permission) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={Colors.crumb} />
      </View>
    );
  }

  // Permission denied — show prompt
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.permTitle}>Camera access needed</Text>
        <Text style={styles.permSub}>
          Crumb needs your camera to scan ingredients.
        </Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Allow camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={{ marginTop: 16 }}>
          <Text style={styles.backLink}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Live camera fills the screen */}
      <CameraView style={StyleSheet.absoluteFill} facing="back" />

      {/* Dark overlay with viewfinder cutout */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Top overlay */}
        <View style={styles.overlayTop} />
        {/* Middle row */}
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          {/* Transparent viewfinder window */}
          <View style={styles.viewfinderWindow}>
            {/* Corner brackets */}
            <View style={[styles.bracket, styles.tl]} />
            <View style={[styles.bracket, styles.tr]} />
            <View style={[styles.bracket, styles.bl]} />
            <View style={[styles.bracket, styles.br]} />

            {state === 'scanning' && <View style={styles.scanLine} />}
            {state === 'done' && (
              <View style={styles.doneOverlay}>
                <Text style={styles.doneCheck}>✓</Text>
                <Text style={styles.doneText}>Ingredients detected!</Text>
              </View>
            )}
          </View>
          <View style={styles.overlaySide} />
        </View>
        {/* Bottom overlay */}
        <View style={styles.overlayBottom} />
      </View>

      {/* Hint text */}
      {state === 'idle' && (
        <View style={styles.hintRow} pointerEvents="none">
          <Text style={styles.hintText}>Point at your ingredients</Text>
        </View>
      )}

      {/* Controls */}
      <SafeAreaView edges={['bottom']} style={styles.controls}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        {state !== 'done' ? (
          <TouchableOpacity
            style={styles.shutterOuter}
            onPress={handleShutter}
            activeOpacity={0.8}
            disabled={state === 'scanning'}
          >
            {state === 'scanning'
              ? <ActivityIndicator color="#fff" />
              : <View style={styles.shutterInner} />
            }
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

const OVERLAY_COLOR = 'rgba(0,0,0,0.55)';
const VF_SIZE = width * 0.75;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 },

  // Overlay panels
  overlayTop: { backgroundColor: OVERLAY_COLOR, height: (Dimensions.get('window').height - VF_SIZE) / 2 - 60 },
  overlayMiddle: { flexDirection: 'row', height: VF_SIZE },
  overlaySide: { flex: 1, backgroundColor: OVERLAY_COLOR },
  overlayBottom: { flex: 1, backgroundColor: OVERLAY_COLOR },

  // Viewfinder
  viewfinderWindow: {
    width: VF_SIZE,
    height: VF_SIZE,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
  },
  tl: { top: 16, left: 16, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 6 },
  tr: { top: 16, right: 16, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 6 },
  bl: { bottom: 16, left: 16, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 6 },
  br: { bottom: 16, right: 16, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 6 },

  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: Colors.crumb,
    top: '45%',
  },
  doneOverlay: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
    borderRadius: 16,
  },
  doneCheck: { fontSize: 48, color: Colors.crumb },
  doneText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  hintRow: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hintText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  // Controls
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: { width: 60 },
  backBtnText: { color: 'rgba(255,255,255,0.7)', fontSize: 15 },
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

  // Permission screen
  permTitle: { color: '#fff', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  permSub: { color: 'rgba(255,255,255,0.6)', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  permBtn: {
    backgroundColor: Colors.crumb,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.full,
  },
  permBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  backLink: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
});
