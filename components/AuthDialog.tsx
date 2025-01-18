// components/AuthDialog.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { credentialsManager } from '@/utils/credentialsManager';

interface AuthDialogProps {
  open: boolean;
  platform: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthDialog({ open, platform, onClose, onSuccess }: AuthDialogProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (platform) {
      credentialsManager.savePlatformCredentials(platform, credentials);
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect {platform} Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                username: e.target.value
              }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                password: e.target.value
              }))}
              required
            />
          </div>
          <Button type="submit" className="w-full">Connect Account</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}