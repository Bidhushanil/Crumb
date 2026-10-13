import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TabBar, { TabName } from './src/components/TabBar';
import Header from './src/components/Header';
import { Colors } from './src/constants';

type AppScreen =
  | 'auth'
  | 'onboarding'
  | 'app'
  | 'camera'
  | 'ingredients';

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const [screen, setScreen] = useState<AppScreen>('auth');
  const [tab, setTab] = useState<TabName>('home');
  const [foundIngredients, setFoundIngredients] = useState<string[]>([]);

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
              onOpenRecipe={(recipe) => {
                // Future: open recipe detail
                console.log('Open recipe:', recipe.name);
              }}
            />
          )}
          {tab === 'saved' && <SavedScreen />}
          {tab === 'profile' && <ProfileScreen onSignOut={signOut} />}
        </View>
        <TabBar active={tab} onPress={setTab} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
