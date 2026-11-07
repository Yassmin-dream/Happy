/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  FolderTree, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  CloudCheck,
  Heart,
  Share2
} from 'lucide-react';
import { Activity, ActivityCategory, Badge, Goal, GoogleDriveSyncState, UserStats } from './types';
import { 
  INITIAL_ACTIVITIES, 
  INITIAL_BADGES, 
  INITIAL_GOALS, 
  CATEGORY_CONFIG 
} from './data/initialData';
import { AndroidFrame, TabKey } from './components/AndroidFrame';
import { HomeScreen } from './components/screens/HomeScreen';
import { ActivitiesScreen } from './components/screens/ActivitiesScreen';
import { StatsScreen } from './components/screens/StatsScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AntiScrollModal } from './components/AntiScrollModal';
import { AddActivityModal } from './components/AddActivityModal';
import { AndroidCodeExplorer } from './components/AndroidCodeExplorer';

export default function App() {
  // Navigation mode: Live Mobile Simulator vs Android Studio Code Explorer
  const [activeView, setActiveView] = useState<'simulator' | 'code'>('simulator');
  
  // Mobile app current tab
  const [currentTab, setCurrentTab] = useState<TabKey>('home');

  // Application Data States
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [stats, setStats] = useState<UserStats>({
    streakCurrent: 5,
    streakBest: 8,
    totalPoints: 340,
    level: 3,
    totalMinutes: 165,
    savedScrollHours: 9.5,
  });

  // Google Drive state
  const [driveState, setDriveState] = useState<GoogleDriveSyncState>({
    isConnected: true,
    userEmail: 'utilisateur@gmail.com',
    lastSyncTime: 'Aujourd\'hui à 08:30',
    isSyncing: false,
    autoSyncEnabled: true,
    driveFolder: 'drive.appdata (privé)',
    syncStatus: 'idle',
  });

  // Modals
  const [isAntiScrollOpen, setIsAntiScrollOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add or update activity
  const handleSaveActivity = (
    data: Omit<Activity, 'id'>, 
    existingId?: string
  ) => {
    if (existingId) {
      setActivities((prev) =>
        prev.map((act) => (act.id === existingId ? { ...data, id: existingId } : act))
      );
      showToast('Activité modifiée avec succès ✨');
    } else {
      const newActivity: Activity = {
        ...data,
        id: `act-${Date.now()}`,
      };
      setActivities((prev) => [newActivity, ...prev]);

      // Calculate points & streaks
      const earnedPoints = Math.round(data.durationMin * 1.5) + (data.moodAfter && data.moodBefore ? (data.moodAfter - data.moodBefore) * 5 : 10);
      setStats((prev) => {
        const newTotal = prev.totalPoints + earnedPoints;
        const newLevel = Math.floor(newTotal / 200) + 1;
        return {
          ...prev,
          totalPoints: newTotal,
          level: newLevel,
          totalMinutes: prev.totalMinutes + data.durationMin,
          savedScrollHours: Number((prev.savedScrollHours + data.durationMin / 60).toFixed(1)),
        };
      });

      // Update goal progress
      setGoals((prev) =>
        prev.map((g) => {
          if (g.type === 'daily_active_time') {
            return { ...g, currentValue: g.currentValue + data.durationMin };
          }
          return g;
        })
      );

      showToast(`+${earnedPoints} points gagnés ! Super initiative 🌿`);
    }
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    showToast('Activité supprimée');
  };

  // Quick 1-click addition
  const handleQuickAdd = (title: string, category: ActivityCategory, durationMin: number) => {
    handleSaveActivity({
      title,
      category,
      durationMin,
      dateTime: new Date().toISOString(),
      moodBefore: 2,
      moodAfter: 4,
    });
  };

  // Anti-scroll completed
  const handleCompleteAntiScroll = (
    title: string, 
    category: ActivityCategory, 
    durationMin: number
  ) => {
    handleSaveActivity({
      title: `[Anti-Scroll] ${title}`,
      category,
      durationMin,
      dateTime: new Date().toISOString(),
      moodBefore: 2,
      moodAfter: 5,
      note: 'Session lancée depuis le bouton d\'intervention d\'urgence.',
    });

    // Check anti-scroll badge unlock
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === 'b-2') {
          return { ...b, unlockedAt: new Date().toISOString(), progress: 5 };
        }
        return b;
      })
    );

    showToast('Mission anti-scroll accomplie ! +50 XP et boost de sérénité 🛡️');
  };

  // Drive sync simulation
  const handleSyncDrive = () => {
    setDriveState((prev) => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      setDriveState((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: 'À l\'instant',
        syncStatus: 'success',
      }));
      showToast('Données synchronisées avec Google Drive (drive.appdata) ☁️');
    }, 1200);
  };

  const handleConnectDrive = () => {
    setDriveState((prev) => ({
      ...prev,
      isConnected: true,
      userEmail: 'utilisateur@gmail.com',
      lastSyncTime: 'À l\'instant',
    }));
    showToast('Compte Google connecté avec succès');
  };

  const handleDisconnectDrive = () => {
    setDriveState((prev) => ({
      ...prev,
      isConnected: false,
      userEmail: null,
      lastSyncTime: null,
    }));
    showToast('Compte Google déconnecté');
  };

  const handleToggleAutoSync = () => {
    setDriveState((prev) => {
      const next = !prev.autoSyncEnabled;
      showToast(next ? 'WorkManager : Synchro automatique activée (Wi-Fi)' : 'Synchro automatique désactivée');
      return { ...prev, autoSyncEnabled: next };
    });
  };

  const handleExportReport = (format: 'csv' | 'json') => {
    showToast(`Rapport exporté au format .${format.toUpperCase()}`);
  };

  const handleUpdateGoal = (goalId: string, targetValue: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, targetValue } : g))
    );
    showToast('Objectif mis à jour !');
  };

  // Filter activities done today
  const todayActivities = activities.filter((a) => {
    const actDate = new Date(a.dateTime);
    const now = new Date();
    return (
      actDate.getDate() === now.getDate() &&
      actDate.getMonth() === now.getMonth() &&
      actDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-zinc-100 to-emerald-50/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-teal-950/20 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-teal-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-teal-600/25">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
                  Happy
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Anti-Scrolling & Habitudes
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 hidden sm:block">
                Jetpack Compose + Material 3 + Room + Google Drive
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                activeView === 'simulator'
                  ? 'bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulateur Android</span>
            </button>

            <button
              onClick={() => setActiveView('code')}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                activeView === 'code'
                  ? 'bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Arborescence & Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'simulator' ? (
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
            {/* Left Explanation & Quick Guide */}
            <div className="w-full lg:w-80 space-y-4 order-2 lg:order-1">
              <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  Guide du prototype interactif
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Ce simulateur reproduit fidèlement l'interface <strong>Jetpack Compose</strong> de l'application Happy telle qu'elle apparaîtra sur ton smartphone Android.
                </p>
                <div className="space-y-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40 text-teal-900 dark:text-teal-200">
                    🛡️ <strong>Bouton Anti-Scroll :</strong> Clique sur "Anti-Scroll" pour tester le minuteur et les 3 suggestions aléatoires.
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300">
                    📊 <strong>Suivi de l'humeur :</strong> Ajoute une activité pour mesurer le différentiel émotionnel avant/après.
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
                    ☁️ <strong>Google Drive :</strong> Va dans Réglages pour tester la synchronisation JSON et l'export CSV.
                  </div>
                </div>
              </div>

              {/* Status summary pill */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-200 dark:border-teal-800/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Série active</span>
                  <span className="text-zinc-500">{stats.streakCurrent} jours d'affilée</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Flame className="w-5 h-5 fill-amber-500" />
                  <span>{stats.totalPoints} XP</span>
                </div>
              </div>
            </div>

            {/* Android Device Mockup */}
            <div className="order-1 lg:order-2 shrink-0">
              <AndroidFrame
                currentTab={currentTab}
                onSelectTab={setCurrentTab}
                onOpenAntiScroll={() => setIsAntiScrollOpen(true)}
              >
                {currentTab === 'home' && (
                  <HomeScreen
                    stats={stats}
                    todayActivities={todayActivities}
                    recentActivities={activities}
                    goals={goals}
                    onOpenAntiScroll={() => setIsAntiScrollOpen(true)}
                    onOpenAddActivity={() => {
                      setEditingActivity(null);
                      setIsAddModalOpen(true);
                    }}
                    onQuickAdd={handleQuickAdd}
                    onNavigateToActivities={() => setCurrentTab('activities')}
                    onNavigateToStats={() => setCurrentTab('stats')}
                  />
                )}

                {currentTab === 'activities' && (
                  <ActivitiesScreen
                    activities={activities}
                    onOpenAddModal={() => {
                      setEditingActivity(null);
                      setIsAddModalOpen(true);
                    }}
                    onEditActivity={(act) => {
                      setEditingActivity(act);
                      setIsAddModalOpen(true);
                    }}
                    onDeleteActivity={handleDeleteActivity}
                  />
                )}

                {currentTab === 'stats' && (
                  <StatsScreen activities={activities} stats={stats} />
                )}

                {currentTab === 'rewards' && (
                  <RewardsScreen
                    stats={stats}
                    badges={badges}
                    goals={goals}
                    onUpdateGoal={handleUpdateGoal}
                  />
                )}

                {currentTab === 'settings' && (
                  <SettingsScreen
                    driveState={driveState}
                    onConnectDrive={handleConnectDrive}
                    onDisconnectDrive={handleDisconnectDrive}
                    onSyncDrive={handleSyncDrive}
                    onToggleAutoSync={handleToggleAutoSync}
                    onExportReport={handleExportReport}
                  />
                )}
              </AndroidFrame>
            </div>
          </div>
        ) : (
          /* Android Studio Code & Architecture Explorer */
          <AndroidCodeExplorer />
        )}
      </main>

      {/* Anti-Scroll Emergency SOS Modal */}
      <AntiScrollModal
        isOpen={isAntiScrollOpen}
        onClose={() => setIsAntiScrollOpen(false)}
        onCompleteActivity={handleCompleteAntiScroll}
      />

      {/* Add / Edit Activity Modal */}
      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
        initialActivity={editingActivity}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold shadow-xl border border-zinc-700 dark:border-zinc-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 dark:text-teal-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
