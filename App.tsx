import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import RecipeDetailScreen, { Recipe } from './src/screens/RecipeDetailScreen';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TabBar, { TabName } from './src/components/TabBar';
import Header from './src/components/Header';
import { Colors, Radius } from './src/constants';

type AppScreen =
  | 'auth'
  | 'onboarding'
  | 'app'
  | 'camera'
  | 'ingredients'
  | 'recipe';

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const [screen, setScreen] = useState<AppScreen>('auth');
  const [tab, setTab] = useState<TabName>('home');
  const [foundIngredients, setFoundIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [typeInput, setTypeInput] = useState('');

  function signIn() {
    setScreen('onboarding');
  }

  function finishOnboarding() {
    setScreen('app');
  }

  function openCamera() {
    setScreen('camera');
  }

  function handleIngredientsFound(ingredients: string[]) {
    setFoundIngredients(ingredients);
    setScreen('ingredients');
  }

  function handleFindRecipes() {
    setTab('home');
    setScreen('app');
  }

  function openRecipe(recipe: Recipe) {
    setSelectedRecipe(recipe);
    setScreen('recipe');
  }

  function openType() {
    setTypeInput('');
    setTypeModalVisible(true);
  }

  function submitTypeIngredients() {
    const parsed = typeInput
      .split(/[,\n]+/)
      .map(s => s.trim())
      .filter(Boolean);
    if (parsed.length === 0) return;
    setTypeModalVisible(false);
    setFoundIngredients(parsed);
    setScreen('ingredients');
  }

  function openSavedTab() {
    setTab('saved');
    setScreen('app');
  }

  function signOut() {
    setScreen('auth');
    setTab('home');
  }

  // Full-screen flows (no tab bar)
  if (screen === 'auth') {
    return (
      <SafeAreaProvider>
        <AuthScreen onSignIn={signIn} />
      </SafeAreaProvider>
    );
  }

  if (screen === 'onboarding') {
    return (
      <SafeAreaProvider>
        <OnboardingScreen onComplete={finishOnboarding} />
      </SafeAreaProvider>
    );
  }

  if (screen === 'camera') {
    return (
      <SafeAreaProvider>
        <CameraScreen
          onBack={() => setScreen('app')}
          onIngredientsFound={handleIngredientsFound}
        />
      </SafeAreaProvider>
    );
  }

  if (screen === 'ingredients') {
    return (
      <SafeAreaProvider>
        <IngredientsScreen
          ingredients={foundIngredients}
          onBack={() => setScreen('camera')}
          onFindRecipes={handleFindRecipes}
        />
      </SafeAreaProvider>
    );
  }

  if (screen === 'recipe' && selectedRecipe) {
    return (
      <SafeAreaProvider>
        <RecipeDetailScreen
          recipe={selectedRecipe}
          onBack={() => setScreen('app')}
          onSave={() => {}}
        />
      </SafeAreaProvider>
    );
  }

  // Main tab app
  const TAB_TITLES: Record<TabName, string> = {
    home: 'crumb',
    saved: 'Saved',
    profile: 'Profile',
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Header title={TAB_TITLES[tab]} />
        <View style={{ flex: 1 }}>
          {tab === 'home' && (
            <HomeScreen
              onOpenCamera={openCamera}
              onOpenRecipe={openRecipe}
              onOpenType={openType}
              onOpenSaved={openSavedTab}
            />
          )}
          {tab === 'saved' && <SavedScreen />}
          {tab === 'profile' && <ProfileScreen onSignOut={signOut} />}
        </View>
        <TabBar active={tab} onPress={setTab} />
      </View>

      {/* Type ingredients modal */}
      <Modal
        visible={typeModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setTypeModalVisible(false)}
          />
          <View style={[styles.modalSheet, { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }]}>
            <View style={styles.modalHandle} />
            <Text style={[styles.modalTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Type your ingredients
            </Text>
            <Text style={[styles.modalSub, { color: isDark ? Colors.dark.text2 : Colors.light.text2 }]}>
              Separate with commas or new lines
            </Text>
            <TextInput
              style={[styles.modalInput, {
                backgroundColor: isDark ? Colors.dark.bg : Colors.light.bg,
                color: isDark ? Colors.dark.text : Colors.light.text,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
              }]}
              placeholder="e.g. eggs, butter, tomatoes, garlic"
              placeholderTextColor={isDark ? Colors.dark.text3 : Colors.light.text3}
              value={typeInput}
              onChangeText={setTypeInput}
              multiline
              autoFocus
            />
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.crumb, opacity: typeInput.trim() ? 1 : 0.5 }]}
              onPress={submitTypeIngredients}
              disabled={!typeInput.trim()}
            >
              <Text style={styles.modalBtnText}>Find recipes →</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(128,128,128,0.3)',
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalTitle: { fontSize: 20, fontWeight: '700' },
  modalSub: { fontSize: 14, marginTop: -4 },
  modalInput: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    padding: 14,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: 4,
  },
  modalBtn: {
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  modalBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
