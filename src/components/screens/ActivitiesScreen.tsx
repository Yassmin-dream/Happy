import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Smile, 
  FileText, 
  Trash2, 
  Edit3,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Activity, ActivityCategory } from '../../types';
import { CATEGORY_CONFIG } from '../../data/initialData';

interface ActivitiesScreenProps {
  activities: Activity[];
  onOpenAddModal: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

type PeriodFilter = 'all' | 'today' | 'week' | 'month';

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  activities,
  onOpenAddModal,
  onEditActivity,
  onDeleteActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('all');

  // Filter logic
  const filteredActivities = useMemo(() => {
    const now = new Date();
    return activities.filter((act) => {
      // Search
      const matchesSearch = 
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.note && act.note.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      // Category
      if (selectedCategory !== 'all' && act.category !== selectedCategory) {
        return false;
      }

      // Period
      const actDate = new Date(act.dateTime);
      if (selectedPeriod === 'today') {
        const isToday = 
          actDate.getDate() === now.getDate() &&
          actDate.getMonth() === now.getMonth() &&
          actDate.getFullYear() === now.getFullYear();
        if (!isToday) return false;
      } else if (selectedPeriod === 'week') {
        const diffDays = (now.getTime() - actDate.getTime()) / (1000 * 3600 * 24);
        if (diffDays > 7) return false;
      } else if (selectedPeriod === 'month') {
        const diffDays = (now.getTime() - actDate.getTime()) / (1000 * 3600 * 24);
        if (diffDays > 30) return false;
      }

      return true;
    }).sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }, [activities, searchQuery, selectedCategory, selectedPeriod]);

  const totalFilteredMinutes = filteredActivities.reduce((acc, a) => acc + a.durationMin, 0);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Historique des activités
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {filteredActivities.length} entrée(s) • {totalFilteredMinutes} minutes cumulées
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-3.5 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-teal-600/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Rechercher par mot-clé, titre, note..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
      </div>

      {/* Period Filter Tabs */}
      <div className="flex gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-xs">
        {[
          { key: 'all', label: 'Tout' },
          { key: 'today', label: 'Aujourd\'hui' },
          { key: 'week', label: '7 jours' },
          { key: 'month', label: '30 jours' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedPeriod(tab.key as PeriodFilter)}
            className={`flex-1 py-1.5 rounded-xl font-medium transition text-center ${
              selectedPeriod === tab.key
                ? 'bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 border transition ${
            selectedCategory === 'all'
              ? 'bg-teal-600 text-white border-teal-600'
              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'
          }`}
        >
          Toutes catégories
        </button>

        {(Object.keys(CATEGORY_CONFIG) as ActivityCategory[]).map((cat) => {
          const conf = CATEGORY_CONFIG[cat];
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 border transition flex items-center gap-1.5 ${
                isSelected
                  ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 font-semibold'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: conf.colorHex }} />
              {conf.label.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Activities List */}
      {filteredActivities.length === 0 ? (
        <div className="py-12 text-center space-y-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-700">
          <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Aucune activité trouvée
            </h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
              {searchQuery
                ? 'Modifie tes critères de recherche ou réinitialise les filtres.'
                : 'Commence dès maintenant en ajoutant une pause positive !'}
            </p>
          </div>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Nouvelle activité
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map((act) => {
            const conf = CATEGORY_CONFIG[act.category] || CATEGORY_CONFIG.bien_etre;
            return (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-xs space-y-3 hover:border-teal-300 dark:hover:border-teal-700/70 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: conf.colorHex }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {act.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span className={`px-2 py-0.5 rounded-lg ${conf.bg} ${conf.text} font-medium`}>
                          {conf.label}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {act.durationMin} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(act.dateTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onEditActivity(act)}
                      className="p-1.5 text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteActivity(act.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mood Before / After banner if present */}
                {act.moodBefore && act.moodAfter && (
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      Humeur :
                    </span>
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Avant {act.moodBefore}/5
                      </span>
                      <span className="text-zinc-400">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Après {act.moodAfter}/5
                      </span>
                      {act.moodAfter > act.moodBefore && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                          +{act.moodAfter - act.moodBefore} ✨
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Note */}
                {act.note && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-amber-50/40 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-100/70 dark:border-amber-900/40">
                    « {act.note} »
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
