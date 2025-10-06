export interface UserData {
  // Dados pessoais
  name: string;
  age: number;
  gender: 'masculino' | 'feminino';
  weight: number; // kg
  height: number; // cm
  
  // Objetivo
  goal: 'emagrecimento' | 'ganho_massa' | 'manutencao';
  
  // Atividade física detalhada
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
  workoutTime: 'manha' | 'tarde' | 'noite' | 'nao_treina';
  activityType: 'musculacao' | 'crossfit' | 'esporte' | 'nenhuma';
  cardio: boolean;
  cardioFrequency: number; // vezes por semana
  
  // Preferências alimentares detalhadas
  dietaryRestrictions: string[];
  customRestrictions: string; // campo de busca personalizado
  
  // Alimentos preferidos por categoria
  preferredCarbs: string[];
  preferredProteins: string[];
  preferredFruits: string[];
  preferredVegetables: string[];
  customFoodPreferences: string; // campo de busca personalizado
  
  // Suplementos
  currentSupplements: string[]; // suplementos que já usa
  interestedSupplements: string[]; // suplementos que tem interesse
  supplementGoals: string[]; // objetivos com suplementos
  
  // Rotina diária
  wakeUpTime: string;
  breakfastTime: string;
  lunchTime: string;
  snackTime: string;
  dinnerTime: string;
  sleepTime: string;
  
  // Orçamento
  budget: 'baixo' | 'medio' | 'alto';
  
  // Pagamento
  hasPaid: boolean;
}

export interface NutritionalGoals {
  calories: number;
  protein: number; // gramas
  carbs: number; // gramas
  fat: number; // gramas
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
}

export interface Meal {
  name: string;
  time: string;
  foods: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  alternatives?: string[];
}

export interface MealPlan {
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  supplements?: string[];
  tips: string[];
}