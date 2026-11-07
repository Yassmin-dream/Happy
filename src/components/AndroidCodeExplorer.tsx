import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Code2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Cpu,
  Database,
  Cloud,
  Bell,
  Sparkles
} from 'lucide-react';
import { ANDROID_PROJECT_TREE } from '../data/initialData';
import { ProjectFileNode } from '../types';

export const AndroidCodeExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ProjectFileNode>({
    name: "MainActivity.kt",
    path: "/app/src/main/java/com/happy/app/MainActivity.kt",
    type: "file",
    description: "Point d'entrée de l'application Jetpack Compose avec Scaffold, barre de navigation Material 3 et HappyNavGraph."
  });
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "/": true,
    "/app": true,
    "/app/src": true,
    "/app/src/main": true,
    "/app/src/main/java/com/happy/app": true,
    "/app/src/main/java/com/happy/app/data": true,
    "/app/src/main/java/com/happy/app/ui": true,
  });
  const [copied, setCopied] = useState(false);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const copyPath = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTree = (node: ProjectFileNode) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.path];
    const isSelected = selectedNode.path === node.path;

    return (
      <div key={node.path} className="text-xs">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedNode(node);
            }
          }}
          className={`flex items-center gap-1.5 py-1 px-2 rounded-lg cursor-pointer transition select-none ${
            isSelected
              ? 'bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-200 font-semibold'
              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              )}
              <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
            </>
          ) : (
            <>
              <span className="w-3.5" />
              <FileCode className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </div>

        {isFolder && isExpanded && node.children && (
          <div className="pl-3 border-l border-zinc-200/80 dark:border-zinc-800 ml-2 mt-0.5 space-y-0.5">
            {node.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-zinc-900 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            Architecture Android MVVM + Jetpack Compose
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Structure Complète du Projet [Happy]
          </h2>
          <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
            Conçu pour Android Studio : Room (offline-first), Hilt, Coroutines & Flow, WorkManager, Navigation Compose, et Google Drive API v3 (scope privé).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-teal-200 font-mono">
            minSdk 26 • targetSdk 35
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-emerald-200 font-mono">
            libs.versions.toml
          </span>
        </div>
      </div>

      {/* Main Dual-Panel Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project File Tree */}
        <div className="lg:col-span-5 p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col h-[580px]">
          <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Explorateur Android Studio
            </span>
            <span className="text-[11px] text-teal-600 font-medium">
              Kotlin DSL (.kts)
            </span>
          </div>

          <div className="flex-1 overflow-y-auto mt-2 pt-1 pr-1 scrollbar-thin">
            {renderTree(ANDROID_PROJECT_TREE)}
          </div>
        </div>

        {/* Right: File Details & Architecture Specification */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* File Inspector Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedNode.name}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 break-all">
                    {selectedNode.path}
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyPath(selectedNode.path)}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier chemin'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong className="block text-zinc-900 dark:text-zinc-100 font-semibold mb-1">
                Rôle dans l'application :
              </strong>
              {selectedNode.description || "Composant de l'architecture Happy."}
            </div>
          </div>

          {/* Architecture 4 Layers Overview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                <Database className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Couche Données (Data)
                </h4>
              </div>
              <p className="text-xs text-zinc-500">
                Room SQLite offline-first (ActivityEntity, GoalEntity, UserStatsEntity) + DataStore pour les préférences.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Cloud className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Google Drive (Remote)
                </h4>
              </div>
              <p className="text-xs text-zinc-500">
                Credential Manager + Drive REST API v3 (scope drive.appdata) pour sauvegarder en JSON et exporter les rapports.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Cpu className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Domaine & ViewModels
                </h4>
              </div>
              <p className="text-xs text-zinc-500">
                UseCases pour l'anti-scrolling, calcul des streaks, points, gestion de l'état avec StateFlow et coroutines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <Bell className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  WorkManager & UI
                </h4>
              </div>
              <p className="text-xs text-zinc-500">
                Jetpack Compose + Material 3, rappels périodiques bienveillants et synchronisation en arrière-plan sous Wi-Fi.
              </p>
            </div>
          </div>

          {/* 8-Step Roadmap Status */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Feuille de route en 8 étapes (Demande utilisateur)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-200 font-semibold">
                1. Arborescence & Plan ✨ (En cours)
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                2. Gradle & Dependencies
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                3. Room Entities & DAOs
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                4. ViewModels & Métier
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                5. Écrans Compose
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                6. Drive API & WorkManager
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                7. Notifications & SOS Scroll
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-zinc-600">
                8. Google Cloud & Setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
