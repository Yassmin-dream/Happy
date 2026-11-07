import { Activity, Badge, Goal, AntiScrollSuggestion, ProjectFileNode } from '../types';

export const CATEGORY_CONFIG: Record<
  string, 
  { label: string; icon: string; bg: string; text: string; border: string; colorHex: string }
> = {
  sport: {
    label: 'Sport & Mouvement',
    icon: 'Activity',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    colorHex: '#10b981',
  },
  lecture: {
    label: 'Lecture',
    icon: 'BookOpen',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800',
    colorHex: '#14b8a6',
  },
  apprentissage: {
    label: 'Apprentissage',
    icon: 'GraduationCap',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    colorHex: '#06b6d4',
  },
  creativite: {
    label: 'Créativité & Art',
    icon: 'Palette',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    colorHex: '#f59e0b',
  },
  social: {
    label: 'Social & Proches',
    icon: 'Users',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    colorHex: '#f43f5e',
  },
  bien_etre: {
    label: 'Bien-être & Méditation',
    icon: 'Sparkles',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800',
    colorHex: '#8b5cf6',
  },
  projet_perso: {
    label: 'Projet Personnel',
    icon: 'Target',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
    colorHex: '#0ea5e9',
  },
};

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Marche au grand air sans téléphone',
    category: 'sport',
    durationMin: 25,
    dateTime: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    note: 'Très rafraîchissant, beaucoup d\'énergie retrouvée.',
    moodBefore: 2,
    moodAfter: 5,
  },
  {
    id: 'act-2',
    title: 'Lecture du chapitre 3 (Atomic Habits)',
    category: 'lecture',
    durationMin: 20,
    dateTime: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    note: 'Prendre conscience des signaux visuels.',
    moodBefore: 3,
    moodAfter: 4,
  },
  {
    id: 'act-3',
    title: 'Respiration cohérence cardiaque & étirements',
    category: 'bien_etre',
    durationMin: 10,
    dateTime: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    note: 'Diminution du stress avant le travail.',
    moodBefore: 2,
    moodAfter: 4,
  },
  {
    id: 'act-4',
    title: 'Appel vocal avec Sophie',
    category: 'social',
    durationMin: 35,
    dateTime: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    note: 'On a partagé nos projets de vacances.',
    moodBefore: 3,
    moodAfter: 5,
  },
  {
    id: 'act-5',
    title: 'Tutoriel Jetpack Compose Animation',
    category: 'apprentissage',
    durationMin: 45,
    dateTime: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    note: 'Mise en place de SharedTransitionLayout.',
    moodBefore: 3,
    moodAfter: 4,
  },
  {
    id: 'act-6',
    title: 'Esquisse au carnet & aquarelle',
    category: 'creativite',
    durationMin: 30,
    dateTime: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    note: 'Dessin d\'une tasse de thé fumante.',
    moodBefore: 2,
    moodAfter: 5,
  },
];

export const QUICK_ACTIVITIES = [
  { title: 'Marcher 15 min', category: 'sport', durationMin: 15, icon: 'Footprints' },
  { title: 'Lire 10 pages', category: 'lecture', durationMin: 15, icon: 'BookOpen' },
  { title: 'Méditer 5 min', category: 'bien_etre', durationMin: 5, icon: 'Sparkles' },
  { title: 'Boire un grand verre d\'eau & s\'étirer', category: 'bien_etre', durationMin: 5, icon: 'Droplets' },
  { title: 'Écrire 3 gratitudes', category: 'creativite', durationMin: 8, icon: 'PenTool' },
  { title: 'Envoyer un mot sympa à un ami', category: 'social', durationMin: 5, icon: 'Heart' },
];

