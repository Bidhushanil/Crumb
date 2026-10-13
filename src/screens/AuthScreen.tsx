import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, Radius } from '../constants';

interface Props {
  onSignIn: () => void;
}

export default function AuthScreen({ onSignIn }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.surface }]}>
      {/* Logo + tagline — vertically centred */}
      <View style={styles.centreBlock}>
        <Image
          source={require('../../assets/wordmark.png')}
          style={styles.wordmark}
          resizeMode="contain"
        />
        <Text style={[styles.tagline, { color: c.text2 }]}>
          Snap. Discover. Cook.
        </Text>
      </View>

      {/* Buttons + legal — pinned to bottom */}
      <View style={styles.bottomBlock}>
        {/* Google */}
        <TouchableOpacity
          style={[styles.authBtn, { backgroundColor: c.bg2, borderColor: c.border }]}
          onPress={onSignIn}
          activeOpacity={0.8}
        >
          <GoogleIcon />
          <Text style={[styles.authBtnText, { color: c.text }]}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={[styles.authBtn, styles.authBtnFacebook]}
          onPress={onSignIn}
          activeOpacity={0.8}
        >
          <FacebookIcon />
          <Text style={[styles.authBtnText, { color: Colors.white }]}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* TikTok */}
        <TouchableOpacity
          style={[styles.authBtn, styles.authBtnTikTok]}
          onPress={onSignIn}
          activeOpacity={0.8}
        >
          <TikTokIcon />
          <Text style={[styles.authBtnText, { color: Colors.white }]}>Continue with TikTok</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={[styles.terms, { color: c.text3 }]}>
          By continuing you agree to our{' '}
          <Text style={{ color: Colors.crumb }}>Terms of Service</Text>
          {'\n'}and <Text style={{ color: Colors.crumb }}>Privacy Policy</Text>
        </Text>

        {/* AZUE */}
        <View style={styles.azue}>
          <Text style={[styles.azuePowered, { color: c.text3 }]}>Powered by</Text>
          <Text style={[styles.azueName, { color: c.text2 }]}>AZUE</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ── Inline SVG icons as React Native Views ────────────────────────────────────

function GoogleIcon() {
  // We use an emoji-free SVG approximation with colored circles
  // Real app: use react-native-svg or an image asset
  return (
    <View style={iconStyles.google}>
      <View style={[iconStyles.googleSlice, { backgroundColor: '#4285F4', borderRadius: 9 }]} />
    </View>
  );
}

function FacebookIcon() {
  return (
    <View style={[iconStyles.social, { backgroundColor: '#fff', borderRadius: 2 }]}>
      <Text style={{ color: '#1877F2', fontSize: 13, fontWeight: '700' }}>f</Text>
    </View>
  );
}

function TikTokIcon() {
  return (
    <View style={[iconStyles.social, { backgroundColor: '#010101' }]}>
      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>TT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  centreBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  wordmark: {
    width: 240,
    height: 80,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
  bottomBlock: {
    width: '100%',
    alignItems: 'center',
  },
  authBtn: {
    width: '100%',
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  authBtnFacebook: {
    backgroundColor: Colors.facebook,
    borderWidth: 0,
  },
  authBtnTikTok: {
    backgroundColor: Colors.tiktok,
    borderWidth: 0,
  },
  authBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
  },
  azue: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    opacity: 0.5,
  },
  azuePowered: {
    fontSize: 11,
    letterSpacing: 0.4,
  },
  azueName: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});

const iconStyles = StyleSheet.create({
  google: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4285F4',
    overflow: 'hidden',
  },
  googleSlice: {
    flex: 1,
  },
  social: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
});
