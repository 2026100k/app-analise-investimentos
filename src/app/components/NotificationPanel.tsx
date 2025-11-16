'use client';

import { Bell, X } from 'lucide-react';
import { Notification } from '../types';
import { useState } from 'react';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClear: (id: string) => void;
}

export default function NotificationPanel({ notifications, onMarkAsRead, onClear }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeIcons = {
    alert: '⚠️',
    opportunity: '💡',
    warning: '🔔',
  };

  const typeColors = {
    alert: 'border-l-red-500 bg-red-50 dark:bg-red-900/20',
    opportunity: 'border-l-green-500 bg-green-50 dark:bg-green-900/20',
    warning: 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Notificações {unreadCount > 0 && `(${unreadCount})`}
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  Nenhuma notificação
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${typeColors[notification.type]} ${!notification.read ? 'font-medium' : 'opacity-75'}`}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{typeIcons[notification.type]}</span>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {notification.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(notification.timestamp).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClear(notification.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
