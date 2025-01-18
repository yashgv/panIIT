'use client';

import { useState, useEffect } from 'react';
import {
  Instagram,
  Twitter,
  Linkedin,
  LogOut,
  Plus,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';



const platformConfig = {
  instagram: {
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    fields: ['username', 'password'],
    instructions: 'To connect your Instagram account:\n1. Use your Instagram username\n2. Use your Instagram password\n\nNote: For enhanced security, consider using an Instagram Professional account.',
  },
  twitter: {
    name: 'Twitter',
    icon: <Twitter className="w-6 h-6" />,
    color: 'bg-blue-500',
    fields: ['consumer_key', 'consumer_secret', 'access_token', 'access_token_secret'],
    instructions: 'To get Twitter API credentials:\n1. Go to Twitter Developer Portal\n2. Create a new app\n3. Generate consumer keys and access tokens\n4. Copy the credentials here',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'bg-blue-700',
    fields: ['access_token', 'owner_urn'],
    instructions: 'To get LinkedIn API credentials:\n1. Go to LinkedIn Developer Portal\n2. Create a new app\n3. Request access token with required permissions\n4. Get your LinkedIn URN from profile settings',
  },
};

import { getServerSession } from 'next-auth';

export default function Dashboard() {
  const [socialConfigs, setSocialConfigs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [credentials, setCredentials] = useState({});
  const { toast } = useToast();


  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      let session = await getServerSession();
      if (!session || !session.user || !session.user.id) {
        return toast({
          title: 'Error',
          description: 'Unauthorized',
          variant: 'destructive',
        });
      }
      const response = await fetch(`http://localhost:3000/api/user/${session.user.id}`);
      const data = await response.json();
      setSocialConfigs(data.social_configs);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch user data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialSubmit = async (platform) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [`${platform}_config`]: credentials,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `${platformConfig[platform].name} credentials updated`,
        });
        fetchUserData();
        setSelectedPlatform(null);
        setCredentials({});
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Social Dashboard</h1>
            <p className="text-slate-500 mt-2">Manage your social media connections</p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(platformConfig).map(([key, platform]) => (
            <Card key={key} className="overflow-hidden">
              <CardHeader className={`${platform.color} text-white`}>
                <div className="flex items-center justify-between">
                  {platform.icon}
                  {socialConfigs?.[key]?.lastUpdated && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{platform.name}</CardTitle>
                <CardDescription>
                  {socialConfigs?.[key]?.lastUpdated
                    ? 'Connected'
                    : 'Not connected'}
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={socialConfigs?.[key]?.lastUpdated ? "outline" : "default"}
                      className="mt-4 w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {socialConfigs?.[key]?.lastUpdated ? 'Update' : 'Connect'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Connect {platform.name}</DialogTitle>
                      <DialogDescription>
                        Enter your credentials to connect your account
                      </DialogDescription>
                    </DialogHeader>
                    <Alert>
                      <AlertDescription className="whitespace-pre-line">
                        {platform.instructions}
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-4 mt-4">
                      {platform.fields.map((field) => (
                        <div key={field}>
                          <Label htmlFor={field}>
                            {field.split('_').join(' ').toUpperCase()}
                          </Label>
                          <Input
                            id={field}
                            type={field.includes('password') || field.includes('secret') ? 'password' : 'text'}
                            onChange={(e) =>
                              setCredentials((prev) => ({
                                ...prev,
                                [field]: e.target.value,
                              }))
                            }
                          />
                        </div>
                      ))}
                      <Button
                        className="w-full"
                        onClick={() => handleCredentialSubmit(key)}
                      >
                        Save Credentials
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}