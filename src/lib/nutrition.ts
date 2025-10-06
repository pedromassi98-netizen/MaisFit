import { UserData, NutritionalGoals, MealPlan, Meal, FoodItem } from './types';

// Cálculo da Taxa Metabólica Basal (TMB) usando fórmula de Mifflin-St Jeor
export function calculateBMR(userData: UserData): number {
  const { weight, height, age, gender } = userData;
  
  if (gender === 'masculino') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Fatores de atividade física ajustados para incluir cardio
const activityFactors = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9
};

// Cálculo do gasto energético total diário
export function calculateTDEE(userData: UserData): number {
  const bmr = calculateBMR(userData);
  let tdee = bmr * activityFactors[userData.activityLevel];
  
  // Ajuste adicional para cardio
  if (userData.cardio && userData.cardioFrequency > 0) {
    const cardioBonus = userData.cardioFrequency * 0.05; // 5% adicional por sessão de cardio
    tdee *= (1 + cardioBonus);
  }
  
  return tdee;
}

// Cálculo das metas calóricas baseadas no objetivo
export function calculateNutritionalGoals(userData: UserData): NutritionalGoals {
  const tdee = calculateTDEE(userData);
  let calories: number;
  let proteinPercentage: number;
  let carbsPercentage: number;
  let fatPercentage: number;

  switch (userData.goal) {
    case 'emagrecimento':
      calories = tdee - 500; // Déficit de 500 calorias
      proteinPercentage = 35; // Mais proteína para preservar massa muscular
      carbsPercentage = 35;
      fatPercentage = 30;
      break;
    case 'ganho_massa':
      calories = tdee + 300; // Superávit de 300 calorias
      proteinPercentage = 25;
      carbsPercentage = 45;
      fatPercentage = 30;
      break;
    case 'manutencao':
    default:
      calories = tdee;
      proteinPercentage = 25;
      carbsPercentage = 45;
      fatPercentage = 30;
      break;
  }

  const protein = (calories * proteinPercentage / 100) / 4; // 4 cal/g
  const carbs = (calories * carbsPercentage / 100) / 4; // 4 cal/g
  const fat = (calories * fatPercentage / 100) / 9; // 9 cal/g

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    proteinPercentage,
    carbsPercentage,
    fatPercentage
  };
}

