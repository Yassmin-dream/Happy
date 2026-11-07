export type ActivityCategory = 
  | 'sport' 
  | 'lecture' 
  | 'apprentissage' 
  | 'creativite' 
  | 'social' 
  | 'bien_etre' 
  | 'projet_perso';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  durationMin: number;
  dateTime: string; // ISO string
  note?: string;
  moodBefore?: number; // 1 to 5
  moodAfter?: number; // 1 to 5
}

export interface Goal {
  id: string;
  type: string;
  title: string;
  targetValue: number; // minutes or count
  currentValue: number;
  unit: string;
  period: 'daily' | 'weekly';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: string;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  streakCurrent: number;
  streakBest: number;
  totalPoints: number;
  level: number;
  totalMinutes: number;
  savedScrollHours: number;
}

export interface AntiScrollSuggestion {
  id: string;
  title: string;
  category: ActivityCategory;
  durationMin: number;
  description: string;
  icon: string;
  benefit: string;
}

export interface GoogleDriveSyncState {
  isConnected: boolean;
  userEmail: string | null;
  lastSyncTime: string | null;
  isSyncing: boolean;
  autoSyncEnabled: boolean;
  driveFolder: string;
  syncStatus: 'idle' | 'success' | 'error' | 'syncing';
}

export interface ProjectFileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  description?: string;
  children?: ProjectFileNode[];
  previewContent?: string;
}
