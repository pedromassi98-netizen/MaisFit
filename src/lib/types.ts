export interface UserData {
  // Dados pessoais
  name: string;
  email: string;
  whatsapp: string;
  age: number;
  gender: 'masculino' | 'feminino';
  weight: number;
  height: number;
  
  // Objetivo
  goal: 'emagrecimento' | 'ganho_massa' | 'manutencao';
  
  // Atividade física
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
  physicalActivity: string;
  cardio: boolean;
  cardioFrequency: number;
  workoutTime: string;
  
  // Preferências alimentares
  preferredCarbs: string[];
  preferredProteins: string[];
  preferredFruits: string[];
  preferredVegetables: string[];
  restrictions: string[];
  
  // Rotina
  wakeUpTime: string;
  breakfastTime: string;
  lunchTime: string;
  snackTime: string;
  dinnerTime: string;
  
  // Suplementos
  currentSupplements: string[];
  interestedSupplements: string[];
  supplementGoals: string[];
  
  // Orçamento
  budget: 'baixo' | 'medio' | 'alto';
}

export interface NutritionPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
  supplements: Supplement[];
  tips: string[];
}

export interface Meal {
  name: string;
  time: string;
  foods: Food[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Food {
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  alternatives?: string[];
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  benefits: string;
}