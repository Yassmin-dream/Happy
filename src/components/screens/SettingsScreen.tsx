import React, { useState } from 'react';
import { 
  Cloud, 
  CloudCheck, 
  RefreshCw, 
  Bell, 
  Smartphone, 
  Download, 
  ShieldCheck, 
  LogOut, 
  FileSpreadsheet, 
  Check, 
  AlertCircle,
  FolderSync,
  HeartHandshake,
  Database
} from 'lucide-react';
import { GoogleDriveSyncState } from '../../types';

interface SettingsScreenProps {
  driveState: GoogleDriveSyncState;
  onConnectDrive: () => void;
  onDisconnectDrive: () => void;
  onSyncDrive: () => void;
  onToggleAutoSync: () => void;
  onExportReport: (format: 'csv' | 'json') => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  driveState,
  onConnectDrive,
  onDisconnectDrive,
  onSyncDrive,
  onToggleAutoSync,
  onExportReport,
}) => {
  const [notifyMorning, setNotifyMorning] = useState(true);
  const [notifyEvening, setNotifyEvening] = useState(true);
  const [morningTime, setMorningTime] = useState('09:30');
  const [eveningTime, setEveningTime] = useState('20:45');
  const [usageStatsEnabled, setUsageStatsEnabled] = useState(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExport = (format: 'csv' | 'json') => {
    onExportReport(format);
    setExportNotice(`Rapport exporté avec succès vers Google Drive / [Happy] Rapports / export_${new Date().toISOString().slice(0, 10)}.${format}`);
    setTimeout(() => setExportNotice(null), 4500);
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Paramètres & Synchronisation
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Sauvegarde Google Drive, notifications douces et confidentialité
        </p>
      </div>

      {/* Google Drive Integration Hub (Card centrale) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-teal-500/5 border border-teal-200 dark:border-teal-800/70 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-sm border border-teal-100 dark:border-teal-800">
              <Cloud className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Google Drive Backup
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                  Scope drive.appdata
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {driveState.isConnected
                  ? `Connecté en tant que ${driveState.userEmail}`
                  : 'Sauvegarde privée dans le dossier sécurisé de l\'app'}
              </p>
            </div>
          </div>
        </div>

        {/* Sync Status Info */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <FolderSync className="w-4 h-4 text-teal-600" />
              Dernière synchronisation :
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
              {driveState.lastSyncTime || 'Aucune (première synchro requise)'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-600" />
              Stockage local Room :
            </span>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
              Offline-first garanti 🛡️
            </span>
          </div>
        </div>

        {/* Actions buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {driveState.isConnected ? (
            <>
              <button
                onClick={onSyncDrive}
                disabled={driveState.isSyncing}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${driveState.isSyncing ? 'animate-spin' : ''}`} />
                {driveState.isSyncing ? 'Synchronisation en cours...' : 'Synchroniser maintenant'}
              </button>

              <button
                onClick={onDisconnectDrive}
                className="py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center gap-1"
                title="Déconnecter Google"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={onConnectDrive}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <Cloud className="w-4 h-4" />
              Connecter mon compte Google Drive
            </button>
          )}
        </div>

        {/* Auto Sync Toggle (WorkManager 1x/jour sur Wi-Fi) */}
        <div className="pt-2 border-t border-teal-200/60 dark:border-teal-800/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
              Synchronisation automatique
            </span>
            <span className="text-[11px] text-zinc-500">
              Via WorkManager (1x/jour, en Wi-Fi et charge)
            </span>
          </div>

          <button
            onClick={onToggleAutoSync}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              driveState.autoSyncEnabled ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                driveState.autoSyncEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Export Monthly Report */}
        <div className="pt-2 border-t border-teal-200/60 dark:border-teal-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Exporter un rapport mensuel
              </span>
              <span className="text-[11px] text-zinc-500">
                Dossier Drive : "[Happy] Rapports"
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('csv')}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                JSON
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-800 dark:text-emerald-200 text-[11px] flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{exportNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Bienveillantes */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Rappels bienveillants (jamais culpabilisants)
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
                Rappel du matin : intention positive
              </span>
              <span className="text-[11px] text-zinc-400">
                « Un petit moment rien que pour toi aujourd'hui ? »
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={morningTime}
                onChange={(e) => setMorningTime(e.target.value)}
                className="px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs bg-transparent font-mono"
              />
              <input
                type="checkbox"
                checked={notifyMorning}
                onChange={(e) => setNotifyMorning(e.target.checked)}
                className="rounded accent-teal-600 w-4 h-4"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-700/60 pt-3">
            <div>
              <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
                Rappel du soir : déconnexion apaisée
              </span>
              <span className="text-[11px] text-zinc-400">
                « Pose l'écran, offre du repos à tes yeux. »
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
                className="px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs bg-transparent font-mono"
              />
              <input
                type="checkbox"
                checked={notifyEvening}
                onChange={(e) => setNotifyEvening(e.target.checked)}
                className="rounded accent-teal-600 w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Screen Time Authorization (UsageStatsManager) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Suivi du temps de scroll (UsageStatsManager)
            </h3>
          </div>
          <input
            type="checkbox"
            checked={usageStatsEnabled}
            onChange={(e) => setUsageStatsEnabled(e.target.checked)}
            className="rounded accent-teal-600 w-4 h-4"
          />
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Permet de comparer en local le temps passé sur TikTok, Instagram ou Twitter avec tes activités positives. Aucune donnée ne quitte ton appareil sans ton consentement.
        </p>
      </div>

      {/* Privacy and Architecture Notice */}
      <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/60 flex items-start gap-2.5 text-xs text-zinc-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-zinc-700 dark:text-zinc-300 block">
            Engagement 100% Vie Privée & Hors-Ligne
          </strong>
          Toutes tes données sont stockées dans la base SQLite Room de ton smartphone. La synchronisation Google Drive se fait directement entre ton appareil et ton propre compte Google, sans aucun serveur intermédiaire tiers.
        </div>
      </div>
    </div>
  );
};
