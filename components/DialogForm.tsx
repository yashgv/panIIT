import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Instagram, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const platformConfigs = {
  Instagram: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' }
    ],
    instructions: [
      "1. Make sure you have a Business or Creator Instagram account",
      "2. Ensure 2FA is temporarily disabled during setup",
      "3. Use your Instagram username and password",
      "4. Re-enable 2FA after successful connection"
    ],
    links: [
      {
        text: "Switch to Business Account",
        url: "https://help.instagram.com/502981923235522"
      }
    ]
  },
  Twitter: {
    fields: [
      { name: 'consumer_key', label: 'API Key', type: 'text' },
      { name: 'consumer_secret', label: 'API Secret', type: 'password' },
      { name: 'access_token', label: 'Access Token', type: 'text' },
      { name: 'access_token_secret', label: 'Access Token Secret', type: 'password' }
    ],
    instructions: [
      "1. Go to Twitter Developer Portal",
      "2. Create a new Project and App",
      "3. Enable OAuth 1.0a in User Authentication Settings",
      "4. Generate Access Token and Secret",
      "5. Copy your API Key, API Secret, Access Token, and Access Token Secret"
    ],
    links: [
      {
        text: "Twitter Developer Portal",
        url: "https://developer.twitter.com/en/portal/dashboard"
      }
    ]
  },
  LinkedIn: {
    fields: [
      { name: 'access_token', label: 'Access Token', type: 'text' },
      { name: 'owner_urn', label: 'Owner URN', type: 'text' }
    ],
    instructions: [
      "1. Create an app in LinkedIn Developer Portal",
      "2. Add OAuth 2.0 scopes: r_liteprofile w_member_social",
      "3. Get your Access Token through OAuth 2.0",
      "4. Find your Owner URN (Format: urn:li:person:YOUR_ID)",
      "5. Ensure your app is approved by LinkedIn"
    ],
    links: [
      {
        text: "LinkedIn Developer Portal",
        url: "https://www.linkedin.com/developers/apps"
      },
      {
        text: "Find Your URN",
        url: "https://www.linkedin.com/developers/tools/oauth"
      }
    ]
  }
};

export default function PlatformCredentialsDialog({
  platform,
  isOpen,
  onClose,
  onSubmit
}) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error saving credentials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPlatformIcon = (platformName) => {
    switch (platformName) {
      case 'Instagram':
        return <Instagram className="w-5 h-5" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      case 'LinkedIn':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const config = platformConfigs[platform];
  if (!config) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-50">
              {getPlatformIcon(platform)}
            </div>
            <span>Connect {platform}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription>
              <h4 className="font-semibold mb-2">Setup Instructions:</h4>
              <ul className="list-none space-y-1">
                {config.instructions.map((instruction, idx) => (
                  <li key={idx} className="text-sm">{instruction}</li>
                ))}
              </ul>
              
              {config.links?.length > 0 && (
                <>
                  <Separator className="my-2" />
                  <div className="space-y-1">
                    {config.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <span>{link.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map((field) => (
              <FormItem key={field.name}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
            ))}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-2"
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}