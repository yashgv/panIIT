// types.ts
import { LucideIcon } from 'lucide-react';

export interface UserData {
  access_token?: string;
  social_configs?: {
    [key: string]: Record<string, any>;
  };
}

export interface Platform {
  name: string;
  icon: LucideIcon;
  maxChars: number;
}

export interface PreviewTabProps {
  isLoading: boolean;
  previewGenerated: boolean;
  imagePreview: string;
  previewContent: string;
  prompt: string;
}

export interface PlatformSelectorProps {
  selectedPlatforms: string[];
  userData: UserData | null;
  onPlatformToggle: (platform: string) => void;
  platforms: Platform[];
}

export interface ContentEditorProps {
  prompt: string;
  characterCount: number;
  maxCharacters: number;
  image: File | null;
  imagePreview: string;
  isLoading: boolean;
  previewGenerated: boolean;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onPreviewClick: () => void;
  onPublishClick: () => void;
}


// types/index.ts
export interface SocialMediaPost {
    username: string;
    password: string;
    prompt: string;
    images: File[] | null;
    postTime: string;
    additionalDetails: string;
  }

export interface AccountData {
    platform: string;
    username: string;
    lastPosted: string;
    icon: string;
    isConnected: boolean;
  }
  
export interface StatsData {
    platform: string;
    data: {
      date: string;
      reach: number;
      engagement: number;
    }[];
  }

export interface PlatformCredentials {
    username: string;
    password: string;
  }
  
  export interface PlatformConfig {
    isConfigured: boolean;
    credentials: PlatformCredentials;
  }
  
  export type PlatformConfigs = {
    [key: string]: PlatformConfig;
  }