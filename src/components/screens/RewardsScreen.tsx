import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  Trophy, 
  Target, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Footprints,
  BookMarked,
  CloudCheck,
  Plus,
  Zap
} from 'lucide-react';
import { Badge, Goal, UserStats } from '../../types';

interface RewardsScreenProps {
  stats: UserStats;
  badges: Badge[];
  goals: Goal[];
  onUpdateGoal: (goalId: string, targetValue: number) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  stats,
  badges,
  goals,
  onUpdateGoal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const pointsForNextLevel = stats.level * 200;
  const currentLevelProgress = (stats.totalPoints % 200);
  const levelPercent = Math.min(100, Math.round((currentLevelProgress / 200) * 100));

  const filteredBadges = badges.filter((b) => {
    if (selectedFilter === 'unlocked') return b.unlockedAt !== null;
    if (selectedFilter === 'locked') return b.unlockedAt === null;
    return true;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'BookMarked': return <BookMarked className="w-5 h-5" />;
      case 'CloudCheck': return <CloudCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSaveGoal = (goalId: string) => {
    if (editValue > 0) {
      onUpdateGoal(goalId, editValue);
    }
    setEditingGoalId(null);
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Récompenses & Motivation
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Célèbre chaque minute préservée et chaque niveau franchi
        </p>
      </div>

      {/* Level & Points Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-teal-500/10 to-emerald-500/10 border border-teal-200 dark:border-teal-800/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-teal-500/20">
              {stats.level}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Progression du joueur
              </span>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Explorateur de Sérénité
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-black text-teal-700 dark:text-teal-300">
              {stats.totalPoints} pts
            </span>
            <p className="text-[10px] text-zinc-400">+{stats.level * 10} pts / activité</p>
          </div>
        </div>

        {/* Progress Bar to Next Level */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Niveau {stats.level}</span>
            <span className="font-semibold text-teal-700 dark:text-teal-300">
              {currentLevelProgress} / 200 XP vers Niv. {stats.level + 1}
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streaks Card */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Série actuelle</span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
              {stats.streakCurrent}
            </span>
            <span className="text-xs text-zinc-400 ml-1">jours consécutifs</span>
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            🔥 Actif aujourd'hui !
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Meilleure série</span>
            <Trophy className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
              {stats.streakBest}
            </span>
            <span className="text-xs text-zinc-400 ml-1">jours record</span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-1">
            Objectif : 14 jours d'affilée
          </p>
        </div>
      </div>

      {/* Customizable Goals Section */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Objectifs personnalisables
            </h3>
          </div>
          <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
            Ajustables en 1 clic
          </span>
        </div>

        <div className="space-y-2.5">
          {goals.map((g) => {
            const isEditing = editingGoalId === g.id;
            const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
            return (
              <div
                key={g.id}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {g.title}
                  </span>
                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-0.5 rounded border border-teal-500 bg-white dark:bg-zinc-700 text-xs text-right font-mono"
                      />
                      <span className="text-[11px] text-zinc-400">{g.unit}</span>
                      <button
                        onClick={() => handleSaveGoal(g.id)}
                        className="px-2 py-0.5 rounded bg-teal-600 text-white text-[10px] font-bold"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingGoalId(g.id);
                        setEditValue(g.targetValue);
                      }}
                      className="text-teal-600 dark:text-teal-400 hover:underline font-mono text-[11px]"
                    >
                      Cible : {g.targetValue} {g.unit} ✏️
                    </button>
                  )}
                </div>

                <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Actuel : {g.currentValue} {g.unit}</span>
                  <span>{pct}% accompli</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Trophées & Badges ({badges.filter((b) => b.unlockedAt).length}/{badges.length})
            </h3>
          </div>

          <div className="flex gap-1 text-[11px]">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2 py-0.5 rounded-lg ${selectedFilter === 'all' ? 'bg-zinc-200 dark:bg-zinc-700 font-bold' : 'text-zinc-400'}`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedFilter('unlocked')}
              className={`px-2 py-0.5 rounded-lg ${selectedFilter === 'unlocked' ? 'bg-zinc-200 dark:bg-zinc-700 font-bold' : 'text-zinc-400'}`}
            >
              Débloqués
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredBadges.map((b) => {
            const isUnlocked = b.unlockedAt !== null;
            const pct = Math.min(100, Math.round((b.progress / b.maxProgress) * 100));
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-white dark:bg-zinc-800/80 border-teal-200 dark:border-teal-800/60 shadow-xs'
                    : 'bg-zinc-50/70 dark:bg-zinc-800/30 border-zinc-200/60 dark:border-zinc-700/40 opacity-75'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                  }`}
                >
                  {isUnlocked ? getBadgeIcon(b.iconName) : <Lock className="w-4 h-4" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {b.name}
                    </h4>
                    {isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                    {b.description}
                  </p>

                  {!isUnlocked && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                        <span>Progression</span>
                        <span>{b.progress} / {b.maxProgress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
