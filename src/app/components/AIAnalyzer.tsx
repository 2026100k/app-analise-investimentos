'use client';

import { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Loader2, DollarSign, Filter } from 'lucide-react';
import { UserProfile, Investment, Currency } from '../types';

interface AIAnalyzerProps {
  userProfile: UserProfile | null;
  investments: Investment[];
  onClose: () => void;
  currency: Currency;
}

interface AnalysisResult {
  allocation: {
    investment: Investment;
    percentage: number;
    amount: number;
    reasoning: string;
  }[];
  totalReturn: number;
  riskScore: number;
  recommendation: string;
}

type InvestmentType = 'all' | 'stocks' | 'bonds' | 'crypto' | 'funds';

export default function AIAnalyzer({ userProfile, investments, onClose, currency: globalCurrency }: AIAnalyzerProps) {
  const [amount, setAmount] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(globalCurrency);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<InvestmentType>('all');

  const formatCurrency = (value: number, curr: Currency = selectedCurrency) => {
    const symbols = {
      BRL: 'R$',
      USD: '$',
      EUR: '€'
    };
    
    const rates = {
      BRL: 1,
      USD: 0.20,
      EUR: 0.18
    };

    const convertedValue = value * rates[curr];
    return `${symbols[curr]} ${convertedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const analyzeInvestment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    setAnalyzing(true);

    // Simula análise de IA (em produção, seria uma chamada para API de IA)
    setTimeout(() => {
      const investmentAmount = parseFloat(amount);
      const profile = userProfile?.profile || 'moderate';

      // Filtra investimentos baseado no perfil e tipo selecionado
      const profileRiskMap = {
        conservative: ['low'],
        moderate: ['low', 'medium'],
        aggressive: ['low', 'medium', 'high'],
      };

      const allowedRisks = profileRiskMap[profile];
      let suitableInvestments = investments.filter(inv => 
        allowedRisks.includes(inv.riskLevel) && inv.recommendation !== 'sell'
      );

      // Filtra por tipo de investimento se não for "all"
      if (selectedInvestmentType !== 'all') {
        suitableInvestments = suitableInvestments.filter(inv => inv.type === selectedInvestmentType);
      }

      // Algoritmo de alocação baseado em perfil
      let allocation: AnalysisResult['allocation'] = [];

      if (profile === 'conservative') {
        // Conservador: 70% baixo risco, 30% médio risco
        const lowRisk = suitableInvestments.filter(i => i.riskLevel === 'low');
        const mediumRisk = suitableInvestments.filter(i => i.riskLevel === 'medium');

        if (lowRisk.length > 0) {
          const perInvestment = 0.7 / lowRisk.length;
          lowRisk.forEach(inv => {
            allocation.push({
              investment: inv,
              percentage: perInvestment * 100,
              amount: investmentAmount * perInvestment,
              reasoning: 'Investimento de baixo risco com retorno estável e seguro.'
            });
          });
        }

        if (mediumRisk.length > 0 && mediumRisk.length <= 2) {
          const perInvestment = 0.3 / mediumRisk.length;
          mediumRisk.slice(0, 1).forEach(inv => {
            allocation.push({
              investment: inv,
              percentage: perInvestment * 100,
              amount: investmentAmount * perInvestment,
              reasoning: 'Diversificação com risco moderado para potencial de crescimento.'
            });
          });
        }
      } else if (profile === 'moderate') {
        // Moderado: 40% baixo, 40% médio, 20% alto
        const lowRisk = suitableInvestments.filter(i => i.riskLevel === 'low');
        const mediumRisk = suitableInvestments.filter(i => i.riskLevel === 'medium');
        const highRisk = suitableInvestments.filter(i => i.riskLevel === 'high');

        if (lowRisk.length > 0) {
          allocation.push({
            investment: lowRisk[0],
            percentage: 40,
            amount: investmentAmount * 0.4,
            reasoning: 'Base sólida com investimento de baixo risco.'
          });
        }

        if (mediumRisk.length > 0) {
          allocation.push({
            investment: mediumRisk[0],
            percentage: 40,
            amount: investmentAmount * 0.4,
            reasoning: 'Equilíbrio entre segurança e crescimento.'
          });
        }

        if (highRisk.length > 0) {
          allocation.push({
            investment: highRisk[0],
            percentage: 20,
            amount: investmentAmount * 0.2,
            reasoning: 'Potencial de alto retorno com risco controlado.'
          });
        }
      } else {
        // Arrojado: 20% baixo, 30% médio, 50% alto
        const lowRisk = suitableInvestments.filter(i => i.riskLevel === 'low');
        const mediumRisk = suitableInvestments.filter(i => i.riskLevel === 'medium');
        const highRisk = suitableInvestments.filter(i => i.riskLevel === 'high');

        if (lowRisk.length > 0) {
          allocation.push({
            investment: lowRisk[0],
            percentage: 20,
            amount: investmentAmount * 0.2,
            reasoning: 'Reserva de segurança para proteção do capital.'
          });
        }

        if (mediumRisk.length > 0) {
          allocation.push({
            investment: mediumRisk[0],
            percentage: 30,
            amount: investmentAmount * 0.3,
            reasoning: 'Crescimento consistente com risco moderado.'
          });
        }

        if (highRisk.length > 0) {
          const perInvestment = 0.5 / Math.min(highRisk.length, 2);
          highRisk.slice(0, 2).forEach(inv => {
            allocation.push({
              investment: inv,
              percentage: perInvestment * 100,
              amount: investmentAmount * perInvestment,
              reasoning: 'Máximo potencial de retorno com risco elevado.'
            });
          });
        }
      }

      // Calcula retorno estimado e score de risco
      const totalReturn = allocation.reduce((sum, item) => {
        return sum + (item.investment.changePercent * item.percentage / 100);
      }, 0);

      const riskScore = allocation.reduce((sum, item) => {
        const riskValue = item.investment.riskLevel === 'low' ? 1 : 
                         item.investment.riskLevel === 'medium' ? 2 : 3;
        return sum + (riskValue * item.percentage / 100);
      }, 0);

      const recommendations = {
        conservative: 'Portfólio focado em segurança e preservação de capital com retornos estáveis.',
        moderate: 'Portfólio equilibrado entre segurança e crescimento, ideal para objetivos de médio prazo.',
        aggressive: 'Portfólio otimizado para máximo crescimento, adequado para investidores com alta tolerância a risco.'
      };

      setResult({
        allocation,
        totalReturn,
        riskScore,
        recommendation: recommendations[profile]
      });

      setAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (score: number) => {
    if (score < 1.5) return 'text-green-600 dark:text-green-400';
    if (score < 2.5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRiskLabel = (score: number) => {
    if (score < 1.5) return 'Baixo';
    if (score < 2.5) return 'Moderado';
    return 'Alto';
  };

  const getInvestmentTypeLabel = (type: InvestmentType) => {
    const labels = {
      all: 'Todos os Tipos',
      stocks: 'Ações',
      bonds: 'Títulos',
      crypto: 'Criptomoedas',
      funds: 'Fundos'
    };
    return labels[type];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 sm:p-8 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Análise de IA
                </h2>
                <p className="text-purple-100 text-sm sm:text-base">
                  Descubra onde investir seu dinheiro
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!result ? (
            <div className="space-y-6">
              {/* User Profile Info */}
              {userProfile && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Perfil Identificado
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium capitalize">
                      {userProfile.profile === 'conservative' ? 'Conservador' : 
                       userProfile.profile === 'moderate' ? 'Moderado' : 'Arrojado'}
                    </span>
                    {' '}- Meta de investimento: {formatCurrency(userProfile.investmentGoal, userProfile.currency)}
                  </p>
                </div>
              )}

              {/* Currency and Investment Type Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Currency Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Moeda
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all appearance-none cursor-pointer"
                    >
                      <option value="BRL">🇧🇷 Real Brasileiro (BRL)</option>
                      <option value="USD">🇺🇸 Dólar Americano (USD)</option>
                      <option value="EUR">🇪🇺 Euro (EUR)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Investment Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Investimento
                  </label>
                  <div className="relative">
                    <select
                      value={selectedInvestmentType}
                      onChange={(e) => setSelectedInvestmentType(e.target.value as InvestmentType)}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">📊 Todos os Tipos</option>
                      <option value="stocks">📈 Ações</option>
                      <option value="bonds">💼 Títulos</option>
                      <option value="crypto">₿ Criptomoedas</option>
                      <option value="funds">🏦 Fundos</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Filters Display */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Filter className="w-4 h-4" />
                  {selectedCurrency}
                </div>
                <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Filter className="w-4 h-4" />
                  {getInvestmentTypeLabel(selectedInvestmentType)}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quanto você deseja investir?
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10000"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  A IA analisará as melhores oportunidades baseadas no seu perfil
                </p>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeInvestment}
                disabled={analyzing || !amount}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analisar com IA
                  </>
                )}
              </button>

              {/* Info Box */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-medium mb-1">Como funciona?</p>
                    <p>
                      Nossa IA analisa seu perfil de investidor, tolerância a risco, moeda preferida e tipo de investimento 
                      para sugerir a melhor alocação do seu capital entre diferentes ativos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retorno Estimado</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +{result.totalReturn.toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Baseado em 30 dias</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nível de Risco</p>
                  <p className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                    {getRiskLabel(result.riskScore)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Score: {result.riskScore.toFixed(1)}/3.0</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Diversificação</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.allocation.length} ativos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Portfólio balanceado</p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Recomendação da IA
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Allocation Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Alocação Recomendada ({selectedCurrency})
                </h3>
                <div className="space-y-4">
                  {result.allocation.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                            {item.investment.name}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {item.investment.type === 'stocks' ? 'Ações' :
                             item.investment.type === 'bonds' ? 'Títulos' :
                             item.investment.type === 'crypto' ? 'Criptomoedas' : 'Fundos'}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {item.percentage.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(item.amount)}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.reasoning}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className={`font-medium ${
                          item.investment.riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                          item.investment.riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          Risco: {item.investment.riskLevel === 'low' ? 'Baixo' : 
                                 item.investment.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                        </span>
                        <span className={`font-medium ${
                          item.investment.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {item.investment.changePercent >= 0 ? '+' : ''}{item.investment.changePercent.toFixed(2)}% (24h)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Nova Análise
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
