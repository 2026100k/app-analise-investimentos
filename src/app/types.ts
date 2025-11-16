// Types para o app de investimentos

export type InvestmentProfile = 'conservative' | 'moderate' | 'aggressive';
export type Currency = 'BRL' | 'USD' | 'EUR';

export interface UserProfile {
  name: string;
  profile: InvestmentProfile;
  investmentGoal: number;
  riskTolerance: number;
  currency: Currency;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'funds';
  currentPrice: number;
  change24h: number;
  changePercent: number;
  recommendation: 'buy' | 'hold' | 'sell';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface MarketTrend {
  date: string;
  value: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Notification {
  id: string;
  type: 'alert' | 'opportunity' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
