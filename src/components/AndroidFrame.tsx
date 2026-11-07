import React from 'react';
import { 
  Home, 
  ListTodo, 
  BarChart3, 
  Award, 
  Settings, 
  Wifi, 
  Battery, 
  ShieldAlert 
} from 'lucide-react';

export type TabKey = 'home' | 'activities' | 'stats' | 'rewards' | 'settings';

interface AndroidFrameProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenAntiScroll: () => void;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  currentTab,
  onSelectTab,
  onOpenAntiScroll,
  children,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-[44px] shadow-2xl border-[10px] border-zinc-800 dark:border-zinc-700 overflow-hidden flex flex-col h-[820px] relative">
      {/* Top Android Dynamic Island / Camera & Status Bar */}
      <div className="pt-2 px-6 pb-2 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-zinc-900 dark:text-zinc-100 text-xs font-semibold select-none shrink-0 z-20">
        <span>09:41</span>
        <div className="w-20 h-4 bg-zinc-800 dark:bg-zinc-700 rounded-full" />
        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Main Screen Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 scrollbar-thin">
        {children}
      </div>

      {/* Floating Action Button for Emergency Anti-Scroll */}
      <div className="absolute bottom-[72px] right-4 z-30">
        <button
          onClick={onOpenAntiScroll}
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-xl shadow-teal-600/35 hover:scale-105 active:scale-95 transition-all"
        >
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span>Anti-Scroll</span>
        </button>
      </div>

      {/* Android Material 3 Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around px-2 z-20">
        {[
          { key: 'home', label: 'Accueil', icon: Home },
          { key: 'activities', label: 'Activités', icon: ListTodo },
          { key: 'stats', label: 'Stats', icon: BarChart3 },
          { key: 'rewards', label: 'Trophées', icon: Award },
          { key: 'settings', label: 'Réglages', icon: Settings },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key as TabKey)}
              className="flex flex-col items-center justify-center flex-1 py-1 gap-1 group transition"
            >
              <div
                className={`px-3.5 py-1 rounded-full transition ${
                  isActive
                    ? 'bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                    : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight ${
                  isActive
                    ? 'font-bold text-teal-800 dark:text-teal-300'
                    : 'text-zinc-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Android Gestures Navigation Bar Line */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full pointer-events-none z-30" />
    </div>
  );
};
