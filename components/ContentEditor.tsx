
// components/ContentEditor.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X } from 'lucide-react';
import { ContentEditorProps } from '../types';

export const ContentEditor: React.FC<ContentEditorProps> = ({
  prompt,
  characterCount,
  maxCharacters,
  image,
  imagePreview,
  isLoading,
  previewGenerated,
  onPromptChange,
  onImageUpload,
  onImageRemove,
  onPreviewClick,
  onPublishClick
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea
            placeholder="Write your post content..."
            value={prompt}
            onChange={onPromptChange}
            className="min-h-32 resize-none"
          />
          <p className="text-sm text-gray-500 text-right">
            {characterCount}/{maxCharacters} characters
          </p>
        </div>

        <div className="space-y-2">
          <Label>Image</Label>
          {!image ? (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload image (max 5MB)
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={onImageRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={onPreviewClick}
            disabled={!prompt || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Preview...
              </>
            ) : (
              'Preview Post'
            )}
          </Button>

          <Button 
            className="flex-1"
            onClick={onPublishClick}
            disabled={!previewGenerated || isLoading}
            variant="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