export const ANTI_SCROLL_SUGGESTIONS: AntiScrollSuggestion[] = [
  {
    id: 'sug-1',
    title: 'Respiration 4-7-8 & étirement nuque',
    category: 'bien_etre',
    durationMin: 5,
    description: 'Pose ton téléphone sur la table. Inspire 4s, retiens 7s, expire lentement 8s par la bouche. Répète 4 fois.',
    icon: 'Wind',
    benefit: 'Apaise le système nerveux et coupe le réflexe de dopamine passive.',
  },
  {
    id: 'sug-2',
    title: 'Lire 5 à 10 pages de ton livre en cours',
    category: 'lecture',
    durationMin: 10,
    description: 'Ouvre ton livre papier ou ta liseuse. Plonge dans un autre univers sans notification ni écran lumineux.',
    icon: 'BookOpen',
    benefit: 'Améliore la concentration profonde et la mémoire de travail.',
  },
  {
    id: 'sug-3',
    title: 'Marche active dans la pièce ou autour du pâté',
    category: 'sport',
    durationMin: 10,
    description: 'Mets tes chaussures, regarde loin devant toi à l\'horizon et active la circulation sanguine.',
    icon: 'Footprints',
    benefit: 'Libère des endorphines naturelles et délasse les yeux fatigués par l\'écran.',
  },
  {
    id: 'sug-4',
    title: 'Ranger et désencombrer une surface',
    category: 'bien_etre',
    durationMin: 8,
    description: 'Choisis ton bureau ou ta table basse. Remets 5 objets à leur place avec soin.',
    icon: 'CheckSquare',
    benefit: 'Un espace ordonné apporte un soulagement mental immédiat.',
  },
  {
    id: 'sug-5',
    title: 'Écouter un morceau instrumental les yeux fermés',
    category: 'creativite',
    durationMin: 6,
    description: 'Mets un casque, choisis un morceau de piano ou de lofi et concentre-toi sur chaque instrument.',
    icon: 'Headphones',
    benefit: 'Repose les rétines et stimule l\'imagination auditive.',
  },
  {
    id: 'sug-6',
    title: 'Envoyer une note audio bienveillante à un proche',
    category: 'social',
    durationMin: 5,
    description: 'Dis à quelqu\'un qui compte pour toi que tu penses à lui, sans rien attendre en retour.',
    icon: 'MessageCircleHeart',
    benefit: 'Renforce les liens réels et remplace la comparaison sociale.',
  },
];

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'g-1',
    type: 'daily_active_time',
    title: 'Activités positives du jour',
    targetValue: 45,
    currentValue: 35,
    unit: 'min',
    period: 'daily',
  },
  {
    id: 'g-2',
    type: 'daily_anti_scroll',
    title: 'Sessions anti-scrolling réussies',
    targetValue: 3,
    currentValue: 2,
    unit: 'fois',
    period: 'daily',
  },
  {
    id: 'g-3',
    type: 'weekly_reading',
    title: 'Lecture hebdomadaire',
    targetValue: 120,
    currentValue: 85,
    unit: 'min',
    period: 'weekly',
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-1',
    name: 'Premier Pas',
    description: 'Enregistrer ta première activité positive dans Happy.',
    iconName: 'Footprints',
    category: 'debut',
    unlockedAt: '2026-11-01T10:00:00Z',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 'b-2',
    name: 'Anti-Scroll Héro',
    description: 'Remplacer 5 envies de scroller par une activité bienveillante.',
    iconName: 'ShieldCheck',
    category: 'anti_scroll',
    unlockedAt: '2026-11-04T16:30:00Z',
    progress: 5,
    maxProgress: 5,
  },
  {
    id: 'b-3',
    name: 'Série de Feu (7 jours)',
    description: 'Rester actif 7 jours consécutifs.',
    iconName: 'Flame',
    category: 'streaks',
    unlockedAt: null,
    progress: 5,
    maxProgress: 7,
  },
  {
    id: 'b-4',
    name: 'Grand Lecteur',
    description: 'Cumuler 10 heures de lecture apaisante.',
    iconName: 'BookMarked',
    category: 'categories',
    unlockedAt: null,
    progress: 240,
    maxProgress: 600,
  },
  {
    id: 'b-5',
    name: 'Sérénité Zen',
    description: 'Pratiquer 15 séances de bien-être ou méditation.',
    iconName: 'Sparkles',
    category: 'categories',
    unlockedAt: null,
    progress: 8,
    maxProgress: 15,
  },
  {
    id: 'b-6',
    name: 'Maître du Cloud',
    description: 'Effectuer ta première sauvegarde réussie sur Google Drive.',
    iconName: 'CloudCheck',
    category: 'cloud',
    unlockedAt: '2026-11-02T19:20:00Z',
    progress: 1,
    maxProgress: 1,
  },
];

