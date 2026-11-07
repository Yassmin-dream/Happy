import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Flame, 
  ArrowRight,
  ShieldAlert,
  Wind,
  BookOpen,
  Footprints,
  CheckSquare,
  Headphones,
  Clock
} from 'lucide-react';
import { AntiScrollSuggestion, ActivityCategory } from '../types';
import { CATEGORY_CONFIG, ANTI_SCROLL_SUGGESTIONS } from '../data/initialData';

interface AntiScrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteActivity: (title: string, category: ActivityCategory, durationMin: number) => void;
}

export const AntiScrollModal: React.FC<AntiScrollModalProps> = ({
  isOpen,
  onClose,
  onCompleteActivity,
}) => {
  const [suggestions, setSuggestions] = useState<AntiScrollSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<AntiScrollSuggestion | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [initialSeconds, setInitialSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Pick 3 random suggestions each time the modal opens
  useEffect(() => {
    if (isOpen) {
      const shuffled = [...ANTI_SCROLL_SUGGESTIONS].sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
      setSelectedSuggestion(null);
      setIsTimerRunning(false);
      setIsCompleted(false);
    }
  }, [isOpen]);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0 && selectedSuggestion) {
      setIsTimerRunning(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, selectedSuggestion]);

  if (!isOpen) return null;

  const startActivity = (suggestion: AntiScrollSuggestion) => {
    setSelectedSuggestion(suggestion);
    const secs = suggestion.durationMin * 60;
    setInitialSeconds(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
    setIsCompleted(false);
  };

  const handleFinishEarly = () => {
    if (selectedSuggestion) {
      const elapsedMin = Math.max(1, Math.round((initialSeconds - timerSeconds) / 60));
      onCompleteActivity(selectedSuggestion.title, selectedSuggestion.category, elapsedMin);
      setIsCompleted(true);
      setIsTimerRunning(false);
    }
  };

  const handleClaimReward = () => {
    if (selectedSuggestion) {
      onCompleteActivity(selectedSuggestion.title, selectedSuggestion.category, selectedSuggestion.durationMin);
      onClose();
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSuggestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const progressPercent = initialSeconds > 0 
    ? ((initialSeconds - timerSeconds) / initialSeconds) * 100 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-teal-100 dark:border-teal-900/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/5 border-b border-teal-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {selectedSuggestion ? 'Pause Anti-Scroll active' : 'Envie de scroller ?'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {selectedSuggestion ? 'Respire et savoure ce moment' : '3 alternatives apaisantes de 5 à 15 min'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {!selectedSuggestion ? (
            <>
              <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/40 rounded-2xl text-xs text-teal-800 dark:text-teal-200 leading-relaxed flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Ton cerveau cherche juste un boost de dopamine rapide. Offre-lui plutôt une vraie pause qui te fera du bien dans 15 minutes.
                </span>
              </div>

              <div className="space-y-3">
                {suggestions.map((sug) => {
                  const catConfig = CATEGORY_CONFIG[sug.category] || CATEGORY_CONFIG.bien_etre;
                  return (
                    <div
                      key={sug.id}
                      className="group p-4 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 hover:border-teal-300 dark:hover:border-teal-700 transition-all flex flex-col gap-2.5 cursor-pointer"
                      onClick={() => startActivity(sug)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-xl ${catConfig.bg} ${catConfig.text}`}>
                            {getSuggestionIcon(sug.icon)}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            {catConfig.label}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                          <Clock className="w-3 h-3" />
                          {sug.durationMin} min
                        </span>
                      </div>

                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                        {sug.title}
                      </h3>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {sug.description}
                      </p>

                      <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-between text-xs">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                          ✨ {sug.benefit}
                        </span>
                        <span className="text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Lancer <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : isCompleted ? (
            /* Completed Screen */
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Victoire sur l'algorithme ! 🎉
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mt-1">
                  Tu viens de consacrer du temps précieux à toi-même au lieu de scroller sans fin.
                </p>
              </div>

              <div className="w-full bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-xl font-bold text-teal-700 dark:text-teal-300">+50 XP</span>
                  <p className="text-[11px] text-zinc-500">Points gagnés</p>
                </div>
                <div className="w-px h-8 bg-teal-200 dark:bg-teal-800" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-orange-500">
                    <Flame className="w-5 h-5 fill-orange-500" /> +1
                  </div>
                  <p className="text-[11px] text-zinc-500">Série préservée</p>
                </div>
                <div className="w-px h-8 bg-teal-200 dark:bg-teal-800" />
                <div className="text-center">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedSuggestion.durationMin}m
                  </span>
                  <p className="text-[11px] text-zinc-500">Temps réinvesti</p>
                </div>
              </div>

              <button
                onClick={handleClaimReward}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-teal-500/25 transition active:scale-[0.98]"
              >
                Enregistrer l'activité dans mon journal
              </button>
            </div>
          ) : (
            /* Active Timer Screen */
            <div className="py-4 flex flex-col items-center text-center space-y-5">
              <div className="text-left w-full p-3.5 bg-zinc-50 dark:bg-zinc-800/70 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Activité en cours
                </span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {selectedSuggestion.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {selectedSuggestion.description}
                </p>
              </div>

              {/* Circular / Ring Progress Simulator */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    className="stroke-zinc-100 dark:stroke-zinc-800"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    className="stroke-teal-500 dark:stroke-teal-400 transition-all duration-500"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 84}
                    strokeDashoffset={2 * Math.PI * 84 * (1 - progressPercent / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                    {formatTime(timerSeconds)}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium mt-1">
                    {isTimerRunning ? 'Temps restant' : 'En pause'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-5 py-2.5 rounded-2xl font-medium text-sm flex items-center gap-2 shadow-md transition ${
                    isTimerRunning
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isTimerRunning ? 'Pause' : 'Reprendre'}
                </button>

                <button
                  onClick={handleFinishEarly}
                  className="px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  Terminer maintenant
                </button>

                <button
                  onClick={() => {
                    setSelectedSuggestion(null);
                    setIsTimerRunning(false);
                  }}
                  className="p-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  title="Changer d'activité"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
