import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, FileText, Smile, Sparkles, Trash2 } from 'lucide-react';
import { Activity, ActivityCategory } from '../types';
import { CATEGORY_CONFIG } from '../data/initialData';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>, existingId?: string) => void;
  onDelete?: (id: string) => void;
  initialActivity?: Activity | null;
}

const MOOD_EMOJIS: Record<number, { emoji: string; label: string }> = {
  1: { emoji: '😫', label: 'Épuisé / Tendu' },
  2: { emoji: '🙁', label: 'Bof / Distrait' },
  3: { emoji: '😐', label: 'Neutre' },
  4: { emoji: '🙂', label: 'Bien / Apaisé' },
  5: { emoji: '✨', label: 'Radieux / Énergisé' },
};

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialActivity,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('bien_etre');
  const [durationMin, setDurationMin] = useState(15);
  const [dateTime, setDateTime] = useState('');
  const [note, setNote] = useState('');
  const [moodBefore, setMoodBefore] = useState<number>(2);
  const [moodAfter, setMoodAfter] = useState<number>(4);

  useEffect(() => {
    if (initialActivity) {
      setTitle(initialActivity.title);
      setCategory(initialActivity.category);
      setDurationMin(initialActivity.durationMin);
      setDateTime(initialActivity.dateTime.slice(0, 16));
      setNote(initialActivity.note || '');
      setMoodBefore(initialActivity.moodBefore || 3);
      setMoodAfter(initialActivity.moodAfter || 4);
    } else {
      setTitle('');
      setCategory('bien_etre');
      setDurationMin(15);
      // default to now (YYYY-MM-DDTHH:mm)
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setDateTime(now.toISOString().slice(0, 16));
      setNote('');
      setMoodBefore(2);
      setMoodAfter(4);
    }
  }, [initialActivity, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave(
      {
        title: title.trim(),
        category,
        durationMin: Number(durationMin),
        dateTime: new Date(dateTime).toISOString(),
        note: note.trim() || undefined,
        moodBefore,
        moodAfter,
      },
      initialActivity ? initialActivity.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {initialActivity ? 'Modifier l\'activité' : 'Nouvelle activité positive'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Titre de l'activité *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Marche au parc, 10 pages de roman, Yoga..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Catégories */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Catégorie
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(CATEGORY_CONFIG) as ActivityCategory[]).map((catKey) => {
                const conf = CATEGORY_CONFIG[catKey];
                const isSelected = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCategory(catKey)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition flex items-center gap-2 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 ring-1 ring-teal-500'
                        : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: conf.colorHex }} />
                    <span className="truncate">{conf.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Durée et Date/Heure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Durée (minutes)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="480"
                  value={durationMin}
                  onChange={(e) => setDurationMin(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <div className="flex gap-1 shrink-0">
                  {[10, 15, 30].map((quick) => (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => setDurationMin(quick)}
                      className="px-2 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {quick}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                Date & Heure
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>

          {/* Évaluation de l'humeur Avant / Après */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Impact sur mon humeur (1 à 5)
            </span>

            {/* Humeur avant */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <span>Humeur AVANT l'activité :</span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {MOOD_EMOJIS[moodBefore].emoji} {MOOD_EMOJIS[moodBefore].label}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMoodBefore(lvl)}
                    className={`flex-1 py-1.5 rounded-xl border text-sm transition ${
                      moodBefore === lvl
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 scale-105 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {MOOD_EMOJIS[lvl].emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Humeur après */}
            <div>
              <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <span>Humeur APRÈS l'activité :</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {MOOD_EMOJIS[moodAfter].emoji} {MOOD_EMOJIS[moodAfter].label}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMoodAfter(lvl)}
                    className={`flex-1 py-1.5 rounded-xl border text-sm transition ${
                      moodAfter === lvl
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 scale-105 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {MOOD_EMOJIS[lvl].emoji}
                  </button>
                ))}
              </div>
            </div>

            {moodAfter > moodBefore && (
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium text-center">
                ✨ +{moodAfter - moodBefore} points de bien-être gagnés grâce à cette pause !
              </div>
            )}
          </div>

          {/* Note facultative */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              Note ou ressenti (facultatif)
            </label>
            <textarea
              rows={2}
              placeholder="Ce qui t'a plu, tes pensées apaisées..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            {initialActivity && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(initialActivity.id);
                  onClose();
                }}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Supprimer
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md shadow-teal-500/20 transition active:scale-95"
              >
                {initialActivity ? 'Enregistrer les modifications' : 'Ajouter l\'activité'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
