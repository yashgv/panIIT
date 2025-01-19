import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { Platform } from './types';

export const PLATFORMS: Platform[] = [
  { name: 'instagram', icon: Instagram, maxChars: 2200 },
  { name: 'twitter', icon: Twitter, maxChars: 280 },
  { name: 'linkedin', icon: Linkedin, maxChars: 3000 }
];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB