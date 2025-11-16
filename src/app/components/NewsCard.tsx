'use client';

import { NewsItem } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const impactIcons = {
    positive: <TrendingUp className="w-5 h-5 text-green-500" />,
    negative: <TrendingDown className="w-5 h-5 text-red-500" />,
    neutral: <Minus className="w-5 h-5 text-gray-500" />,
  };

  const impactColors = {
    positive: 'border-l-green-500 bg-green-50 dark:bg-green-900/10',
    negative: 'border-l-red-500 bg-red-50 dark:bg-red-900/10',
    neutral: 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/10',
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);

    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border-l-4 ${impactColors[news.impact]} hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {impactIcons[news.impact]}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">
            {news.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {news.summary}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span className="font-medium">{news.source}</span>
            <span>{timeAgo(news.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
