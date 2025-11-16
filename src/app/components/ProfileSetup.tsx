'use client';

import { useState } from 'react';
import { UserProfile, InvestmentProfile, Currency } from '../types';
import { X, DollarSign } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

export default function ProfileSetup({ onComplete, initialProfile }: ProfileSetupProps) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [profile, setProfile] = useState<InvestmentProfile>(initialProfile?.profile || 'moderate');
  const [investmentGoal, setInvestmentGoal] = useState(initialProfile?.investmentGoal || 10000);
  const [riskTolerance, setRiskTolerance] = useState(initialProfile?.riskTolerance || 5);
  const [currency, setCurrency] = useState<Currency>(initialProfile?.currency || 'BRL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name,
      profile,
      investmentGoal,
      riskTolerance,
      currency,
    });
  };

  const profiles: { value: InvestmentProfile; label: string; description: string }[] = [
    {
      value: 'conservative',
      label: 'Conservador',
      description: 'Prioriza segurança e estabilidade',
    },
    {
      value: 'moderate',
      label: 'Moderado',
      description: 'Equilíbrio entre risco e retorno',
    },
    {
      value: 'aggressive',
      label: 'Arrojado',
      description: 'Busca máximo retorno com maior risco',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {initialProfile ? 'Editar Perfil' : 'Configure seu Perfil'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Moeda Preferida
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="BRL">🇧🇷 Real Brasileiro (BRL)</option>
                  <option value="USD">🇺🇸 Dólar Americano (USD)</option>
                  <option value="EUR">🇪🇺 Euro (EUR)</option>
                </select>
                <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Perfil de Investidor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profiles.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setProfile(p.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profile === p.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {p.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {p.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta de Investimento: ${investmentGoal.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={investmentGoal}
                onChange={(e) => setInvestmentGoal(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>$1,000</span>
                <span>$100,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tolerância ao Risco: {riskTolerance}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Baixo</span>
                <span>Alto</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {initialProfile ? 'Salvar Alterações' : 'Começar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
