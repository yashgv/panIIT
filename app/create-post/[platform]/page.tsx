// app/create-post/[platform]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const params = useParams();
  const platform = params.platform;
  const router = useRouter();

  const [postData, setPostData] = useState({
    caption: '',
    image: null as File | null,
    prompt: ''
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = () => {
    router.push(`/post-details/${platform}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create {platform} Post</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Post Details */}
          <Card className="p-6 space-y-6">
            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                value={postData.caption}
                onChange={(e) => setPostData(prev => ({
                  ...prev,
                  caption: e.target.value
                }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="prompt">AI Prompt (Optional)</Label>
              <Textarea
                id="prompt"
                value={postData.prompt}
                onChange={(e) => setPostData(prev => ({
                  ...prev,
                  prompt: e.target.value
                }))}
                rows={4}
                placeholder="Enter prompt for AI-generated content..."
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleCreatePost}>
              Create Post
            </Button>
          </Card>

          {/* Right Side - Preview */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border rounded-lg p-4">
              {preview && (
                <div className="aspect-square relative mb-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <p className="text-gray-700">{postData.caption}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}