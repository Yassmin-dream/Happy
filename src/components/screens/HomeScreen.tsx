import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ShieldAlert, 
  TrendingUp,
  Footprints,
  BookOpen,
  Droplets,
  PenTool,
  Heart
} from 'lucide-react';
import { Activity, UserStats, Goal } from '../../types';
import { CATEGORY_CONFIG, QUICK_ACTIVITIES, INSPIRATIONAL_QUOTES } from '../../data/initialData';

interface HomeScreenProps {
  stats: UserStats;
  todayActivities: Activity[];
  recentActivities: Activity[];
  goals: Goal[];
  onOpenAntiScroll: () => void;
  onOpenAddActivity: () => void;
  onQuickAdd: (title: string, category: any, durationMin: number) => void;
  onNavigateToActivities: () => void;
  onNavigateToStats: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stats,
  todayActivities,
  recentActivities,
  goals,
  onOpenAntiScroll,
  onOpenAddActivity,
  onQuickAdd,
  onNavigateToActivities,
  onNavigateToStats,
}) => {
  const quote = INSPIRATIONAL_QUOTES[0];
  const todayMinutes = todayActivities.reduce((acc, curr) => acc + curr.durationMin, 0);

  const getQuickIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Top Welcome Card with Gentle Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white p-5 shadow-lg shadow-teal-900/15">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-teal-200">
              Aujourd'hui dans Happy
            </span>
            <h1 className="text-xl font-bold mt-0.5 tracking-tight">
              Bonjour & bienvenue 🌿
            </h1>
            <p className="text-xs text-teal-100/90 mt-1 max-w-[240px]">
              {todayActivities.length > 0
                ? `${todayActivities.length} activités positives réalisées aujourd'hui !`
                : 'Prêt à remplacer quelques minutes d\'écran par du calme ?'}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-extrabold text-sm">{stats.streakCurrent} j</span>
            </div>
            <span className="text-[10px] text-teal-200/80 mt-1 font-medium">Série en cours</span>
          </div>
        </div>

        {/* Daily Stats Overview Pill Bar */}
        <div className="relative z-10 grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-white/15">
          <div className="text-center">
            <span className="text-base font-extrabold">{todayMinutes}m</span>
            <p className="text-[10px] text-teal-200">Temps actif</p>
          </div>
          <div className="text-center border-x border-white/15">
            <span className="text-base font-extrabold">{todayActivities.length}</span>
            <p className="text-[10px] text-teal-200">Activités</p>
          </div>
          <div className="text-center">
            <span className="text-base font-extrabold">Niv. {stats.level}</span>
            <p className="text-[10px] text-teal-200">{stats.totalPoints} pts</p>
          </div>
        </div>
      </div>

      {/* Prominent "J'ai envie de scroller" Emergency Action Button */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/15 to-teal-500/10 border-2 border-teal-500/30 dark:border-teal-500/40 relative overflow-hidden group">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  J'ai envie de scroller
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                  SOS
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Découvre 3 alternatives de 5 à 15 min & gagne +50 XP
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAntiScroll}
            className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shrink-0 shadow-md transition active:scale-95"
          >
            Lancer
          </button>
        </div>
      </div>

      {/* Inspirational Daily Quote */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-amber-900 dark:text-amber-200">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs italic leading-relaxed">
              « {quote.text} »
            </p>
            <p className="text-[10px] text-amber-700/80 dark:text-amber-400 font-semibold mt-1">
              — {quote.author}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Predefined 1-Click Activities */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Activités rapides en 1 clic
          </h2>
          <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
            Prédéfinies
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {QUICK_ACTIVITIES.map((qa, idx) => {
            const conf = CATEGORY_CONFIG[qa.category] || CATEGORY_CONFIG.bien_etre;
            return (
              <button
                key={idx}
                onClick={() => onQuickAdd(qa.title, qa.category, qa.durationMin)}
                className="p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 hover:border-teal-400 dark:hover:border-teal-600 transition-all text-left flex items-start gap-2.5 group shadow-xs active:scale-[0.98]"
              >
                <div className={`p-2 rounded-xl ${conf.bg} ${conf.text} shrink-0 group-hover:scale-110 transition-transform`}>
                  {getQuickIcon(qa.icon)}
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {qa.title}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {qa.durationMin} min • {conf.label.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Progress Goal Preview */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Objectif du jour
            </h3>
          </div>
          <button
            onClick={onNavigateToStats}
            className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-0.5 hover:underline"
          >
            Voir stats <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {goals.slice(0, 2).map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
          return (
            <div key={goal.id} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">{goal.title}</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {goal.currentValue} / {goal.targetValue} {goal.unit} ({pct}%)
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Dernières activités
          </h2>
          <button
            onClick={onNavigateToActivities}
            className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Tout l'historique
          </button>
        </div>

        <div className="space-y-2">
          {recentActivities.slice(0, 3).map((act) => {
            const conf = CATEGORY_CONFIG[act.category] || CATEGORY_CONFIG.bien_etre;
            return (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-3 h-8 rounded-full`} style={{ backgroundColor: conf.colorHex }} />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {act.title}
                    </h4>
                    <p className="text-[10px] text-zinc-400">
                      {conf.label} • {act.durationMin} min
                    </p>
                  </div>
                </div>

                {act.moodBefore && act.moodAfter && (
                  <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                    <span>{act.moodBefore}</span>
                    <span>→</span>
                    <span className="font-bold">{act.moodAfter}</span>
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
