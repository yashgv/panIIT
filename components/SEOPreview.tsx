
// components/SEOPreview.tsx
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SEOPreviewProps {
  prompt: string;
}

export const SEOPreview: React.FC<SEOPreviewProps> = ({ prompt }) => {
  return (
    <Alert>
      <AlertDescription>
        <div className="space-y-2">
          <p><strong>Title Preview:</strong> {prompt.slice(0, 60)}...</p>
          <p><strong>Description Preview:</strong> {prompt.slice(0, 155)}...</p>
          <p><strong>URL Preview:</strong> your-website.com/posts/{prompt.slice(0, 30).toLowerCase().replace(/\s+/g, '-')}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
};