export const INSPIRATIONAL_QUOTES = [
  {
    text: "Ce que tu fais de tes 15 prochaines minutes façonne la personne que tu seras demain.",
    author: "James Clear",
  },
  {
    text: "Le bonheur ne consiste pas à acquérir et à jouir, mais à ne rien désirer de superflu.",
    author: "Épictète",
  },
  {
    text: "L'attention est la forme la plus rare et la plus pure de la générosité envers soi-même.",
    author: "Simone Weil",
  },
  {
    text: "Chaque fois que tu résistes à l'écran, tu reprends le contrôle de ton esprit.",
    author: "Happy Mindset",
  },
];

export const ANDROID_PROJECT_TREE: ProjectFileNode = {
  name: "HappyApp",
  path: "/",
  type: "folder",
  children: [
    {
      name: "gradle",
      path: "/gradle",
      type: "folder",
      children: [
        {
          name: "libs.versions.toml",
          path: "/gradle/libs.versions.toml",
          type: "file",
          description: "Version catalog Gradle : versions des dépendances Kotlin, Compose, Room, Hilt, Vico, Google Drive, WorkManager, Coroutines."
        }
      ]
    },
    {
      name: "build.gradle.kts",
      path: "/build.gradle.kts",
      type: "file",
      description: "Build script racine (plugins apply false)"
    },
    {
      name: "settings.gradle.kts",
      path: "/settings.gradle.kts",
      type: "file",
      description: "Settings racine + configuration des repositories Google & MavenCentral"
    },
    {
      name: "app",
      path: "/app",
      type: "folder",
      children: [
        {
          name: "build.gradle.kts",
          path: "/app/build.gradle.kts",
          type: "file",
          description: "Configuration du module app (minSdk 26, targetSdk 35, composeOptions, Hilt, Room KSP)"
        },
        {
          name: "proguard-rules.pro",
          path: "/app/proguard-rules.pro",
          type: "file",
          description: "Règles Proguard pour Room, Google Drive API et Coroutines"
        },
        {
          name: "src",
          path: "/app/src",
          type: "folder",
          children: [
            {
              name: "main",
              path: "/app/src/main",
              type: "folder",
              children: [
                {
                  name: "AndroidManifest.xml",
                  path: "/app/src/main/AndroidManifest.xml",
                  type: "file",
                  description: "Manifeste avec permissions INTERNET, POST_NOTIFICATIONS, PACKAGE_USAGE_STATS et Worker"
                },
                {
                  name: "res",
                  path: "/app/src/main/res",
                  type: "folder",
                  children: [
                    {
                      name: "values",
                      path: "/app/src/main/res/values",
                      type: "folder",
                      children: [
                        { name: "strings.xml", path: "/app/src/main/res/values/strings.xml", type: "file", description: "Toutes les chaînes en français" },
                        { name: "colors.xml", path: "/app/src/main/res/values/colors.xml", type: "file", description: "Palette Material 3 douce turquoise/émeraude" },
                        { name: "themes.xml", path: "/app/src/main/res/values/themes.xml", type: "file", description: "Theme.Happy Material3 sans ActionBar" }
                      ]
                    }
                  ]
                },
                {
                  name: "java/com/happy/app",
                  path: "/app/src/main/java/com/happy/app",
                  type: "folder",
                  children: [
                    {
                      name: "HappyApplication.kt",
                      path: "/app/src/main/java/com/happy/app/HappyApplication.kt",
                      type: "file",
                      description: "@HiltAndroidApp, initialisation WorkManager et canaux de notifications"
                    },
                    {
                      name: "MainActivity.kt",
                      path: "/app/src/main/java/com/happy/app/MainActivity.kt",
                      type: "file",
                      description: "Point d'entrée Compose, setup du Scaffold, barre de navigation et NavHost"
                    },
                    {
                      name: "data",
                      path: "/app/src/main/java/com/happy/app/data",
                      type: "folder",
                      children: [
                        {
                          name: "local",
                          path: "/app/src/main/java/com/happy/app/data/local",
                          type: "folder",
                          children: [
                            { name: "AppDatabase.kt", path: "/app/src/main/java/com/happy/app/data/local/AppDatabase.kt", type: "file", description: "Base Room avec migrations et TypeConverters" },
                            { name: "entity/ActivityEntity.kt", path: "/app/src/main/java/com/happy/app/data/local/entity/ActivityEntity.kt", type: "file", description: "Entité Room pour les activités" },
                            { name: "entity/GoalEntity.kt", path: "/app/src/main/java/com/happy/app/data/local/entity/GoalEntity.kt", type: "file", description: "Entité Room pour les objectifs quotidiens/hebdo" },
                            { name: "entity/BadgeEntity.kt", path: "/app/src/main/java/com/happy/app/data/local/entity/BadgeEntity.kt", type: "file", description: "Entité Room pour les trophées/badges" },
                            { name: "entity/UserStatsEntity.kt", path: "/app/src/main/java/com/happy/app/data/local/entity/UserStatsEntity.kt", type: "file", description: "Entité Room pour les séries (streaks) et points" },
                            { name: "dao/ActivityDao.kt", path: "/app/src/main/java/com/happy/app/data/local/dao/ActivityDao.kt", type: "file", description: "Requêtes Room (Flow, filtres temporels, stats agrégées)" },
                            { name: "dao/GoalDao.kt", path: "/app/src/main/java/com/happy/app/data/local/dao/GoalDao.kt", type: "file", description: "Requêtes pour les objectifs" },
                            { name: "dao/BadgeDao.kt", path: "/app/src/main/java/com/happy/app/data/local/dao/BadgeDao.kt", type: "file", description: "Gestion des badges débloqués" },
                            { name: "preferences/UserPreferencesDataStore.kt", path: "/app/src/main/java/com/happy/app/data/local/preferences/UserPreferencesDataStore.kt", type: "file", description: "DataStore pour les réglages, heures de rappel et état Drive" }
                          ]
                        },
                        {
                          name: "remote",
                          path: "/app/src/main/java/com/happy/app/data/remote",
                          type: "folder",
                          children: [
                            { name: "GoogleDriveService.kt", path: "/app/src/main/java/com/happy/app/data/remote/GoogleDriveService.kt", type: "file", description: "Google Drive REST API v3 (drive.appdata) upload/download JSON et export CSV" },
                            { name: "GoogleAuthManager.kt", path: "/app/src/main/java/com/happy/app/data/remote/GoogleAuthManager.kt", type: "file", description: "Credential Manager & OAuth Google Sign-In" }
                          ]
                        },
                        {
                          name: "repository",
                          path: "/app/src/main/java/com/happy/app/data/repository",
                          type: "folder",
                          children: [
                            { name: "ActivityRepositoryImpl.kt", path: "/app/src/main/java/com/happy/app/data/repository/ActivityRepositoryImpl.kt", type: "file", description: "Implémentation offline-first du repository d'activités" },
                            { name: "DriveBackupRepositoryImpl.kt", path: "/app/src/main/java/com/happy/app/data/repository/DriveBackupRepositoryImpl.kt", type: "file", description: "Synchronisation Room <-> Drive avec résolution de conflits" },
                            { name: "RewardsRepositoryImpl.kt", path: "/app/src/main/java/com/happy/app/data/repository/RewardsRepositoryImpl.kt", type: "file", description: "Calculs des séries, niveaux et vérification des badges" }
                          ]
                        }
                      ]
                    },
                    {
                      name: "domain",
                      path: "/app/src/main/java/com/happy/app/domain",
                      type: "folder",
                      children: [
                        { name: "model/Activity.kt", path: "/app/src/main/java/com/happy/app/domain/model/Activity.kt", type: "file", description: "Modèle métier d'une activité" },
                        { name: "model/Category.kt", path: "/app/src/main/java/com/happy/app/domain/model/Category.kt", type: "file", description: "Enum des catégories (sport, lecture, bien-être...)" },
                        { name: "model/UserStats.kt", path: "/app/src/main/java/com/happy/app/domain/model/UserStats.kt", type: "file", description: "Modèle de statistiques et niveau" },
                        { name: "usecase/SaveActivityUseCase.kt", path: "/app/src/main/java/com/happy/app/domain/usecase/SaveActivityUseCase.kt", type: "file", description: "Enregistre l'activité, recalcule le streak et attribue les points" },
                        { name: "usecase/GetAntiScrollSuggestionsUseCase.kt", path: "/app/src/main/java/com/happy/app/domain/usecase/GetAntiScrollSuggestionsUseCase.kt", type: "file", description: "Génère 3 suggestions aléatoires 5-15 min adaptées" },
                        { name: "usecase/SyncWithGoogleDriveUseCase.kt", path: "/app/src/main/java/com/happy/app/domain/usecase/SyncWithGoogleDriveUseCase.kt", type: "file", description: "Orchestre la sauvegarde et vérification d'intégrité" }
                      ]
                    },
                    {
                      name: "di",
                      path: "/app/src/main/java/com/happy/app/di",
                      type: "folder",
                      children: [
                        { name: "DatabaseModule.kt", path: "/app/src/main/java/com/happy/app/di/DatabaseModule.kt", type: "file", description: "Injection Hilt pour Room Database et DAOs" },
                        { name: "RepositoryModule.kt", path: "/app/src/main/java/com/happy/app/di/RepositoryModule.kt", type: "file", description: "Binding des interfaces Repository vers leurs implémentations" },
                        { name: "NetworkModule.kt", path: "/app/src/main/java/com/happy/app/di/NetworkModule.kt", type: "file", description: "Injection des services Google Drive et Credential Manager" }
                      ]
                    },
                    {
                      name: "ui",
                      path: "/app/src/main/java/com/happy/app/ui",
                      type: "folder",
                      children: [
                        {
                          name: "theme",
                          path: "/app/src/main/java/com/happy/app/ui/theme",
                          type: "folder",
                          children: [
                            { name: "Color.kt", path: "/app/src/main/java/com/happy/app/ui/theme/Color.kt", type: "file", description: "Palette apaisante (Teal/Emerald/Mint) clair/sombre" },
                            { name: "Theme.kt", path: "/app/src/main/java/com/happy/app/ui/theme/Theme.kt", type: "file", description: "HappyTheme Material3 avec dynamicColor" },
                            { name: "Type.kt", path: "/app/src/main/java/com/happy/app/ui/theme/Type.kt", type: "file", description: "Typographie Material 3 claire et accessible" }
                          ]
                        },
                        {
                          name: "navigation",
                          path: "/app/src/main/java/com/happy/app/ui/navigation",
                          type: "folder",
                          children: [
                            { name: "HappyNavGraph.kt", path: "/app/src/main/java/com/happy/app/ui/navigation/HappyNavGraph.kt", type: "file", description: "Navigation Compose avec transitions douces" },
                            { name: "Screen.kt", path: "/app/src/main/java/com/happy/app/ui/navigation/Screen.kt", type: "file", description: "Routes scellées (Home, Activities, Stats, Rewards, Settings)" }
                          ]
                        },
                        {
                          name: "home",
                          path: "/app/src/main/java/com/happy/app/ui/home",
                          type: "folder",
                          children: [
                            { name: "HomeScreen.kt", path: "/app/src/main/java/com/happy/app/ui/home/HomeScreen.kt", type: "file", description: "Écran d'accueil (streak, résumé jour, actions rapides, SOS scroll)" },
                            { name: "HomeViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/home/HomeViewModel.kt", type: "file", description: "StateFlow pour l'écran d'accueil" }
                          ]
                        },
                        {
                          name: "activities",
                          path: "/app/src/main/java/com/happy/app/ui/activities",
                          type: "folder",
                          children: [
                            { name: "ActivitiesScreen.kt", path: "/app/src/main/java/com/happy/app/ui/activities/ActivitiesScreen.kt", type: "file", description: "Historique avec filtres temporels et par catégories" },
                            { name: "AddEditActivityDialog.kt", path: "/app/src/main/java/com/happy/app/ui/activities/AddEditActivityDialog.kt", type: "file", description: "Modal d'ajout avec sélecteur d'humeur 1-5 avant/après" },
                            { name: "ActivitiesViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/activities/ActivitiesViewModel.kt", type: "file", description: "Gestion du CRUD et filtrage des activités" }
                          ]
                        },
                        {
                          name: "stats",
                          path: "/app/src/main/java/com/happy/app/ui/stats",
                          type: "folder",
                          children: [
                            { name: "StatsScreen.kt", path: "/app/src/main/java/com/happy/app/ui/stats/StatsScreen.kt", type: "file", description: "Graphiques Vico (catégories, évolution, calendrier des jours actifs)" },
                            { name: "StatsViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/stats/StatsViewModel.kt", type: "file", description: "Agrégation statistique et calcul des ratios" }
                          ]
                        },
                        {
                          name: "rewards",
                          path: "/app/src/main/java/com/happy/app/ui/rewards",
                          type: "folder",
                          children: [
                            { name: "RewardsScreen.kt", path: "/app/src/main/java/com/happy/app/ui/rewards/RewardsScreen.kt", type: "file", description: "Badges débloqués, jauge de progression, niveau et points" },
                            { name: "RewardsViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/rewards/RewardsViewModel.kt", type: "file", description: "Gestion des succès et objectifs" }
                          ]
                        },
                        {
                          name: "antiscroll",
                          path: "/app/src/main/java/com/happy/app/ui/antiscroll",
                          type: "folder",
                          children: [
                            { name: "AntiScrollBottomSheet.kt", path: "/app/src/main/java/com/happy/app/ui/antiscroll/AntiScrollBottomSheet.kt", type: "file", description: "Modal 'J'ai envie de scroller' : 3 cartes aléatoires + minuteur interactif" },
                            { name: "AntiScrollViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/antiscroll/AntiScrollViewModel.kt", type: "file", description: "Minuteur dégressif et attribution des points bonus" }
                          ]
                        },
                        {
                          name: "settings",
                          path: "/app/src/main/java/com/happy/app/ui/settings",
                          type: "folder",
                          children: [
                            { name: "SettingsScreen.kt", path: "/app/src/main/java/com/happy/app/ui/settings/SettingsScreen.kt", type: "file", description: "Panneau de synchro Drive, rappels bienveillants et export de rapport" },
                            { name: "SettingsViewModel.kt", path: "/app/src/main/java/com/happy/app/ui/settings/SettingsViewModel.kt", type: "file", description: "Gestion du statut Google Drive et DataStore" }
                          ]
                        }
                      ]
                    },
                    {
                      name: "worker",
                      path: "/app/src/main/java/com/happy/app/worker",
                      type: "folder",
                      children: [
                        { name: "DriveSyncWorker.kt", path: "/app/src/main/java/com/happy/app/worker/DriveSyncWorker.kt", type: "file", description: "CoroutineWorker périodique (1x/jour, Wi-Fi requis, batterie non faible)" },
                        { name: "NotificationWorker.kt", path: "/app/src/main/java/com/happy/app/worker/NotificationWorker.kt", type: "file", description: "WorkManager pour les rappels bienveillants programmés" }
                      ]
                    },
                    {
                      name: "util",
                      path: "/app/src/main/java/com/happy/app/util",
                      type: "folder",
                      children: [
                        { name: "NotificationHelper.kt", path: "/app/src/main/java/com/happy/app/util/NotificationHelper.kt", type: "file", description: "Création des canaux et notifications douces et non culpabilisantes" },
                        { name: "UsageStatsHelper.kt", path: "/app/src/main/java/com/happy/app/util/UsageStatsHelper.kt", type: "file", description: "Lecture facultative de l'utilisation des apps de réseaux sociaux (UsageStatsManager)" },
                        { name: "DateTimeFormatters.kt", path: "/app/src/main/java/com/happy/app/util/DateTimeFormatters.kt", type: "file", description: "Formatage des dates et durées en français" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
