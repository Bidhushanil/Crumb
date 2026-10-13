import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../constants';

const STEPS = [
  {
    title: 'What cuisines do you love?',
    sub: "We'll prioritise recipes that match your taste.",
    options: ['Italian', 'Japanese', 'Indian', 'Mexican', 'Thai', 'French', 'Chinese', 'Mediterranean', 'Korean', 'American', 'Middle Eastern', 'Greek'],
  },
  {
    title: 'Any dietary preferences?',
    sub: "We'll filter out recipes that don't work for you.",
    options: ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Halal', 'Kosher', 'Paleo', 'Keto', 'Low-carb'],
  },
  {
    title: 'How much time do you usually have?',
    sub: "We'll suggest recipes that fit your schedule.",
    options: ['Under 15 min', '15–30 min', '30–60 min', '1–2 hours', 'All day'],
  },
  {
    title: 'How confident are you in the kitchen?',
    sub: "We'll match recipe complexity to your skill level.",
    options: ['Beginner', 'Getting there', 'Comfortable', 'Advanced', 'Chef-level'],
  },
];

interface Props {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[][]>(STEPS.map(() => []));

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function toggle(item: string) {
    setSelections(prev => {
      const copy = prev.map(s => [...s]);
      const idx = copy[step].indexOf(item);
      if (idx >= 0) copy[step].splice(idx, 1);
      else copy[step].push(item);
      return copy;
    });
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else onComplete();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: c.bg }]}>
        <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: Colors.crumb }]} />
        </View>
        <Text style={[styles.title, { color: c.text }]}>{current.title}</Text>
        <Text style={[styles.sub, { color: c.text2 }]}>{current.sub}</Text>
      </View>

      {/* Chips */}
      <ScrollView
        contentContainerStyle={styles.chips}
        showsVerticalScrollIndicator={false}
      >
        {current.options.map(item => {
          const selected = selections[step].includes(item);
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                { borderColor: c.border, backgroundColor: c.surface },
                selected && { backgroundColor: Colors.crumb, borderColor: Colors.crumb },
              ]}
              onPress={() => toggle(item)}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, { color: c.text2 }, selected && { color: '#fff' }]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: c.border, backgroundColor: c.surface }]}>
        <TouchableOpacity style={[styles.btnSkip, { borderColor: c.border }]} onPress={next}>
          <Text style={[styles.btnSkipText, { color: c.text2 }]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNext} onPress={next}>
          <Text style={styles.btnNextText}>
            {step < STEPS.length - 1 ? 'Next →' : 'Finish →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  progressTrack: { height: 3, borderRadius: 2, overflow: 'hidden', marginBottom: 24 },
  progressFill: { height: '100%', borderRadius: 2 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  sub: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 13, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  btnSkip: {
    flex: 1,
    height: 48,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSkipText: { fontSize: 15, fontWeight: '500' },
  btnNext: {
    flex: 2,
    height: 48,
    borderRadius: Radius.sm,
    backgroundColor: Colors.crumb,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnNextText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});
