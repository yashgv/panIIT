// components/SocialMediaForm.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Image as ImageIcon,
  Type,
  Settings,
  Sparkles,
} from 'lucide-react';

interface SocialMediaFormProps {
  platform: string;
}

export default function SocialMediaForm({ platform }: SocialMediaFormProps) {
  const [postData, setPostData] = useState({
    caption: '',
    image: null as File | null,
    prompt: '',
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    tags: '',
    useAI: false,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="w-full space-y-10">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Type className="w-4 h-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Media
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" /> Additional Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  checked={postData.useAI}
                  onCheckedChange={(checked) => 
                    setPostData(prev => ({ ...prev, useAI: checked }))
                  }
                />
                <Label>Use AI Assistant</Label>
              </div>

              {postData.useAI ? (
                <div className="space-y-4">
                  <Label htmlFor="prompt">AI Prompt</Label>
                  <div className="flex gap-4">
                    <Textarea
                      id="prompt"
                      value={postData.prompt}
                      onChange={(e) => setPostData(prev => ({
                        ...prev,
                        prompt: e.target.value
                      }))}
                      placeholder="Describe what kind of content you want to generate..."
                      className="flex-1"
                    />
                    <Button className="flex-shrink-0">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Label htmlFor="caption">Manual Caption</Label>
                  <Textarea
                    id="caption"
                    value={postData.caption}
                    onChange={(e) => setPostData(prev => ({
                      ...prev,
                      caption: e.target.value
                    }))}
                    placeholder="Write your post caption..."
                    className="min-h-[200px]"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="image">Upload Media</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageChange}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, MP4, MOV
                    <br />
                    Maximum file size: 100MB
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <div className="space-y-4">
                    {/* Image Preview Container */}
                    <div className="w-full aspect-square rounded-lg overflow-hidden border bg-gray-100">
                      {preview ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Caption Preview */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-500">Caption Preview</div>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm min-h-[80px] max-h-[120px] overflow-y-auto">
                        {postData.useAI ? (
                          postData.prompt ? (
                            <span className="text-gray-600">{postData.prompt}</span>
                          ) : (
                            <span className="text-gray-400 italic">AI-generated caption will appear here...</span>
                          )
                        ) : (
                          postData.caption ? (
                            <span className="text-gray-600">{postData.caption}</span>
                          ) : (
                            <span className="text-gray-400 italic">Caption will appear here...</span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Optional: Platform-specific preview elements */}
                    {postData.location && (
                      <div className="text-sm text-gray-600">
                        📍 {postData.location}
                      </div>
                    )}
                    {postData.tags && (
                      <div className="text-sm text-blue-500">
                        {postData.tags.split(',').map((tag, index) => (
                          <span key={index} className="mr-2">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="scheduledDate">Schedule Date</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={postData.scheduledDate}
                    onChange={(e) => setPostData(prev => ({
                      ...prev,
                      scheduledDate: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="scheduledTime">Schedule Time</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={postData.scheduledTime}
                    onChange={(e) => setPostData(prev => ({
                      ...prev,
                      scheduledTime: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={postData.location}
                    onChange={(e) => setPostData(prev => ({
                      ...prev,
                      location: e.target.value
                    }))}
                    placeholder="Add location..."
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={postData.tags}
                    onChange={(e) => setPostData(prev => ({
                      ...prev,
                      tags: e.target.value
                    }))}
                    placeholder="Add tags (separated by commas)..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline">Save as Draft</Button>
            <Button className="px-8">
              Post {platform && `to ${platform}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}