// Base de dados expandida de alimentos brasileiros (SEM alimentos proibidos)
const foodDatabase: Record<string, FoodItem> = {
  // Proteínas (quantidades exatas em gramas)
  'peito_frango': {
    name: 'Peito de Frango Grelhado',
    quantity: '120g',
    calories: 198,
    protein: 37,
    carbs: 0,
    fat: 4,
    alternatives: ['150g de Filé de Peixe', '130g de Coxão Mole', '140g de Peito de Peru']
  },
  'ovo': {
    name: 'Ovos Mexidos',
    quantity: '2 unidades (100g)',
    calories: 140,
    protein: 12,
    carbs: 1,
    fat: 10,
    alternatives: ['3 claras (90g)', '1 omelete (100g)', '2 ovos cozidos (100g)']
  },
  'peixe': {
    name: 'Filé de Tilápia Grelhado',
    quantity: '150g',
    calories: 180,
    protein: 38,
    carbs: 0,
    fat: 3,
    alternatives: ['140g de Salmão', '160g de Merluza', '150g de Sardinha']
  },
  'queijo_cottage': {
    name: 'Queijo Cottage',
    quantity: '100g',
    calories: 98,
    protein: 11,
    carbs: 3,
    fat: 4,
    alternatives: ['120g de Ricota', '100g de Queijo Minas', '150g de Iogurte Grego']
  },
  
  // Carboidratos (quantidades exatas em gramas)
  'arroz_integral': {
    name: 'Arroz Integral Cozido',
    quantity: '80g',
    calories: 98,
    protein: 2,
    carbs: 20,
    fat: 1,
    alternatives: ['70g de Quinoa Cozida', '90g de Arroz Branco', '75g de Arroz Selvagem']
  },
  'batata_doce': {
    name: 'Batata Doce Assada',
    quantity: '120g',
    calories: 103,
    protein: 2,
    carbs: 24,
    fat: 0,
    alternatives: ['130g de Mandioca', '110g de Inhame', '140g de Abóbora']
  },
  'aveia': {
    name: 'Aveia em Flocos',
    quantity: '40g',
    calories: 156,
    protein: 5,
    carbs: 28,
    fat: 3,
    alternatives: ['35g de Granola Integral', '45g de Quinoa em Flocos', '40g de Farelo de Aveia']
  },
  'pao_integral': {
    name: 'Pão Integral',
    quantity: '50g (2 fatias)',
    calories: 138,
    protein: 6,
    carbs: 26,
    fat: 2,
    alternatives: ['45g de Pão de Centeio', '60g de Tapioca', '40g de Biscoito Integral']
  },
  
  // Gorduras boas (quantidades exatas em gramas)
  'abacate': {
    name: 'Abacate',
    quantity: '60g',
    calories: 96,
    protein: 1,
    carbs: 5,
    fat: 8,
    alternatives: ['10g de Azeite Extra Virgem', '20g de Castanhas', '30g de Coco Ralado']
  },
  'castanhas': {
    name: 'Mix de Castanhas',
    quantity: '20g',
    calories: 130,
    protein: 3,
    carbs: 3,
    fat: 12,
    alternatives: ['25g de Amêndoas', '20g de Nozes', '25g de Amendoim']
  },
  'azeite': {
    name: 'Azeite Extra Virgem',
    quantity: '10g (1 colher de sopa)',
    calories: 90,
    protein: 0,
    carbs: 0,
    fat: 10,
    alternatives: ['12g de Óleo de Abacate', '15g de Tahine']
  },
  
  // Vegetais (quantidades exatas em gramas)
  'broccolis': {
    name: 'Brócolis Refogado',
    quantity: '150g',
    calories: 38,
    protein: 5,
    carbs: 8,
    fat: 0,
    alternatives: ['140g de Couve-flor', '160g de Espinafre', '150g de Couve']
  },
  'salada_verde': {
    name: 'Salada Verde Mista',
    quantity: '100g',
    calories: 15,
    protein: 2,
    carbs: 3,
    fat: 0,
    alternatives: ['120g de Rúcula', '100g de Agrião', '110g de Espinafre Cru']
  },
  'cenoura': {
    name: 'Cenoura Refogada',
    quantity: '80g',
    calories: 28,
    protein: 1,
    carbs: 6,
    fat: 0,
    alternatives: ['90g de Beterraba', '100g de Abobrinha', '85g de Vagem']
  },
  
  // Frutas (quantidades exatas em gramas)
  'banana': {
    name: 'Banana Prata',
    quantity: '80g (1 unidade média)',
    calories: 71,
    protein: 1,
    carbs: 18,
    fat: 0,
    alternatives: ['120g de Maçã', '100g de Pera', '150g de Mamão']
  },
  'maca': {
    name: 'Maçã Fuji',
    quantity: '120g (1 unidade média)',
    calories: 62,
    protein: 0,
    carbs: 17,
    fat: 0,
    alternatives: ['110g de Pera', '130g de Laranja', '90g de Kiwi']
  },
  'morango': {
    name: 'Morangos',
    quantity: '100g',
    calories: 32,
    protein: 1,
    carbs: 8,
    fat: 0,
    alternatives: ['80g de Framboesa', '90g de Mirtilo', '100g de Amora']
  },
  'mamao': {
    name: 'Mamão Papaya',
    quantity: '150g',
    calories: 61,
    protein: 1,
    carbs: 15,
    fat: 0,
    alternatives: ['140g de Melão', '120g de Manga', '130g de Abacaxi']
  },

  // Lanches saudáveis (quantidades exatas em gramas)
  'iogurte_grego': {
    name: 'Iogurte Grego Natural',
    quantity: '150g',
    calories: 130,
    protein: 15,
    carbs: 9,
    fat: 4,
    alternatives: ['180g de Iogurte Desnatado', '160g de Kefir', '150g de Leite Fermentado']
  },
  'whey_protein': {
    name: 'Whey Protein',
    quantity: '30g (1 scoop)',
    calories: 120,
    protein: 24,
    carbs: 2,
    fat: 1,
    alternatives: ['35g de Proteína Vegetal', '40g de Albumina', '30g de Caseína']
  },
  'creatina': {
    name: 'Creatina Monohidratada',
    quantity: '3g',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    alternatives: ['5g de Creatina HCL', '3g de Creatina Alcalina']
  }
};

