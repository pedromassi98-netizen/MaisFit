import { UserData, NutritionPlan, Meal, Food, Supplement } from './types';

// Base de dados de alimentos com quantidades exatas
const FOODS_DATABASE = {
  carbs: [
    { name: 'Aveia em flocos', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, amount: '20g' },
    { name: 'Arroz integral cozido', calories: 112, protein: 2.6, carbs: 22, fat: 0.9, amount: '100g' },
    { name: 'Batata doce cozida', calories: 76, protein: 1.4, carbs: 17.7, fat: 0.1, amount: '100g' },
    { name: 'Pão integral', calories: 69, protein: 3.5, carbs: 11.6, fat: 1.1, amount: '25g' },
    { name: 'Macarrão integral cozido', calories: 124, protein: 5, carbs: 25, fat: 1.1, amount: '100g' },
    { name: 'Quinoa cozida', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, amount: '100g' },
    { name: 'Tapioca', calories: 67, protein: 0.2, carbs: 16.7, fat: 0.02, amount: '25g' }
  ],
  proteins: [
    { name: 'Peito de frango grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6, amount: '100g' },
    { name: 'Filé de tilápia grelhado', calories: 96, protein: 20, carbs: 0, fat: 1.7, amount: '100g' },
    { name: 'Ovos inteiros', calories: 155, protein: 13, carbs: 1.1, fat: 11, amount: '100g' },
    { name: 'Clara de ovo', calories: 17, protein: 3.6, carbs: 0.2, fat: 0.06, amount: '30g' },
    { name: 'Carne bovina magra', calories: 158, protein: 26, carbs: 0, fat: 5.4, amount: '100g' },
    { name: 'Salmão grelhado', calories: 208, protein: 25, carbs: 0, fat: 12, amount: '100g' },
    { name: 'Whey Protein', calories: 103, protein: 24, carbs: 1, fat: 0.5, amount: '30g' }
  ],
  fruits: [
    { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, amount: '100g' },
    { name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, amount: '100g' },
    { name: 'Morango', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, amount: '100g' },
    { name: 'Abacate', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, amount: '100g' },
    { name: 'Mamão', calories: 43, protein: 0.5, carbs: 11, fat: 0.3, amount: '100g' },
    { name: 'Uva', calories: 62, protein: 0.6, carbs: 16, fat: 0.2, amount: '100g' }
  ],
  vegetables: [
    { name: 'Brócolis cozido', calories: 25, protein: 3, carbs: 5, fat: 0.4, amount: '100g' },
    { name: 'Couve refogada', calories: 28, protein: 2.9, carbs: 5.4, fat: 0.4, amount: '100g' },
    { name: 'Cenoura cozida', calories: 35, protein: 0.8, carbs: 8, fat: 0.2, amount: '100g' },
    { name: 'Abobrinha refogada', calories: 20, protein: 1.2, carbs: 4.3, fat: 0.1, amount: '100g' },
    { name: 'Espinafre refogado', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, amount: '100g' },
    { name: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, amount: '100g' }
  ],
  fats: [
    { name: 'Azeite extra virgem', calories: 884, protein: 0, carbs: 0, fat: 100, amount: '10g' },
    { name: 'Castanha do Pará', calories: 656, protein: 14, carbs: 12, fat: 67, amount: '30g' },
    { name: 'Amendoim', calories: 567, protein: 26, carbs: 16, fat: 49, amount: '30g' },
    { name: 'Abacate', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, amount: '100g' }
  ]
};

export function calculateBMR(userData: UserData): number {
  const { weight, height, age, gender } = userData;
  
  if (gender === 'masculino') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    muito_intenso: 1.9
  };
  
  return bmr * multipliers[activityLevel as keyof typeof multipliers];
}

export function calculateCalorieGoal(tdee: number, goal: string): number {
  switch (goal) {
    case 'emagrecimento':
      return Math.round(tdee * 0.8); // Déficit de 20%
    case 'ganho_massa':
      return Math.round(tdee * 1.1); // Superávit de 10%
    case 'manutencao':
      return Math.round(tdee);
    default:
      return Math.round(tdee);
  }
}

