'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Investment } from '../types';

interface InvestmentCardProps {
  investment: Investment;
  onSelect: (investment: Investment) => void;
}

export default function InvestmentCard({ investment, onSelect }: InvestmentCardProps) {
  const isPositive = investment.changePercent >= 0;
  
  const riskColors = {
    low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const recommendationColors = {
    buy: 'bg-green-500',
    hold: 'bg-yellow-500',
    sell: 'bg-red-500',
  };

  return (
    <div
      onClick={() => onSelect(investment)}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-105"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg mb-1">
            {investment.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${riskColors[investment.riskLevel]}`}>
            {investment.riskLevel === 'low' ? 'Baixo Risco' : investment.riskLevel === 'medium' ? 'Médio Risco' : 'Alto Risco'}
          </span>
        </div>
        <div className={`w-3 h-3 rounded-full ${recommendationColors[investment.recommendation]}`} />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            ${investment.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? '+' : ''}{investment.changePercent.toFixed(2)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({isPositive ? '+' : ''}${investment.change24h.toFixed(2)})
          </span>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Recomendação: {investment.recommendation === 'buy' ? 'Comprar' : investment.recommendation === 'hold' ? 'Manter' : 'Vender'}
          </span>
        </div>
      </div>
    </div>
  );
}
