// components/CredentialsForm.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PlatformCredentials } from '../types';

interface CredentialsFormProps {
  platform: string;
  onSubmit: (credentials: PlatformCredentials) => void;
}

export function CredentialsForm({ platform, onSubmit }: CredentialsFormProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
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
  );
}