// Geração do plano alimentar personalizado
export function generateMealPlan(userData: UserData, goals: NutritionalGoals): MealPlan {
  const meals: Meal[] = [];
  
  // Distribuição calórica baseada nos horários do usuário
  const calorieDistribution = {
    'Café da Manhã': 0.25,
    'Lanche da Manhã': 0.10,
    'Almoço': 0.35,
    'Lanche da Tarde': 0.15,
    'Jantar': 0.15
  };

  // Usar horários personalizados do usuário
  const mealTimes = {
    'Café da Manhã': userData.breakfastTime || '07:00',
    'Lanche da Manhã': '10:00',
    'Almoço': userData.lunchTime || '12:30',
    'Lanche da Tarde': userData.snackTime || '15:30',
    'Jantar': userData.dinnerTime || '19:00'
  };

  Object.entries(calorieDistribution).forEach(([mealName, percentage]) => {
    const targetCalories = goals.calories * percentage;
    const meal = generateMeal(mealName, targetCalories, userData, goals, mealTimes[mealName as keyof typeof mealTimes]);
    meals.push(meal);
  });

  const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.totalProtein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.totalCarbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.totalFat, 0);

  const supplements = generateSupplements(userData, goals);
  const tips = generateTips(userData);

  return {
    meals,
    totalCalories: Math.round(totalCalories),
    totalProtein: Math.round(totalProtein),
    totalCarbs: Math.round(totalCarbs),
    totalFat: Math.round(totalFat),
    supplements,
    tips
  };
}

function generateMeal(mealName: string, targetCalories: number, userData: UserData, goals: NutritionalGoals, mealTime: string): Meal {
  const foods: FoodItem[] = [];
  let currentCalories = 0;
  let currentProtein = 0;
  let currentCarbs = 0;
  let currentFat = 0;

  // Seleção de alimentos baseada nas preferências do usuário
  const mealFoods = getMealFoods(mealName, userData);
  
  mealFoods.forEach(foodKey => {
    const food = { ...foodDatabase[foodKey] };
    const multiplier = Math.min(2.5, targetCalories / food.calories / mealFoods.length);
    
    food.calories = Math.round(food.calories * multiplier);
    food.protein = Math.round(food.protein * multiplier * 10) / 10;
    food.carbs = Math.round(food.carbs * multiplier * 10) / 10;
    food.fat = Math.round(food.fat * multiplier * 10) / 10;
    food.quantity = adjustQuantity(food.quantity, multiplier);
    
    foods.push(food);
    currentCalories += food.calories;
    currentProtein += food.protein;
    currentCarbs += food.carbs;
    currentFat += food.fat;
  });

  return {
    name: mealName,
    time: mealTime,
    foods,
    totalCalories: Math.round(currentCalories),
    totalProtein: Math.round(currentProtein * 10) / 10,
    totalCarbs: Math.round(currentCarbs * 10) / 10,
    totalFat: Math.round(currentFat * 10) / 10
  };
}

