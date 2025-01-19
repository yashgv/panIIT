
// components/PlatformSelector.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlatformSelectorProps } from '../types';

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  userData,
  onPlatformToggle,
  platforms
}) => {
  const isPlatformConnected = (platform: string): boolean => {
    if (!userData?.social_configs) return false;
    const config = userData.social_configs[platform.toLowerCase()];
    return config && Object.keys(config).length > 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {platforms.map(({ name, icon: Icon }) => {
            const isConnected = isPlatformConnected(name);
            const isSelected = selectedPlatforms.includes(name);
            return (
              <Button
                key={name}
                variant={isSelected ? "default" : "outline"}
                className={`flex items-center space-x-2 ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => isConnected && onPlatformToggle(name)}
                disabled={!isConnected}
              >
                <Icon className="h-4 w-4" />
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                {!isConnected && (
                  <Badge variant="outline" className="ml-2">Not Connected</Badge>
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};