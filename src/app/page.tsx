'use client';

import { useState } from 'react';
import { UserData, NutritionalGoals, MealPlan } from '@/lib/types';
import { calculateNutritionalGoals, generateMealPlan } from '@/lib/nutrition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Target, 
  Activity, 
  Clock, 
  Heart, 
  CreditCard, 
  Calculator, 
  Utensils, 
  Apple,
  ChefHat,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  Star,
  Trophy,
  Shield,
  Dumbbell,
  Timer,
  Sparkles,
  Pill
} from 'lucide-react';

export default function MaisFitApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<Partial<UserData>>({
    dietaryRestrictions: [],
    preferredCarbs: [],
    preferredProteins: [],
    preferredFruits: [],
    preferredVegetables: [],
    currentSupplements: [],
    interestedSupplements: [],
    supplementGoals: [],
    customRestrictions: '',
    customFoodPreferences: '',
    cardio: false,
    cardioFrequency: 0,
    hasPaid: false
  });
  const [nutritionalGoals, setNutritionalGoals] = useState<NutritionalGoals | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const totalSteps = 9; // Aumentado para incluir aba de suplementos

  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof UserData, value: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      [field]: checked 
        ? [...((prev[field] as string[]) || []), value]
        : ((prev[field] as string[]) || []).filter(item => item !== value)
    }));
  };

  const generatePlan = async () => {
    if (!userData.hasPaid) {
      setShowPayment(true);
      return;
    }
    
    if (!isFormValid()) return;
    
    setIsGenerating(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const completeUserData = userData as UserData;
    const goals = calculateNutritionalGoals(completeUserData);
    const plan = generateMealPlan(completeUserData, goals);
    
    setNutritionalGoals(goals);
    setMealPlan(plan);
    setCurrentStep(10);
    setIsGenerating(false);
  };

  const handlePayment = () => {
    // Simular pagamento
    setUserData(prev => ({ ...prev, hasPaid: true }));
    setShowPayment(false);
    generatePlan();
  };

  const isFormValid = () => {
    return userData.name && userData.age && userData.gender && userData.weight && 
           userData.height && userData.goal && userData.activityLevel && 
           userData.workoutTime && userData.budget && userData.wakeUpTime &&
           userData.breakfastTime && userData.lunchTime && userData.dinnerTime;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setUserData({ 
      dietaryRestrictions: [], 
      preferredCarbs: [],
      preferredProteins: [],
      preferredFruits: [],
      preferredVegetables: [],
      currentSupplements: [],
      interestedSupplements: [],
      supplementGoals: [],
      customRestrictions: '',
      customFoodPreferences: '',
      cardio: false,
      cardioFrequency: 0,
      hasPaid: false
    });
    setNutritionalGoals(null);
    setMealPlan(null);
  };

  // Modal de Pagamento
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">🔥 Transforme Seu Corpo HOJE!</h2>
            <p className="text-gray-600 mb-6">
              Sua dieta personalizada está pronta! Milhares de brasileiros já transformaram suas vidas.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
              <div className="text-3xl font-bold text-green-600 mb-1">R$ 19,99</div>
              <div className="text-sm text-gray-600">Pagamento único • Sem mensalidades</div>
            </div>

            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Plano alimentar 100% personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Cálculos nutricionais precisos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Lista de compras incluída</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Sugestões de substituições</span>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 text-lg mb-4"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Garantir Minha Dieta - R$ 19,99
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              Pagamento 100% seguro
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowPayment(false)}
              className="mt-4 text-gray-500"
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold mb-2">🔥 Criando Sua Dieta Personalizada</h3>
            <p className="text-gray-600 mb-4">Analisando seus dados e calculando suas necessidades...</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>✓ Calculando metabolismo basal</div>
              <div>✓ Definindo macronutrientes</div>
              <div>✓ Selecionando alimentos ideais</div>
              <div>✓ Montando cardápio personalizado</div>
            </div>
            <Progress value={85} className="w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 10 && mealPlan && nutritionalGoals) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mais Fit - Sua Dieta Personalizada
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Parabéns <span className="font-semibold text-purple-600">{userData.name}</span>! Sua transformação começa agora 🚀
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
              <TabsTrigger value="overview">Resumo</TabsTrigger>
              <TabsTrigger value="meals">Cardápio</TabsTrigger>
              <TabsTrigger value="supplements">Suplementos</TabsTrigger>
              <TabsTrigger value="tips" className="hidden lg:block">Dicas</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{nutritionalGoals.calories}</div>
                    <div className="text-sm text-gray-600">Calorias/dia</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">P</div>
                    <div className="text-2xl font-bold text-gray-900">{nutritionalGoals.protein}g</div>
                    <div className="text-sm text-gray-600">Proteínas</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">C</div>
                    <div className="text-2xl font-bold text-gray-900">{nutritionalGoals.carbs}g</div>
                    <div className="text-sm text-gray-600">Carboidratos</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">G</div>
                    <div className="text-2xl font-bold text-gray-900">{nutritionalGoals.fat}g</div>
                    <div className="text-sm text-gray-600">Gorduras</div>
                  </CardContent>
                </Card>
              </div>

              {/* Macronutrient Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-500" />
                    Distribuição de Macronutrientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Proteínas</span>
                      <span className="text-sm text-gray-600">{nutritionalGoals.proteinPercentage}%</span>
                    </div>
                    <Progress value={nutritionalGoals.proteinPercentage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Carboidratos</span>
                      <span className="text-sm text-gray-600">{nutritionalGoals.carbsPercentage}%</span>
                    </div>
                    <Progress value={nutritionalGoals.carbsPercentage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Gorduras</span>
                      <span className="text-sm text-gray-600">{nutritionalGoals.fatPercentage}%</span>
                    </div>
                    <Progress value={nutritionalGoals.fatPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meals Tab */}
            <TabsContent value="meals" className="space-y-6">
              <div className="grid gap-6">
                {mealPlan.meals.map((meal, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-purple-500" />
                          <CardTitle className="text-lg">{meal.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {meal.time}
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{meal.totalCalories} cal</span>
                        <span>{meal.totalProtein}g prot</span>
                        <span>{meal.totalCarbs}g carb</span>
                        <span>{meal.totalFat}g gord</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {meal.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="flex justify-between items-start p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{food.name}</div>
                              <div className="text-sm text-gray-600 font-semibold">{food.quantity}</div>
                              {food.alternatives && (
                                <div className="text-xs text-gray-500 mt-1">
                                  <strong>Alternativas:</strong> {food.alternatives.join(', ')}
                                </div>
                              )}
                            </div>
                            <div className="text-right text-sm">
                              <div className="font-medium">{food.calories} cal</div>
                              <div className="text-gray-600">
                                {food.protein}p | {food.carbs}c | {food.fat}g
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Supplements Tab */}
            <TabsContent value="supplements" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-purple-500" />
                    Suplementos Recomendados
                  </CardTitle>
                  <CardDescription>
                    Baseado no seu objetivo, atividade física e preferências
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mealPlan.supplements && mealPlan.supplements.length > 0 ? (
                    <div className="space-y-4">
                      {mealPlan.supplements.map((supplement, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{supplement}</span>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas Importantes sobre Suplementos:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Whey Protein e Creatina são os mais eficazes para seus objetivos</li>
                          <li>• Sempre consulte um médico antes de iniciar qualquer suplementação</li>
                          <li>• A alimentação deve ser sempre a prioridade</li>
                          <li>• Compre apenas de marcas confiáveis e certificadas</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Apple className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Nenhum suplemento específico recomendado no momento.
                      </p>
                      <p className="text-sm text-gray-500">
                        Uma alimentação balanceada deve suprir suas necessidades atuais.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-purple-500" />
                    Dicas Para Maximizar Resultados
                  </CardTitle>
                  <CardDescription>
                    Orientações personalizadas para seu sucesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mealPlan.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <Star className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={resetForm} variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Criar Nova Dieta
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Baixar Plano Completo (PDF)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Mais Fit
            </h1>
          </div>
          <p className="text-blue-100 text-lg mb-4">
            🔥 O Nutricionista Digital que já transformou +10.000 brasileiros
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.9/5 (2.847 avaliações)</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>100% Seguro</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-blue-200 mb-2">
            <span>Etapa {currentStep} de {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% completo</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-3 bg-blue-800" />
        </div>

        {/* Form Steps */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardContent className="p-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Vamos nos conhecer!</h2>
                  <p className="text-gray-600">Conte-nos sobre você para criarmos sua dieta perfeita</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      placeholder="Como você gostaria de ser chamado(a)?"
                      value={userData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Idade *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Quantos anos você tem?"
                      value={userData.age || ''}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Sexo *</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Selecione seu sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight">Peso atual (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 70"
                      value={userData.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="height">Altura (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Ex: 170"
                      value={userData.height || ''}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Goal */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Qual é o seu sonho?</h2>
                  <p className="text-gray-600">Vamos personalizar tudo para você alcançar seus objetivos</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { 
                      value: 'emagrecimento', 
                      label: '🔥 Emagrecer e Definir', 
                      desc: 'Perder gordura e conquistar o corpo dos sonhos',
                      gradient: 'from-red-50 to-orange-50 border-red-200'
                    },
                    { 
                      value: 'ganho_massa', 
                      label: '💪 Ganhar Massa Muscular', 
                      desc: 'Construir músculos e ficar mais forte',
                      gradient: 'from-blue-50 to-indigo-50 border-blue-200'
                    },
                    { 
                      value: 'manutencao', 
                      label: '⚖️ Manter e Melhorar', 
                      desc: 'Manter peso e melhorar composição corporal',
                      gradient: 'from-green-50 to-emerald-50 border-green-200'
                    }
                  ].map((goal) => (
                    <div
                      key={goal.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all bg-gradient-to-r ${
                        userData.goal === goal.value
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg'
                          : `${goal.gradient} hover:shadow-md`
                      }`}
                      onClick={() => handleInputChange('goal', goal.value)}
                    >
                      <div className="font-semibold text-lg">{goal.label}</div>
                      <div className="text-sm text-gray-600">{goal.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Activity Level */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Dumbbell className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Qual atividade física você pratica?</h2>
                  <p className="text-gray-600">Isso nos ajuda a calcular suas necessidades calóricas</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Tipo de atividade principal:</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'musculacao', label: '🏋️ Musculação', desc: 'Academia/pesos' },
                        { value: 'crossfit', label: '🔥 CrossFit', desc: 'Treino funcional' },
                        { value: 'esporte', label: '⚽ Esporte', desc: 'Futebol, vôlei, etc.' },
                        { value: 'nenhuma', label: '🚶 Nenhuma', desc: 'Apenas dieta' }
                      ].map((activity) => (
                        <div
                          key={activity.value}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                            userData.activityType === activity.value
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('activityType', activity.value)}
                        >
                          <div className="font-semibold text-sm">{activity.label}</div>
                          <div className="text-xs text-gray-600">{activity.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Frequência semanal:</Label>
                    <div className="space-y-3">
                      {[
                        { value: 'sedentario', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
                        { value: 'leve', label: 'Leve', desc: '1-3 dias por semana' },
                        { value: 'moderado', label: 'Moderado', desc: '3-5 dias por semana' },
                        { value: 'intenso', label: 'Intenso', desc: '6-7 dias por semana' },
                        { value: 'muito_intenso', label: 'Muito Intenso', desc: '2x por dia ou trabalho físico' }
                      ].map((level) => (
                        <div
                          key={level.value}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            userData.activityLevel === level.value
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('activityLevel', level.value)}
                        >
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="cardio"
                        checked={userData.cardio}
                        onCheckedChange={(checked) => handleInputChange('cardio', checked)}
                      />
                      <Label htmlFor="cardio" className="font-semibold">Faço cardio regularmente</Label>
                    </div>
                    {userData.cardio && (
                      <div className="mt-3">
                        <Label htmlFor="cardioFreq">Quantas vezes por semana?</Label>
                        <Select onValueChange={(value) => handleInputChange('cardioFrequency', parseInt(value))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1x por semana</SelectItem>
                            <SelectItem value="2">2x por semana</SelectItem>
                            <SelectItem value="3">3x por semana</SelectItem>
                            <SelectItem value="4">4x por semana</SelectItem>
                            <SelectItem value="5">5x por semana</SelectItem>
                            <SelectItem value="6">6x por semana</SelectItem>
                            <SelectItem value="7">Todos os dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Workout Time */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Clock className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Quando você treina?</h2>
                  <p className="text-gray-600">Vamos ajustar sua alimentação ao seu horário de treino</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'manha', label: '🌅 Manhã', desc: '06:00 - 12:00', color: 'from-yellow-50 to-orange-50' },
                    { value: 'tarde', label: '☀️ Tarde', desc: '12:00 - 18:00', color: 'from-orange-50 to-red-50' },
                    { value: 'noite', label: '🌙 Noite', desc: '18:00 - 22:00', color: 'from-blue-50 to-indigo-50' },
                    { value: 'nao_treina', label: '🍽️ Não treino', desc: 'Apenas dieta', color: 'from-green-50 to-emerald-50' }
                  ].map((time) => (
                    <div
                      key={time.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center bg-gradient-to-br ${
                        userData.workoutTime === time.value
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                          : `border-gray-200 hover:border-gray-300 ${time.color}`
                      }`}
                      onClick={() => handleInputChange('workoutTime', time.value)}
                    >
                      <div className="font-semibold text-lg">{time.label}</div>
                      <div className="text-sm text-gray-600">{time.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Dietary Preferences */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Apple className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Suas preferências alimentares</h2>
                  <p className="text-gray-600">Vamos personalizar sua dieta com os alimentos que você ama</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-500" />
                      Restrições Alimentares
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[
                        'Vegetariano',
                        'Vegano',
                        'Sem Glúten',
                        'Sem Lactose',
                        'Sem Açúcar',
                        'Low Carb'
                      ].map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={restriction}
                            checked={userData.dietaryRestrictions?.includes(restriction)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('dietaryRestrictions', restriction, checked as boolean)
                            }
                          />
                          <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Digite outras restrições (ex: amendoim, frutos do mar...)"
                        value={userData.customRestrictions || ''}
                        onChange={(e) => handleInputChange('customRestrictions', e.target.value)}
                        className="pl-10 border-red-200 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-500" />
                      Alimentos que você AMA
                    </h3>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Digite seus alimentos favoritos (ex: salmão, abacate, batata doce...)"
                        value={userData.customFoodPreferences || ''}
                        onChange={(e) => handleInputChange('customFoodPreferences', e.target.value)}
                        className="pl-10 border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Food Categories */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <ChefHat className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Seus alimentos preferidos</h2>
                  <p className="text-gray-600">Selecione seus favoritos em cada categoria</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-orange-600">🍞 Carboidratos Preferidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Arroz Integral', 'Batata Doce', 'Aveia', 'Quinoa', 'Pão Integral', 'Macarrão Integral'].map((carb) => (
                        <div key={carb} className="flex items-center space-x-2">
                          <Checkbox
                            id={carb}
                            checked={userData.preferredCarbs?.includes(carb)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('preferredCarbs', carb, checked as boolean)
                            }
                          />
                          <Label htmlFor={carb} className="text-sm">{carb}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-blue-600">🥩 Proteínas Preferidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Frango', 'Peixe', 'Carne Vermelha', 'Ovos', 'Queijo Cottage', 'Tofu'].map((protein) => (
                        <div key={protein} className="flex items-center space-x-2">
                          <Checkbox
                            id={protein}
                            checked={userData.preferredProteins?.includes(protein)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('preferredProteins', protein, checked as boolean)
                            }
                          />
                          <Label htmlFor={protein} className="text-sm">{protein}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">🍎 Frutas Preferidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Banana', 'Maçã', 'Morango', 'Abacate', 'Laranja', 'Mamão'].map((fruit) => (
                        <div key={fruit} className="flex items-center space-x-2">
                          <Checkbox
                            id={fruit}
                            checked={userData.preferredFruits?.includes(fruit)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('preferredFruits', fruit, checked as boolean)
                            }
                          />
                          <Label htmlFor={fruit} className="text-sm">{fruit}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-green-600">🥬 Vegetais e Legumes Preferidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Brócolis', 'Espinafre', 'Couve-flor', 'Cenoura', 'Abobrinha', 'Tomate'].map((vegetable) => (
                        <div key={vegetable} className="flex items-center space-x-2">
                          <Checkbox
                            id={vegetable}
                            checked={userData.preferredVegetables?.includes(vegetable)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('preferredVegetables', vegetable, checked as boolean)
                            }
                          />
                          <Label htmlFor={vegetable} className="text-sm">{vegetable}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Daily Routine */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Timer className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Sua rotina diária</h2>
                  <p className="text-gray-600">Vamos ajustar os horários das refeições à sua rotina</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wakeUp">🌅 Que horas você acorda?</Label>
                    <Input
                      id="wakeUp"
                      type="time"
                      value={userData.wakeUpTime || ''}
                      onChange={(e) => handleInputChange('wakeUpTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakfast">🥐 Que horas toma café da manhã?</Label>
                    <Input
                      id="breakfast"
                      type="time"
                      value={userData.breakfastTime || ''}
                      onChange={(e) => handleInputChange('breakfastTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lunch">🍽️ Que horas almoça?</Label>
                    <Input
                      id="lunch"
                      type="time"
                      value={userData.lunchTime || ''}
                      onChange={(e) => handleInputChange('lunchTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="snack">🍎 Que horas faz lanche da tarde?</Label>
                    <Input
                      id="snack"
                      type="time"
                      value={userData.snackTime || ''}
                      onChange={(e) => handleInputChange('snackTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dinner">🌙 Que horas janta?</Label>
                    <Input
                      id="dinner"
                      type="time"
                      value={userData.dinnerTime || ''}
                      onChange={(e) => handleInputChange('dinnerTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleep">😴 Que horas vai dormir?</Label>
                    <Input
                      id="sleep"
                      type="time"
                      value={userData.sleepTime || ''}
                      onChange={(e) => handleInputChange('sleepTime', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Dica Importante</h3>
                  <p className="text-sm text-blue-700">
                    Esses horários nos ajudam a distribuir suas refeições de forma ideal para maximizar seus resultados!
                  </p>
                </div>
              </div>
            )}

            {/* Step 8: Supplements */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Pill className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Suplementos</h2>
                  <p className="text-gray-600">Conte-nos sobre sua experiência com suplementos</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Você já usa algum suplemento?
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[
                        'Whey Protein',
                        'Creatina',
                        'BCAA',
                        'Multivitamínico',
                        'Ômega 3',
                        'Vitamina D',
                        'ZMA',
                        'L-Carnitina'
                      ].map((supplement) => (
                        <div key={supplement} className="flex items-center space-x-2">
                          <Checkbox
                            id={`current-${supplement}`}
                            checked={userData.currentSupplements?.includes(supplement)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('currentSupplements', supplement, checked as boolean)
                            }
                          />
                          <Label htmlFor={`current-${supplement}`} className="text-sm">{supplement}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-blue-500" />
                      Tem interesse em usar algum suplemento?
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[
                        'Whey Protein',
                        'Creatina',
                        'BCAA',
                        'Multivitamínico',
                        'Ômega 3',
                        'Vitamina D',
                        'ZMA',
                        'L-Carnitina'
                      ].map((supplement) => (
                        <div key={supplement} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interested-${supplement}`}
                            checked={userData.interestedSupplements?.includes(supplement)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('interestedSupplements', supplement, checked as boolean)
                            }
                          />
                          <Label htmlFor={`interested-${supplement}`} className="text-sm">{supplement}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-500" />
                      Qual seu principal objetivo com suplementos?
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Ganhar massa muscular',
                        'Melhorar performance no treino',
                        'Acelerar recuperação',
                        'Suprir deficiências nutricionais',
                        'Aumentar energia',
                        'Melhorar saúde geral'
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${goal}`}
                            checked={userData.supplementGoals?.includes(goal)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('supplementGoals', goal, checked as boolean)
                            }
                          />
                          <Label htmlFor={`goal-${goal}`} className="text-sm">{goal}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante sobre Suplementos</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Sempre priorize uma alimentação balanceada</li>
                      <li>• Consulte um médico antes de iniciar qualquer suplementação</li>
                      <li>• Whey Protein e Creatina são os mais eficazes para ganho de massa</li>
                      <li>• Compre apenas de marcas confiáveis e certificadas</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Budget */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-semibold">Orçamento para alimentação</h2>
                  <p className="text-gray-600">Vamos adequar sua dieta ao seu orçamento mensal</p>
                </div>

                <div className="space-y-3">
                  {[
                    { 
                      value: 'baixo', 
                      label: '💚 Econômico', 
                      desc: 'Até R$ 400/mês • Foco em alimentos básicos e nutritivos',
                      gradient: 'from-green-50 to-emerald-50 border-green-200'
                    },
                    { 
                      value: 'medio', 
                      label: '💛 Moderado', 
                      desc: 'R$ 400 - R$ 800/mês • Variedade e qualidade balanceadas',
                      gradient: 'from-yellow-50 to-orange-50 border-yellow-200'
                    },
                    { 
                      value: 'alto', 
                      label: '💜 Premium', 
                      desc: 'Acima de R$ 800/mês • Alimentos premium e orgânicos',
                      gradient: 'from-purple-50 to-indigo-50 border-purple-200'
                    }
                  ].map((budget) => (
                    <div
                      key={budget.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all bg-gradient-to-r ${
                        userData.budget === budget.value
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg'
                          : `${budget.gradient} hover:shadow-md`
                      }`}
                      onClick={() => handleInputChange('budget', budget.value)}
                    >
                      <div className="font-semibold text-lg">{budget.label}</div>
                      <div className="text-sm text-gray-600">{budget.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="text-center">
                    <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="font-bold text-purple-800 text-xl mb-2">🎉 Parabéns! Você está pronto!</h3>
                    <p className="text-purple-700 mb-4">
                      Agora vamos criar sua dieta personalizada com base em todas essas informações.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-purple-600">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Dados coletados</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Preferências mapeadas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Suplementos analisados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!userData.name || !userData.age || !userData.gender || !userData.weight || !userData.height)) ||
                    (currentStep === 2 && !userData.goal) ||
                    (currentStep === 3 && (!userData.activityLevel || !userData.activityType)) ||
                    (currentStep === 4 && !userData.workoutTime) ||
                    (currentStep === 7 && (!userData.wakeUpTime || !userData.breakfastTime || !userData.lunchTime || !userData.dinnerTime)) ||
                    (currentStep === 9 && !userData.budget)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={generatePlan}
                  disabled={!isFormValid()}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Criar Minha Dieta!
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Dados protegidos</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>+10.000 transformações</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Feito no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}