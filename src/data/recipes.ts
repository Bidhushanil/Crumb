// Central recipe database — single source of truth for all recipe data

export interface Recipe {
  id: string;
  name: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  emoji: string;
  serves: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  tags: string[];
}

export interface RecipeIngredient {
  name: string;
  amount: string;
}

export const ALL_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Primavera',
    time: '25 min',
    difficulty: 'Easy',
    emoji: '🍝',
    serves: 2,
    tags: ['pasta', 'vegetarian', 'italian'],
    ingredients: [
      { name: 'pasta', amount: '200g pasta' },
      { name: 'garlic', amount: '2 garlic cloves' },
      { name: 'onion', amount: '1 onion' },
      { name: 'tomatoes', amount: '2 tomatoes' },
      { name: 'butter', amount: '50g butter' },
      { name: 'parmesan', amount: '50g parmesan' },
    ],
    steps: [
      'Boil salted water and cook pasta until al dente.',
      'Sauté garlic and onion in olive oil until softened.',
      'Add chopped tomatoes and cook for 5 minutes.',
      'Toss pasta with the sauce, add butter and cheese.',
      'Season with salt and pepper. Serve immediately.',
    ],
  },
  {
    id: '2',
    name: 'Stir-fry Noodles',
    time: '20 min',
    difficulty: 'Easy',
    emoji: '🍜',
    serves: 2,
    tags: ['noodles', 'asian', 'quick'],
    ingredients: [
      { name: 'noodles', amount: '200g noodles' },
      { name: 'onion', amount: '1 onion' },
      { name: 'garlic', amount: '2 garlic cloves' },
      { name: 'soy sauce', amount: '2 tbsp soy sauce' },
      { name: 'sesame oil', amount: '1 tsp sesame oil' },
      { name: 'vegetables', amount: 'mixed vegetables' },
    ],
    steps: [
      'Cook noodles according to package instructions.',
      'Stir-fry onion and garlic in a hot wok with oil.',
      'Add vegetables and toss for 2–3 minutes.',
      'Add noodles, soy sauce, and toss everything together.',
      'Finish with a drizzle of sesame oil.',
    ],
  },
  {
    id: '3',
    name: 'Vegetable Curry',
    time: '35 min',
    difficulty: 'Medium',
    emoji: '🍛',
    serves: 3,
    tags: ['curry', 'vegetarian', 'indian'],
    ingredients: [
      { name: 'onion', amount: '1 onion' },
      { name: 'garlic', amount: '3 garlic cloves' },
      { name: 'tomatoes', amount: '2 tomatoes' },
      { name: 'curry paste', amount: '2 tbsp curry paste' },
      { name: 'coconut milk', amount: '400ml coconut milk' },
      { name: 'vegetables', amount: 'mixed vegetables' },
      { name: 'rice', amount: '200g rice' },
    ],
    steps: [
      'Heat oil in a pan and fry onion until golden.',
      'Add garlic, tomatoes and curry paste. Cook 3 min.',
      'Add vegetables and pour in coconut milk.',
      'Simmer for 20 minutes until vegetables are tender.',
      'Serve with rice and fresh coriander.',
    ],
  },
  {
    id: '4',
    name: 'Omelette Florentine',
    time: '15 min',
    difficulty: 'Easy',
    emoji: '🍳',
    serves: 1,
    tags: ['eggs', 'quick', 'breakfast'],
    ingredients: [
      { name: 'eggs', amount: '3 eggs' },
      { name: 'butter', amount: '20g butter' },
      { name: 'cheese', amount: '30g cheese' },
      { name: 'salt', amount: 'pinch of salt' },
      { name: 'pepper', amount: 'pinch of pepper' },
    ],
    steps: [
      'Whisk eggs with a pinch of salt.',
      'Melt butter in a non-stick pan over medium heat.',
      'Pour in eggs and stir gently until just set.',
      'Add cheese and fold the omelette in half.',
      'Slide onto a plate and serve immediately.',
    ],
  },
  {
    id: '5',
    name: 'Tomato Soup',
    time: '30 min',
    difficulty: 'Easy',
    emoji: '🍲',
    serves: 2,
    tags: ['soup', 'vegetarian', 'comfort'],
    ingredients: [
      { name: 'tomatoes', amount: '6 tomatoes' },
      { name: 'onion', amount: '1 onion' },
      { name: 'garlic', amount: '2 garlic cloves' },
      { name: 'butter', amount: '30g butter' },
      { name: 'milk', amount: '100ml milk' },
    ],
    steps: [
      'Sauté onion and garlic in butter until soft.',
      'Add chopped tomatoes and cook for 10 minutes.',
      'Blend until smooth with a stick blender.',
      'Stir in milk and season with salt and pepper.',
      'Heat through and serve with crusty bread.',
    ],
  },
  {
    id: '6',
    name: 'Scrambled Eggs on Toast',
    time: '10 min',
    difficulty: 'Easy',
    emoji: '🥚',
    serves: 1,
    tags: ['eggs', 'breakfast', 'quick'],
    ingredients: [
      { name: 'eggs', amount: '3 eggs' },
      { name: 'butter', amount: '20g butter' },
      { name: 'milk', amount: '2 tbsp milk' },
      { name: 'bread', amount: '2 slices bread' },
    ],
    steps: [
      'Whisk eggs with milk, salt and pepper.',
      'Melt butter in a pan over low heat.',
      'Add eggs and stir slowly until creamy and just set.',
      'Toast the bread.',
      'Serve eggs on toast immediately.',
    ],
  },
  {
    id: '7',
    name: 'Garlic Butter Rice',
    time: '20 min',
    difficulty: 'Easy',
    emoji: '🍚',
    serves: 2,
    tags: ['rice', 'side', 'quick'],
    ingredients: [
      { name: 'rice', amount: '200g rice' },
      { name: 'butter', amount: '30g butter' },
      { name: 'garlic', amount: '3 garlic cloves' },
      { name: 'onion', amount: '½ onion' },
    ],
    steps: [
      'Rinse rice until water runs clear.',
      'Fry garlic and onion in butter for 2 minutes.',
      'Add rice and stir to coat in the butter.',
      'Add water (ratio 1:2) and bring to a boil.',
      'Cover and simmer on low for 15 minutes. Fluff and serve.',
    ],
  },
  {
    id: '8',
    name: 'French Toast',
    time: '15 min',
    difficulty: 'Easy',
    emoji: '🍞',
    serves: 2,
    tags: ['breakfast', 'sweet', 'eggs'],
    ingredients: [
      { name: 'bread', amount: '4 slices bread' },
      { name: 'eggs', amount: '2 eggs' },
      { name: 'milk', amount: '50ml milk' },
      { name: 'butter', amount: '20g butter' },
    ],
    steps: [
      'Whisk eggs and milk together in a shallow bowl.',
      'Dip bread slices into the egg mixture on both sides.',
      'Fry in butter over medium heat until golden — 2 min per side.',
      'Serve with maple syrup or jam.',
    ],
  },
];

/**
 * Score a recipe against available ingredients.
 * Returns matchCount (how many recipe ingredients the user has) and
 * matchPct (0-100).
 */
export interface MatchResult {
  recipe: Recipe;
  matchCount: number;
  totalIngredients: number;
  matchPct: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

function normalise(s: string): string {
  return s.toLowerCase().trim();
}

export function scoreRecipes(userIngredients: string[]): MatchResult[] {
  const userNorm = userIngredients.map(normalise);

  return ALL_RECIPES.map(recipe => {
    const matched: string[] = [];
    const missing: string[] = [];

    for (const ing of recipe.ingredients) {
      const ingNorm = normalise(ing.name);
      // Match if any user ingredient contains or is contained by the recipe ingredient name
      const found = userNorm.some(
        u => u.includes(ingNorm) || ingNorm.includes(u)
      );
      if (found) {
        matched.push(ing.name);
      } else {
        missing.push(ing.name);
      }
    }

    const matchPct = Math.round((matched.length / recipe.ingredients.length) * 100);

    return {
      recipe,
      matchCount: matched.length,
      totalIngredients: recipe.ingredients.length,
      matchPct,
      matchedIngredients: matched,
      missingIngredients: missing,
    };
  })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchPct - a.matchPct);
}
