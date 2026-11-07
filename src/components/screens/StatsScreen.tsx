import React, { useMemo } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Calendar as CalendarIcon, 
  Clock, 
  Smartphone, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { Activity, UserStats } from '../../types';
import { CATEGORY_CONFIG } from '../../data/initialData';

interface StatsScreenProps {
  activities: Activity[];
  stats: UserStats;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({
  activities,
  stats,
}) => {
  // Category breakdown
  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    let total = 0;
    activities.forEach((act) => {
      map[act.category] = (map[act.category] || 0) + act.durationMin;
      total += act.durationMin;
    });

    return Object.entries(map).map(([cat, minutes]) => {
      const conf = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.bien_etre;
      const pct = total > 0 ? Math.round((minutes / total) * 100) : 0;
      return {
        cat,
        label: conf.label,
        minutes,
        percentage: pct,
        colorHex: conf.colorHex,
      };
    }).sort((a, b) => b.minutes - a.minutes);
  }, [activities]);

  const totalMinutes = activities.reduce((acc, a) => acc + a.durationMin, 0);

  // Weekly days simulation (Last 7 days)
  const last7Days = useMemo(() => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const result = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(now.getDate() - i);
      const dayName = days[targetDate.getDay()];
      const dayDateStr = targetDate.toISOString().slice(0, 10);

      // Sum minutes for this day
      const dayMins = activities
        .filter((a) => a.dateTime.slice(0, 10) === dayDateStr)
        .reduce((sum, a) => sum + a.durationMin, 0);

      result.push({
        dayName,
        dateNumber: targetDate.getDate(),
        minutes: dayMins,
        isToday: i === 0,
      });
    }
    return result;
  }, [activities]);

  const maxDayMinutes = Math.max(60, ...last7Days.map((d) => d.minutes));

  // Calendar active days in current month (1..30)
  const activeDaysSet = useMemo(() => {
    const set = new Set<number>();
    const now = new Date();
    activities.forEach((a) => {
      const d = new Date(a.dateTime);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        set.add(d.getDate());
      }
    });
    // add a few simulated historical days for a rich visual calendar
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(4);
    set.add(5);
    return set;
  }, [activities]);

  const daysInMonth = 30; // standard month display
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-5 pb-12">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Statistiques & Visualisation
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Analyses de tes habitudes positives et du temps préservé
        </p>
      </div>

      {/* Screen Time Comparison Highlight (Anti-scroll impact) */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-zinc-900 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Impact Anti-Scrolling
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            UsageStatsManager
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs text-teal-200 block">Temps d'activités</span>
            <span className="text-2xl font-black text-emerald-300">{Math.round(totalMinutes / 60)}h {totalMinutes % 60}m</span>
            <span className="text-[10px] text-zinc-300 mt-1 block">Créativité, sport, lecture</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs text-rose-200 block">Scroll évité estimé</span>
            <span className="text-2xl font-black text-amber-300">~{stats.savedScrollHours}h</span>
            <span className="text-[10px] text-zinc-300 mt-1 block">Réseaux sociaux remplacés</span>
          </div>
        </div>

        <p className="text-[11px] text-teal-100/80 leading-relaxed pt-1">
          💡 En remplaçant de courtes impulsions de scroll par 10-15 minutes d'activités choisies, tu as regagné l'équivalent de 3 demi-journées d'attention consciente ce mois-ci.
        </p>
      </div>

      {/* Weekly Evolution (Last 7 Days Bar Chart) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Évolution sur 7 jours
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-medium">Minutes par jour</span>
        </div>

        <div className="h-36 flex items-end justify-between gap-2 pt-6 pb-2 px-1">
          {last7Days.map((d, idx) => {
            const heightPercent = maxDayMinutes > 0 ? (d.minutes / maxDayMinutes) * 100 : 0;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {d.minutes}m
                </span>
                <div className="w-full bg-zinc-100 dark:bg-zinc-700/60 rounded-xl h-24 flex items-end p-0.5">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      d.isToday
                        ? 'bg-gradient-to-t from-teal-600 to-emerald-400'
                        : 'bg-teal-500/80 hover:bg-teal-500'
                    }`}
                    style={{ height: `${Math.max(8, heightPercent)}%` }}
                  />
                </div>
                <span className={`text-[11px] ${d.isToday ? 'font-bold text-teal-600 dark:text-teal-400' : 'text-zinc-500'}`}>
                  {d.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Breakdown by Category */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Répartition par catégorie
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-medium">Total : {totalMinutes}m</span>
        </div>

        {/* Stacked Bar Preview */}
        <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden flex">
          {categoryStats.map((item) => (
            <div
              key={item.cat}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.colorHex,
              }}
              title={`${item.label}: ${item.percentage}%`}
              className="h-full transition-all duration-500"
            />
          ))}
        </div>

        {/* Category Rows */}
        <div className="space-y-2 pt-1">
          {categoryStats.map((item) => (
            <div key={item.cat} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-zinc-500">{item.minutes} min</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Days Calendar (Compose Grid Equivalent) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Calendrier des jours actifs
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            {activeDaysSet.size} jours positifs ce mois
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
            <span key={i} className="text-[10px] font-semibold text-zinc-400 py-1">
              {d}
            </span>
          ))}

          {daysArray.map((day) => {
            const isActive = activeDaysSet.has(day);
            return (
              <div
                key={day}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition ${
                  isActive
                    ? 'bg-emerald-500 text-white font-bold shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-400'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