export function calculateMacros(calories: number, goal: string) {
  let proteinRatio, carbRatio, fatRatio;
  
  switch (goal) {
    case 'emagrecimento':
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
      break;
    case 'ganho_massa':
      proteinRatio = 0.30;
      carbRatio = 0.45;
      fatRatio = 0.25;
      break;
    case 'manutencao':
      proteinRatio = 0.25;
      carbRatio = 0.50;
      fatRatio = 0.25;
      break;
    default:
      proteinRatio = 0.25;
      carbRatio = 0.50;
      fatRatio = 0.25;
  }
  
  return {
    protein: Math.round((calories * proteinRatio) / 4),
    carbs: Math.round((calories * carbRatio) / 4),
    fat: Math.round((calories * fatRatio) / 9)
  };
}

function selectFoodsByPreference(category: string, preferences: string[], count: number = 2): Food[] {
  const categoryFoods = FOODS_DATABASE[category as keyof typeof FOODS_DATABASE] || [];
  const selected: Food[] = [];
  
  // Primeiro, tenta usar alimentos preferidos
  for (const pref of preferences) {
    const found = categoryFoods.find(food => 
      food.name.toLowerCase().includes(pref.toLowerCase())
    );
    if (found && selected.length < count) {
      selected.push({
        ...found,
        alternatives: categoryFoods
          .filter(f => f.name !== found.name)
          .slice(0, 3)
          .map(f => `${f.amount} de ${f.name}`)
      });
    }
  }
  
  // Completa com alimentos aleatórios se necessário
  while (selected.length < count) {
    const remaining = categoryFoods.filter(food => 
      !selected.some(s => s.name === food.name)
    );
    if (remaining.length > 0) {
      const randomFood = remaining[Math.floor(Math.random() * remaining.length)];
      selected.push({
        ...randomFood,
        alternatives: categoryFoods
          .filter(f => f.name !== randomFood.name)
          .slice(0, 3)
          .map(f => `${f.amount} de ${f.name}`)
      });
    } else {
      break;
    }
  }
  
  return selected;
}

export function generateMealPlan(userData: UserData, calories: number, macros: any): Meal[] {
  const meals: Meal[] = [];
  
  // Café da manhã (25% das calorias)
  const breakfastCalories = Math.round(calories * 0.25);
  const breakfastCarbs = selectFoodsByPreference('carbs', userData.preferredCarbs, 1);
  const breakfastProteins = selectFoodsByPreference('proteins', userData.preferredProteins, 1);
  const breakfastFruits = selectFoodsByPreference('fruits', userData.preferredFruits, 1);
  
  meals.push({
    name: 'Café da Manhã',
    time: userData.breakfastTime,
    foods: [...breakfastCarbs, ...breakfastProteins, ...breakfastFruits],
    calories: breakfastCalories,
    protein: Math.round(macros.protein * 0.25),
    carbs: Math.round(macros.carbs * 0.30),
    fat: Math.round(macros.fat * 0.20)
  });
  
  // Lanche da manhã (10% das calorias)
  const morningSnackCalories = Math.round(calories * 0.10);
  const morningSnackFruits = selectFoodsByPreference('fruits', userData.preferredFruits, 1);
  
  meals.push({
    name: 'Lanche da Manhã',
    time: '10:00',
    foods: morningSnackFruits,
    calories: morningSnackCalories,
    protein: Math.round(macros.protein * 0.10),
    carbs: Math.round(macros.carbs * 0.15),
    fat: Math.round(macros.fat * 0.05)
  });
  
  // Almoço (35% das calorias)
  const lunchCalories = Math.round(calories * 0.35);
  const lunchCarbs = selectFoodsByPreference('carbs', userData.preferredCarbs, 1);
  const lunchProteins = selectFoodsByPreference('proteins', userData.preferredProteins, 1);
  const lunchVegetables = selectFoodsByPreference('vegetables', userData.preferredVegetables, 2);
  
  meals.push({
    name: 'Almoço',
    time: userData.lunchTime,
    foods: [...lunchCarbs, ...lunchProteins, ...lunchVegetables],
    calories: lunchCalories,
    protein: Math.round(macros.protein * 0.35),
    carbs: Math.round(macros.carbs * 0.35),
    fat: Math.round(macros.fat * 0.35)
  });
  
  // Lanche da tarde (10% das calorias)
  const afternoonSnackCalories = Math.round(calories * 0.10);
  const afternoonSnackProteins = selectFoodsByPreference('proteins', userData.preferredProteins, 1);
  
  meals.push({
    name: 'Lanche da Tarde',
    time: userData.snackTime,
    foods: afternoonSnackProteins,
    calories: afternoonSnackCalories,
    protein: Math.round(macros.protein * 0.15),
    carbs: Math.round(macros.carbs * 0.10),
    fat: Math.round(macros.fat * 0.15)
  });
  
  // Jantar (20% das calorias)
  const dinnerCalories = Math.round(calories * 0.20);
  const dinnerProteins = selectFoodsByPreference('proteins', userData.preferredProteins, 1);
  const dinnerVegetables = selectFoodsByPreference('vegetables', userData.preferredVegetables, 2);
  
  meals.push({
    name: 'Jantar',
    time: userData.dinnerTime,
    foods: [...dinnerProteins, ...dinnerVegetables],
    calories: dinnerCalories,
    protein: Math.round(macros.protein * 0.15),
    carbs: Math.round(macros.carbs * 0.10),
    fat: Math.round(macros.fat * 0.25)
  });
  
  return meals;
}

export function generateSupplements(userData: UserData): Supplement[] {
  const supplements: Supplement[] = [];
  
  // Sempre incluir Whey Protein se não estiver usando
  if (!userData.currentSupplements.some(s => s.toLowerCase().includes('whey'))) {
    supplements.push({
      name: 'Whey Protein',
      dosage: '30g',
      timing: 'Pós-treino ou entre refeições',
      benefits: 'Auxilia na recuperação muscular e síntese proteica'
    });
  }
  
  // Sempre incluir Creatina se não estiver usando
  if (!userData.currentSupplements.some(s => s.toLowerCase().includes('creatina'))) {
    supplements.push({
      name: 'Creatina Monohidratada',
      dosage: '3-5g',
      timing: 'Qualquer horário do dia',
      benefits: 'Melhora força, potência e recuperação muscular'
    });
  }
  
  // Suplementos baseados no objetivo
  if (userData.goal === 'emagrecimento') {
    supplements.push({
      name: 'L-Carnitina',
      dosage: '2g',
      timing: '30 minutos antes do treino',
      benefits: 'Auxilia na oxidação de gorduras durante o exercício'
    });
  }
  
  if (userData.goal === 'ganho_massa') {
    supplements.push({
      name: 'Hipercalórico',
      dosage: '1 dose',
      timing: 'Entre refeições ou pós-treino',
      benefits: 'Fornece calorias extras para ganho de massa'
    });
  }
  
  // Multivitamínico sempre recomendado
  supplements.push({
    name: 'Multivitamínico',
    dosage: '1 cápsula',
    timing: 'Pela manhã com o café da manhã',
    benefits: 'Garante aporte adequado de vitaminas e minerais'
  });
  
  return supplements;
}

export function generateNutritionPlan(userData: UserData): NutritionPlan {
  const bmr = calculateBMR(userData);
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  const calories = calculateCalorieGoal(tdee, userData.goal);
  const macros = calculateMacros(calories, userData.goal);
  
  const meals = generateMealPlan(userData, calories, macros);
  const supplements = generateSupplements(userData);
  
  const tips = [
    '💧 Beba pelo menos 2-3 litros de água por dia',
    '⏰ Mantenha horários regulares para as refeições',
    '🥗 Varie os alimentos para garantir todos os nutrientes',
    '🏃‍♂️ Combine a dieta com exercícios regulares',
    '😴 Durma de 7-9 horas por noite para melhor recuperação',
    '📱 Use um aplicativo para acompanhar seu progresso'
  ];
  
  return {
    calories,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    meals,
    supplements,
    tips
  };
}