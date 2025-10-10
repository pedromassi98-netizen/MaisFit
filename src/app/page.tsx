'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { UserData, NutritionPlan } from '@/lib/types';
import { generateNutritionPlan } from '@/lib/nutrition';
import { ChevronLeft, ChevronRight, Star, Shield, Clock, Target, Zap, Heart, Upload, Send, CheckCircle, Award, Users, TrendingUp } from 'lucide-react';

type Step = 'personal' | 'goal' | 'activity' | 'preferences' | 'routine' | 'supplements' | 'budget' | 'result';

export default function MaisFitApp() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [userData, setUserData] = useState<Partial<UserData>>({
    preferredCarbs: [],
    preferredProteins: [],
    preferredFruits: [],
    preferredVegetables: [],
    restrictions: [],
    currentSupplements: [],
    interestedSupplements: [],
    supplementGoals: []
  });
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const steps: Step[] = ['personal', 'goal', 'activity', 'preferences', 'routine', 'supplements', 'budget', 'result'];
  const currentStepIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const generatePlan = () => {
    if (userData as UserData) {
      const plan = generateNutritionPlan(userData as UserData);
      setNutritionPlan(plan);
      setCurrentStep('result');
    }
  };

  const addToList = (category: keyof UserData, item: string) => {
    if (item.trim()) {
      const currentList = (userData[category] as string[]) || [];
      if (!currentList.includes(item.trim())) {
        setUserData(prev => ({
          ...prev,
          [category]: [...currentList, item.trim()]
        }));
      }
      setSearchTerm('');
    }
  };

  const removeFromList = (category: keyof UserData, item: string) => {
    const currentList = (userData[category] as string[]) || [];
    setUserData(prev => ({
      ...prev,
      [category]: currentList.filter(i => i !== item)
    }));
  };

  const renderPersonalStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Mais Fit
          </CardTitle>
        </div>
        <CardDescription className="text-lg font-medium text-gray-700">
          🔥 Sua transformação começa AGORA!
        </CardDescription>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-green-600" />
            <span className="font-semibold">+15.000</span> transformados
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold">4.9/5</span> avaliação
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-800">GARANTIA TOTAL</span>
          </div>
          <p className="text-sm text-blue-700">
            ✅ Transformação comprovada em 30 dias<br/>
            ✅ Método aprovado por nutricionistas<br/>
            ✅ Suporte completo via WhatsApp
          </p>
        </div>

        <div>
          <Label htmlFor="name" className="text-sm font-semibold">Nome completo *</Label>
          <Input
            id="name"
            value={userData.name || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Seu nome completo"
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-semibold">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={userData.email || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="seu@email.com"
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-sm font-semibold">WhatsApp *</Label>
          <Input
            id="whatsapp"
            value={userData.whatsapp || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="(11) 99999-9999"
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label htmlFor="age" className="text-sm font-semibold">Idade</Label>
            <Input
              id="age"
              type="number"
              value={userData.age || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              placeholder="25"
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
          <div>
            <Label htmlFor="weight" className="text-sm font-semibold">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={userData.weight || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
              placeholder="70"
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-sm font-semibold">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              value={userData.height || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
              placeholder="170"
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">Sexo</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={userData.gender === 'masculino' ? 'default' : 'outline'}
              onClick={() => setUserData(prev => ({ ...prev, gender: 'masculino' }))}
              className="flex-1 border-2"
            >
              Masculino
            </Button>
            <Button
              variant={userData.gender === 'feminino' ? 'default' : 'outline'}
              onClick={() => setUserData(prev => ({ ...prev, gender: 'feminino' }))}
              className="flex-1 border-2"
            >
              Feminino
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="font-bold text-orange-800">ÚLTIMAS VAGAS!</span>
          </div>
          <p className="text-sm text-orange-700">
            🚨 Apenas <strong>47 vagas</strong> restantes hoje<br/>
            ⏰ Preço promocional válido por tempo limitado
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderGoalStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">🎯 Qual é o seu objetivo?</CardTitle>
        <CardDescription className="text-lg">
          Escolha seu foco principal para resultados MÁXIMOS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={userData.goal === 'emagrecimento' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, goal: 'emagrecimento' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="font-bold text-lg">🔥 Emagrecimento</div>
              <div className="text-sm text-muted-foreground">Queimar gordura e definir o corpo</div>
            </div>
          </div>
        </Button>
        
        <Button
          variant={userData.goal === 'ganho_massa' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, goal: 'ganho_massa' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-lg">💪 Ganho de Massa</div>
              <div className="text-sm text-muted-foreground">Construir músculos e força</div>
            </div>
          </div>
        </Button>
        
        <Button
          variant={userData.goal === 'manutencao' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, goal: 'manutencao' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="font-bold text-lg">⚖️ Manutenção</div>
              <div className="text-sm text-muted-foreground">Manter peso e ter mais saúde</div>
            </div>
          </div>
        </Button>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-800">COMPROVADO CIENTIFICAMENTE</span>
          </div>
          <p className="text-sm text-green-700">
            ✅ Método baseado em +200 estudos científicos<br/>
            ✅ Resultados visíveis em apenas 2 semanas<br/>
            ✅ Sem efeito sanfona, sem passar fome
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderActivityStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">🏃‍♂️ Atividade Física</CardTitle>
        <CardDescription className="text-lg">
          Conte sobre sua rotina de exercícios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-semibold">Qual atividade você pratica?</Label>
          <Input
            value={userData.physicalActivity || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, physicalActivity: e.target.value }))}
            placeholder="Ex: Musculação, Crossfit, Futebol..."
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold">Você faz cardio?</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={userData.cardio === true ? 'default' : 'outline'}
              onClick={() => setUserData(prev => ({ ...prev, cardio: true }))}
              className="flex-1 border-2"
            >
              ✅ Sim
            </Button>
            <Button
              variant={userData.cardio === false ? 'default' : 'outline'}
              onClick={() => setUserData(prev => ({ ...prev, cardio: false }))}
              className="flex-1 border-2"
            >
              ❌ Não
            </Button>
          </div>
        </div>

        {userData.cardio && (
          <div>
            <Label className="text-sm font-semibold">Quantas vezes por semana?</Label>
            <Input
              type="number"
              value={userData.cardioFrequency || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, cardioFrequency: parseInt(e.target.value) }))}
              placeholder="3"
              min="1"
              max="7"
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
        )}

        <div>
          <Label className="text-sm font-semibold">Nível de atividade</Label>
          <div className="space-y-2 mt-2">
            {[
              { value: 'sedentario', label: '😴 Sedentário', desc: 'Pouco ou nenhum exercício' },
              { value: 'leve', label: '🚶‍♂️ Leve (1-3x/semana)', desc: 'Exercício leve' },
              { value: 'moderado', label: '🏃‍♂️ Moderado (3-5x/semana)', desc: 'Exercício moderado' },
              { value: 'intenso', label: '💪 Intenso (6-7x/semana)', desc: 'Exercício pesado' },
              { value: 'muito_intenso', label: '🔥 Muito Intenso (2x/dia)', desc: 'Exercício muito pesado' }
            ].map((level) => (
              <Button
                key={level.value}
                variant={userData.activityLevel === level.value ? 'default' : 'outline'}
                onClick={() => setUserData(prev => ({ ...prev, activityLevel: level.value as any }))}
                className="w-full text-left justify-start text-sm border-2 h-auto py-3"
              >
                <div>
                  <div className="font-semibold">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.desc}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="workoutTime" className="text-sm font-semibold">⏰ Horário do treino</Label>
          <Input
            id="workoutTime"
            type="time"
            value={userData.workoutTime || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, workoutTime: e.target.value }))}
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderPreferencesStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">🍽️ Preferências Alimentares</CardTitle>
        <CardDescription className="text-lg">
          Personalize com seus alimentos favoritos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-semibold">🍞 Carboidratos Preferidos</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: aveia, batata doce..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('preferredCarbs', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('preferredCarbs', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.preferredCarbs?.map((item, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('preferredCarbs', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🥩 Proteínas Preferidas</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: frango, peixe..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('preferredProteins', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('preferredProteins', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.preferredProteins?.map((item, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('preferredProteins', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🍎 Frutas Preferidas</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: banana, maçã..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('preferredFruits', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('preferredFruits', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.preferredFruits?.map((item, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('preferredFruits', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🥬 Vegetais Preferidos</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: brócolis, cenoura..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('preferredVegetables', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('preferredVegetables', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.preferredVegetables?.map((item, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('preferredVegetables', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🚫 Restrições Alimentares</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: lactose, glúten..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('restrictions', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('restrictions', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.restrictions?.map((item, index) => (
              <Badge key={index} variant="destructive" className="cursor-pointer text-xs hover:bg-red-200" onClick={() => removeFromList('restrictions', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRoutineStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">⏰ Sua Rotina Diária</CardTitle>
        <CardDescription className="text-lg">
          Horários das suas refeições para MÁXIMOS resultados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="wakeUpTime" className="text-sm font-semibold">🌅 Acordar</Label>
            <Input
              id="wakeUpTime"
              type="time"
              value={userData.wakeUpTime || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, wakeUpTime: e.target.value }))}
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
          <div>
            <Label htmlFor="breakfastTime" className="text-sm font-semibold">☕ Café da manhã</Label>
            <Input
              id="breakfastTime"
              type="time"
              value={userData.breakfastTime || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, breakfastTime: e.target.value }))}
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="lunchTime" className="text-sm font-semibold">🍽️ Almoço</Label>
            <Input
              id="lunchTime"
              type="time"
              value={userData.lunchTime || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, lunchTime: e.target.value }))}
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
          <div>
            <Label htmlFor="snackTime" className="text-sm font-semibold">🥪 Lanche</Label>
            <Input
              id="snackTime"
              type="time"
              value={userData.snackTime || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, snackTime: e.target.value }))}
              className="mt-1 border-2 focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="dinnerTime" className="text-sm font-semibold">🌙 Jantar</Label>
          <Input
            id="dinnerTime"
            type="time"
            value={userData.dinnerTime || ''}
            onChange={(e) => setUserData(prev => ({ ...prev, dinnerTime: e.target.value }))}
            className="mt-1 border-2 focus:border-green-500"
          />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-800">💡 DICA DE OURO</span>
          </div>
          <p className="text-sm text-blue-700">
            ⚡ Horários regulares aceleram o metabolismo em até 23%<br/>
            🔥 Melhora a queima de gordura e absorção de nutrientes<br/>
            ✅ Resultados 3x mais rápidos com disciplina nos horários
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSupplementsStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">💊 Suplementação</CardTitle>
        <CardDescription className="text-lg">
          Turbine seus resultados com suplementos estratégicos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-semibold">✅ Suplementos que já usa</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Whey, Creatina..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('currentSupplements', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('currentSupplements', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.currentSupplements?.map((item, index) => (
              <Badge key={index} variant="default" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('currentSupplements', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🤔 Tem interesse em usar</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: BCAA, Glutamina..."
              onKeyPress={(e) => e.key === 'Enter' && addToList('interestedSupplements', searchTerm)}
              className="border-2 focus:border-green-500"
            />
            <Button onClick={() => addToList('interestedSupplements', searchTerm)} size="sm" className="px-4">
              ➕
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {userData.interestedSupplements?.map((item, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer text-xs hover:bg-red-100" onClick={() => removeFromList('interestedSupplements', item)}>
                {item} ❌
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">🎯 Objetivos com suplementação</Label>
          <div className="space-y-2 mt-2">
            {[
              { goal: 'Ganho de massa muscular', emoji: '💪' },
              { goal: 'Perda de gordura', emoji: '🔥' },
              { goal: 'Melhora da performance', emoji: '⚡' },
              { goal: 'Recuperação muscular', emoji: '🔄' },
              { goal: 'Saúde geral', emoji: '❤️' },
              { goal: 'Aumento de energia', emoji: '⚡' }
            ].map(({ goal, emoji }) => (
              <Button
                key={goal}
                variant={userData.supplementGoals?.includes(goal) ? 'default' : 'outline'}
                onClick={() => {
                  const currentGoals = userData.supplementGoals || [];
                  if (currentGoals.includes(goal)) {
                    setUserData(prev => ({
                      ...prev,
                      supplementGoals: currentGoals.filter(g => g !== goal)
                    }));
                  } else {
                    setUserData(prev => ({
                      ...prev,
                      supplementGoals: [...currentGoals, goal]
                    }));
                  }
                }}
                className="w-full justify-start text-sm h-auto py-3 border-2"
              >
                <span className="mr-2">{emoji}</span>
                {goal}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-800">🏆 RECOMENDAÇÃO PREMIUM</span>
          </div>
          <p className="text-sm text-green-700">
            ✅ Incluiremos <strong>Whey Protein</strong> e <strong>Creatina</strong><br/>
            🧬 Os 2 suplementos mais eficazes cientificamente<br/>
            📈 Aceleram resultados em até 40% quando bem utilizados
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderBudgetStep = () => (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">💰 Orçamento Mensal</CardTitle>
        <CardDescription className="text-lg">
          Adequaremos sua dieta ao seu orçamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={userData.budget === 'baixo' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, budget: 'baixo' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div>
            <div className="font-bold text-lg">💵 Orçamento Econômico</div>
            <div className="text-sm text-muted-foreground">Até R$ 300/mês - Máximo custo-benefício</div>
          </div>
        </Button>
        
        <Button
          variant={userData.budget === 'medio' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, budget: 'medio' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div>
            <div className="font-bold text-lg">💳 Orçamento Intermediário</div>
            <div className="text-sm text-muted-foreground">R$ 300-600/mês - Mais variedade</div>
          </div>
        </Button>
        
        <Button
          variant={userData.budget === 'alto' ? 'default' : 'outline'}
          onClick={() => setUserData(prev => ({ ...prev, budget: 'alto' }))}
          className="w-full h-20 text-left justify-start border-2 hover:scale-105 transition-all"
        >
          <div>
            <div className="font-bold text-lg">💎 Orçamento Premium</div>
            <div className="text-sm text-muted-foreground">Acima de R$ 600/mês - Sem limites</div>
          </div>
        </Button>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-800">💡 GARANTIA INTELIGENTE</span>
          </div>
          <p className="text-sm text-purple-700">
            🎯 Otimizamos sua dieta para qualquer orçamento<br/>
            💰 Mesmo com R$ 200/mês você terá resultados incríveis<br/>
            ✅ Foco em alimentos de alta qualidade nutricional
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderResultStep = () => {
    if (!nutritionPlan) return null;

    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎉 Seu Plano Nutricional
            </CardTitle>
            <CardDescription className="text-xl font-semibold text-gray-700">
              Parabéns! Sua dieta personalizada está pronta para TRANSFORMAR sua vida!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{nutritionPlan.calories}</div>
                <div className="text-sm font-semibold text-blue-800">🔥 Calorias/dia</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200">
                <div className="text-3xl font-bold text-red-600">{nutritionPlan.protein}g</div>
                <div className="text-sm font-semibold text-red-800">💪 Proteínas</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">{nutritionPlan.carbs}g</div>
                <div className="text-sm font-semibold text-yellow-800">⚡ Carboidratos</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600">{nutritionPlan.fat}g</div>
                <div className="text-sm font-semibold text-green-800">🥑 Gorduras</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {nutritionPlan.meals.map((meal, index) => (
            <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{meal.name}</CardTitle>
                  <Badge variant="outline" className="text-sm font-semibold px-3 py-1">{meal.time}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meal.foods.map((food, foodIndex) => (
                    <div key={foodIndex} className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r-lg">
                      <div className="font-bold text-lg text-green-800">{food.amount} de {food.name}</div>
                      <div className="text-sm text-gray-600 font-medium">
                        🔥 {food.calories} kcal | 💪 {food.protein}g prot | ⚡ {food.carbs}g carb | 🥑 {food.fat}g gord
                      </div>
                      {food.alternatives && food.alternatives.length > 0 && (
                        <div className="text-sm text-blue-600 mt-2 font-medium">
                          <strong>🔄 Alternativas:</strong> {food.alternatives.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border-2 border-gray-200">
                    <div className="text-sm font-bold text-center">
                      📊 Total: {meal.calories} kcal | {meal.protein}g prot | {meal.carbs}g carb | {meal.fat}g gord
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              💊 Suplementação Recomendada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nutritionPlan.supplements.map((supplement, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                  <div className="font-bold text-lg text-blue-800">{supplement.name}</div>
                  <div className="text-sm text-gray-600 font-medium mt-1">
                    <strong>💊 Dosagem:</strong> {supplement.dosage} | <strong>⏰ Horário:</strong> {supplement.timing}
                  </div>
                  <div className="text-sm text-blue-600 mt-2 font-medium">🎯 {supplement.benefits}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              💡 Dicas para MÁXIMOS Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nutritionPlan.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Parabéns pela sua decisão!</h3>
            <p className="text-lg text-green-700 font-medium">
              Agora é só seguir seu plano e ver os resultados INCRÍVEIS acontecerem!<br/>
              💪 Sua transformação começa HOJE!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalStep();
      case 'goal':
        return renderGoalStep();
      case 'activity':
        return renderActivityStep();
      case 'preferences':
        return renderPreferencesStep();
      case 'routine':
        return renderRoutineStep();
      case 'supplements':
        return renderSupplementsStep();
      case 'budget':
        return renderBudgetStep();
      case 'result':
        return renderResultStep();
      default:
        return renderPersonalStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'personal':
        return userData.name && userData.email && userData.whatsapp && userData.age && userData.weight && userData.height && userData.gender;
      case 'goal':
        return userData.goal;
      case 'activity':
        return userData.activityLevel && userData.physicalActivity;
      case 'preferences':
        return true;
      case 'routine':
        return userData.wakeUpTime && userData.breakfastTime && userData.lunchTime && userData.dinnerTime;
      case 'supplements':
        return true;
      case 'budget':
        return userData.budget;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4">
      <div className="container mx-auto py-8">
        {currentStep !== 'result' && (
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3">
                {steps.slice(0, -1).map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      index <= currentStepIndex ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    {index < steps.length - 2 && (
                      <div className={`w-8 h-2 rounded-full mx-2 transition-all ${
                        index < currentStepIndex ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {renderCurrentStep()}

        {currentStep !== 'result' && (
          <div className="flex justify-between mt-8 max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 border-2 px-6 py-3 font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              ⬅️ Voltar
            </Button>
            
            {currentStepIndex === steps.length - 2 ? (
              <Button
                onClick={generatePlan}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 font-bold text-lg shadow-lg hover:scale-105 transition-all"
              >
                🚀 Gerar Dieta
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 font-bold shadow-lg hover:scale-105 transition-all"
              >
                Próximo ➡️
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}