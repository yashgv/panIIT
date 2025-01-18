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