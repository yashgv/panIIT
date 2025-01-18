'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Calendar,
  Clock,
  Share2,
  Settings,
  Bell,
  User,
  Plus,
  HelpCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { credentialsManager } from '@/utils/credentialsManager';
import { CredentialsForm } from '@/components/CredentialsForm';
import SocialMediaForm from '@/components/SocialMediaForm';
import { PlatformCredentials } from '@/types';

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  const platforms = [
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-8 h-8" />,
      color: 'bg-pink-500',
      description: 'Share photos and stories'
    },
    { 
      name: 'X', 
      icon: <Twitter className="w-8 h-8" />,
      color: 'bg-blue-500',
      description: 'Share quick updates'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube className="w-8 h-8" />,
      color: 'bg-red-500',
      description: 'Share videos'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-8 h-8" />,
      color: 'bg-blue-700',
      description: 'Professional networking'
    },
  ];

  const handlePlatformSelect = (platform: string) => {
    if (selectedPlatform === platform) {
      setSelectedPlatform(null);
      return;
    }
    
    setSelectedPlatform(platform);
    
    if (!credentialsManager.isPlatformConfigured(platform)) {
      setShowCredentialsForm(true);
    } else {
      setShowCredentialsForm(false);
    }
  };

  const handleCredentialsSubmit = (credentials: PlatformCredentials) => {
    if (selectedPlatform) {
      credentialsManager.savePlatformCredentials(selectedPlatform, credentials);
      setShowCredentialsForm(false);
    }
  };

  const handleResetCredentials = () => {
    localStorage.removeItem('platformConfigs');
    setShowCredentialsForm(false);
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Share2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Social Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleResetCredentials}>
                    Reset Platform Credentials
                  </DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Choose Your Platform</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                selectedPlatform === platform.name ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handlePlatformSelect(platform.name)}
            >
              <CardHeader className="space-y-1">
                <Badge className={`${platform.color} w-fit`}>
                  {platform.name}
                  {credentialsManager.isPlatformConfigured(platform.name) && 
                    <span className="ml-2">✓</span>
                  }
                </Badge>
                <div className="text-sm text-gray-500">{platform.description}</div>
              </CardHeader>
              <CardContent>
                <div className="w-full p-6 hover:bg-slate-50">
                  <div className="flex flex-col items-center">
                    <div className="mb-4">{platform.icon}</div>
                    <div className="font-medium text-lg">{platform.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlatform && (
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                {showCredentialsForm 
                  ? `Configure ${selectedPlatform} Account` 
                  : `Create Post for ${selectedPlatform}`}
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                <Clock className="h-4 w-8" />
                {showCredentialsForm 
                  ? 'Please enter your account credentials' 
                  : 'Configure your post details'}
              </p>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="max-w-4xl">
              {showCredentialsForm ? (
                <CredentialsForm 
                  platform={selectedPlatform} 
                  onSubmit={handleCredentialsSubmit} 
                />
              ) : (
                <SocialMediaForm platform={selectedPlatform} />
              )}
            </div>
          </div>
        )}

        <Button
          className="fixed bottom-8 right-8 rounded-full w-12 h-12"
          variant="secondary"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </main>
    </div>
  );
}