function getMealFoods(mealName: string, userData: UserData): string[] {
  const restrictions = userData.dietaryRestrictions;
  const isVegetarian = restrictions.includes('Vegetariano') || restrictions.includes('Vegano');
  
  switch (mealName) {
    case 'Café da Manhã':
      if (userData.goal === 'ganho_massa') {
        return isVegetarian ? ['aveia', 'banana', 'castanhas', 'iogurte_grego'] : ['ovo', 'aveia', 'banana', 'castanhas'];
      }
      return isVegetarian ? ['aveia', 'morango', 'castanhas'] : ['ovo', 'pao_integral', 'abacate'];
      
    case 'Lanche da Manhã':
      return userData.goal === 'emagrecimento' ? ['maca'] : ['banana', 'castanhas'];
      
    case 'Almoço':
      if (isVegetarian) {
        return ['arroz_integral', 'queijo_cottage', 'broccolis', 'salada_verde', 'azeite'];
      }
      return ['peito_frango', 'arroz_integral', 'broccolis', 'salada_verde', 'azeite'];
      
    case 'Lanche da Tarde':
      if (userData.goal === 'ganho_massa') {
        return ['whey_protein', 'banana'];
      }
      return ['iogurte_grego', 'morango'];
      
    case 'Jantar':
      if (isVegetarian) {
        return ['batata_doce', 'queijo_cottage', 'cenoura', 'salada_verde'];
      }
      return ['peixe', 'batata_doce', 'cenoura', 'salada_verde'];
      
    default:
      return ['peito_frango', 'arroz_integral'];
  }
}

function adjustQuantity(quantity: string, multiplier: number): string {
  // Extrair número da quantidade
  const match = quantity.match(/(\d+)g/);
  if (match) {
    const originalGrams = parseInt(match[1]);
    const newGrams = Math.round(originalGrams * multiplier);
    return quantity.replace(/\d+g/, `${newGrams}g`);
  }
  
  if (quantity.includes('unidade')) {
    const units = Math.max(1, Math.round(multiplier));
    const match = quantity.match(/(\d+)g/);
    if (match) {
      const originalGrams = parseInt(match[1]);
      const newGrams = Math.round(originalGrams * multiplier);
      return quantity.replace(/\d+g/, `${newGrams}g`);
    }
    return units === 1 ? quantity : `${units} unidades`;
  }
  
  if (quantity.includes('colher')) {
    const match = quantity.match(/(\d+)g/);
    if (match) {
      const originalGrams = parseInt(match[1]);
      const newGrams = Math.round(originalGrams * multiplier);
      return `${newGrams}g (${Math.round(multiplier)} colher${Math.round(multiplier) > 1 ? 'es' : ''} de sopa)`;
    }
  }
  
  if (quantity.includes('scoop')) {
    const match = quantity.match(/(\d+)g/);
    if (match) {
      const originalGrams = parseInt(match[1]);
      const newGrams = Math.round(originalGrams * multiplier);
      return `${newGrams}g (${Math.round(multiplier)} scoop${Math.round(multiplier) > 1 ? 's' : ''})`;
    }
  }
  
  return quantity;
}

