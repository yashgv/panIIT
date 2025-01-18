// utils/credentialsManager.ts
import { PlatformConfigs, PlatformCredentials } from '../types';
import { localStorageUtil } from './localStorage';

export const credentialsManager = {
  isPlatformConfigured: (platform: string): boolean => {
    try {
      const configs = localStorageUtil.getItem('platformConfigs');
      if (!configs) return false;
      
      const platformConfigs: PlatformConfigs = JSON.parse(configs);
      return platformConfigs[platform]?.isConfigured || false;
    } catch (error) {
      console.error('Error checking platform configuration:', error);
      return false;
    }
  },

  savePlatformCredentials: (
    platform: string, 
    credentials: PlatformCredentials
  ): void => {
    try {
      const configs = localStorageUtil.getItem('platformConfigs');
      const platformConfigs: PlatformConfigs = configs ? JSON.parse(configs) : {};

      platformConfigs[platform] = {
        isConfigured: true,
        credentials
      };

      localStorageUtil.setItem('platformConfigs', JSON.stringify(platformConfigs));
    } catch (error) {
      console.error('Error saving platform credentials:', error);
    }
  },

  getPlatformCredentials: (platform: string): PlatformCredentials | null => {
    try {
      const configs = localStorageUtil.getItem('platformConfigs');
      if (!configs) return null;

      const platformConfigs: PlatformConfigs = JSON.parse(configs);
      return platformConfigs[platform]?.credentials || null;
    } catch (error) {
      console.error('Error getting platform credentials:', error);
      return null;
    }
  },

  areCredentialsSaved: (platform: string): boolean => {
    try {
      const configs = localStorageUtil.getItem('platformConfigs');
      if (!configs) return false;

      const platformConfigs: PlatformConfigs = JSON.parse(configs);
      return !!platformConfigs[platform]?.credentials;
    } catch (error) {
      console.error('Error checking if credentials are saved:', error);
      return false;
    }
  },

  clearCredentials: (platform: string): void => {
    try {
      const configs = localStorageUtil.getItem('platformConfigs');
      if (!configs) return;

      const platformConfigs: PlatformConfigs = JSON.parse(configs);
      delete platformConfigs[platform];

      localStorageUtil.setItem('platformConfigs', JSON.stringify(platformConfigs));
    } catch (error) {
      console.error('Error clearing platform credentials:', error);
    }
  }
};