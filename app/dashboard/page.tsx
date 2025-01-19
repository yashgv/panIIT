'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
  Clock,
  Share2,
  Settings,
  Bell,
  User,
  HelpCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SocialMediaForm from '@/components/SocialMediaForm';
import { useToast } from '@/hooks/use-toast';
import SignOutButton from '@/components/auth/SignOutButton';

interface UserData {
  social_configs: {
    instagram?: {
      username: string;
      password: string;
      lastUpdated?: Date;
    };
    twitter?: {
      consumer_key: string;
      consumer_secret: string;
      access_token: string;
      access_token_secret: string;
      lastUpdated?: Date;
    };
    linkedin?: {
      access_token: string;
      owner_urn: string;
      lastUpdated?: Date;
    };
  };
}

const platformInstructions = {
  instagram: {
    title: 'Instagram Credentials Setup',
    steps: [
      'Log in to your Instagram account',
      'Ensure 2FA is temporarily disabled during setup',
      'Enter your Instagram username and password below',
      'After successful connection, you can re-enable 2FA'
    ],
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' }
    ],
    helpLink: 'https://help.instagram.com/155940534568753'
  },
  twitter: {
    title: 'Twitter API Credentials Setup',
    steps: [
      'Go to Twitter Developer Portal (developer.twitter.com)',
      'Create a new project and app',
      'Navigate to "Keys and Tokens" section',
      'Generate Consumer Keys and Access Tokens',
      'Copy and paste the credentials below'
    ],
    fields: [
      { name: 'consumer_key', label: 'API Key', type: 'text' },
      { name: 'consumer_secret', label: 'API Secret', type: 'password' },
      { name: 'access_token', label: 'Access Token', type: 'text' },
      { name: 'access_token_secret', label: 'Access Token Secret', type: 'password' }
    ],
    helpLink: 'https://developer.twitter.com/en/docs/authentication/oauth-1-0a'
  },
  linkedin: {
    title: 'LinkedIn API Credentials Setup',
    steps: [
      'Visit LinkedIn Developer Portal',
      'Create a new application',
      'Get your Access Token from OAuth 2.0 settings',
      'Find your Organization URN from company page URL',
      'Enter the credentials below'
    ],
    fields: [
      { name: 'access_token', label: 'Access Token', type: 'text' },
      { name: 'owner_urn', label: 'Organization URN', type: 'text' }
    ],
    helpLink: 'https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow'
  }
};

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [credentials, setCredentials] = useState({});
  const { toast } = useToast();

  const platforms = [
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600',
      description: 'Share photos and stories',
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      description: 'Share quick updates',
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-800',
      textColor: 'text-blue-700',
      description: 'Professional networking',
    },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isPlatformConnected = (platform: string) => {
    if (!userData?.social_configs) return false;
    
    switch (platform.toLowerCase()) {
      case 'instagram':
        return !!userData.social_configs.instagram?.username;
      case 'twitter':
        return !!userData.social_configs.twitter?.consumer_key;
      case 'linkedin':
        return !!userData.social_configs.linkedin?.access_token;
      default:
        return false;
    }
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    if (!isPlatformConnected(platform)) {
      setShowCredentialsDialog(true);
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [`${selectedPlatform?.toLowerCase()}_config`]: credentials
        })
      };

      const response = await fetch('/api/user', config);
      if (!response.ok) throw new Error('Failed to update credentials');

      await fetchUserData();
      setShowCredentialsDialog(false);
      setCredentials({});
      toast({
        title: "Success",
        description: `${selectedPlatform} connected successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save credentials",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Share2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Postify</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="rounded-full">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Reset Credentials
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => {
            const isConnected = isPlatformConnected(platform.name);
            return (
              <Card
                key={platform.name}
                className={`group transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden ${
                  selectedPlatform === platform.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handlePlatformSelect(platform.name)}
              >
                <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
                <CardHeader className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Badge 
                      variant={isConnected ? "default" : "outline"}
                      className="transition-colors duration-300"
                    >
                      {isConnected ? "Connected" : "Not Connected"}
                    </Badge>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${platform.textColor} ${
                      selectedPlatform === platform.name ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${platform.color}`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{platform.name}</h3>
                      <p className="text-sm text-gray-500">{platform.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedPlatform && !isPlatformConnected(selectedPlatform) && (
          <Dialog open={showCredentialsDialog} onOpenChange={setShowCredentialsDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${
                    platforms.find(p => p.name === selectedPlatform)?.color
                  }`}>
                    {platforms.find(p => p.name === selectedPlatform)?.icon}
                  </div>
                  <DialogTitle>
                    {platformInstructions[selectedPlatform.toLowerCase()]?.title}
                  </DialogTitle>
                </div>
                <DialogDescription>
                  Follow the steps below to set up your {selectedPlatform} integration
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="instructions">
                    <AccordionTrigger className="text-sm font-medium">
                      Setup Instructions
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-600">
                        {platformInstructions[selectedPlatform.toLowerCase()]?.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                      <a
                        href={platformInstructions[selectedPlatform.toLowerCase()]?.helpLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                      >
                        <span>Official Documentation</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                  {platformInstructions[selectedPlatform.toLowerCase()]?.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                  ))}
                  
                  <Alert>
                    <AlertDescription>
                      Your credentials are encrypted and stored securely. We never share your data with third parties.
                    </AlertDescription>
                  </Alert>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCredentialsDialog(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full sm:w-auto"
                    >
                      Connect {selectedPlatform}
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {selectedPlatform && isPlatformConnected(selectedPlatform) && (
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center space-x-2">
                <span>{selectedPlatform} Integration</span>
                <Badge variant="success">Connected</Badge>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Last Updated:</span>
                  </div>
                  <span className="text-sm">
                    {userData?.social_configs[selectedPlatform.toLowerCase()]?.lastUpdated
                      ? new Date(userData.social_configs[selectedPlatform.toLowerCase()].lastUpdated).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SocialMediaForm platform={selectedPlatform} userData={userData} onUpdate={fetchUserData} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}