function generateSupplements(userData: UserData, goals: NutritionalGoals): string[] {
  const supplements: string[] = [];
  
  // SEMPRE incluir Whey Protein e Creatina quando apropriado
  if (userData.goal === 'ganho_massa' || userData.activityLevel === 'intenso' || userData.activityLevel === 'muito_intenso') {
    if (!userData.currentSupplements?.includes('Whey Protein')) {
      supplements.push('💪 Whey Protein - 30g após o treino (essencial para ganho de massa)');
    }
    if (!userData.currentSupplements?.includes('Creatina')) {
      supplements.push('⚡ Creatina Monohidratada - 3g diariamente (melhora força e performance)');
    }
  }
  
  if (userData.goal === 'emagrecimento') {
    if (!userData.currentSupplements?.includes('Whey Protein')) {
      supplements.push('🔥 Whey Protein - 25g entre as refeições (preserva massa muscular)');
    }
    supplements.push('🌿 Multivitamínico - 1 cápsula pela manhã');
    supplements.push('🐟 Ômega 3 - 1g após o almoço');
    
    if (userData.cardio && userData.cardioFrequency >= 4) {
      supplements.push('🏃 L-Carnitina - 2g, 30min antes do cardio');
    }
  }
  
  if (userData.goal === 'manutencao') {
    if (userData.activityType === 'musculacao' || userData.activityType === 'crossfit') {
      if (!userData.currentSupplements?.includes('Whey Protein')) {
        supplements.push('💪 Whey Protein - 25g após o treino');
      }
      if (!userData.currentSupplements?.includes('Creatina')) {
        supplements.push('⚡ Creatina - 3g diariamente');
      }
    }
  }
  
  // Suplementos baseados em atividade intensa
  if (userData.activityLevel === 'intenso' || userData.activityLevel === 'muito_intenso') {
    supplements.push('💤 ZMA (Zinco + Magnésio) - antes de dormir');
    if (userData.activityType === 'crossfit') {
      supplements.push('⚡ BCAA - durante o treino');
    }
  }
  
  // Suplementos baseados em restrições alimentares
  if (userData.dietaryRestrictions?.includes('Vegetariano') || userData.dietaryRestrictions?.includes('Vegano')) {
    supplements.push('🌱 Vitamina B12 - essencial para vegetarianos');
    supplements.push('🩸 Ferro - consulte um médico antes');
    if (!userData.currentSupplements?.includes('Whey Protein')) {
      supplements.push('🌿 Proteína Vegetal - 30g após o treino');
    }
  }
  
  // Adicionar suplementos que o usuário já usa
  if (userData.currentSupplements && userData.currentSupplements.length > 0) {
    userData.currentSupplements.forEach(supplement => {
      if (!supplements.some(s => s.includes(supplement))) {
        supplements.push(`✅ ${supplement} - continue usando conforme orientação`);
      }
    });
  }
  
  return supplements;
}

function generateTips(userData: UserData): string[] {
  const tips: string[] = [
    '💧 Beba pelo menos 35ml de água por kg de peso corporal diariamente',
    '⏰ Faça as refeições nos horários estabelecidos para manter o metabolismo ativo',
    '🍽️ Mastigue bem os alimentos - isso melhora a digestão e aumenta a saciedade',
    '📋 Prepare as refeições com antecedência para não sair da dieta'
  ];
  
  if (userData.goal === 'emagrecimento') {
    tips.push('🥗 Comece sempre as refeições principais pelos vegetais - isso aumenta a saciedade');
    tips.push('🚫 Evite líquidos durante as refeições para não prejudicar a digestão');
    tips.push('📝 Faça um diário alimentar para acompanhar seu progresso');
  }
  
  if (userData.goal === 'ganho_massa') {
    tips.push('💪 Nunca pule o pós-treino - é o momento mais importante para o crescimento muscular');
    tips.push('🍞 Inclua uma fonte de carboidrato em todas as refeições para manter a energia');
    tips.push('😴 Durma pelo menos 7-8 horas por noite - é quando o músculo cresce');
  }
  
  if (userData.workoutTime !== 'nao_treina') {
    tips.push('🏋️ Faça uma refeição rica em proteína até 2 horas após o treino');
    tips.push('⚡ Consuma carboidratos 30-60 minutos antes do treino para ter energia');
  }
  
  if (userData.cardio && userData.cardioFrequency > 0) {
    tips.push('🏃 Faça o cardio preferencialmente em jejum ou após o treino de força');
    tips.push('📊 Mantenha a intensidade moderada para preservar a massa muscular');
  }
  
  // Dicas baseadas na rotina
  if (userData.wakeUpTime && userData.wakeUpTime < '07:00') {
    tips.push('🌅 Como você acorda cedo, tome café da manhã até 1 hora após acordar');
  }
  
  if (userData.workoutTime === 'manha') {
    tips.push('🌄 Treine em jejum ou com um lanche leve 30min antes (banana + café)');
  }
  
  // Dicas sobre suplementos
  if (userData.currentSupplements && userData.currentSupplements.length > 0) {
    tips.push('💊 Continue tomando seus suplementos atuais conforme a orientação médica');
  }
  
  return tips;
}