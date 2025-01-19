// components/PreviewTab.tsx
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { PreviewTabProps } from '../types';

export const PreviewTab: React.FC<PreviewTabProps> = ({
  isLoading,
  previewGenerated,
  imagePreview,
  previewContent,
  prompt
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!previewGenerated) {
    return (
      <Alert>
        <AlertDescription>
          Click the Preview button to generate a preview of your post
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Post preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <div className="prose max-w-none">
        <p>{previewContent || prompt}</p>
      </div>
    </>
  );
};