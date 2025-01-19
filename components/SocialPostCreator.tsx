import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Upload, X, Loader2, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const SocialPostCreator = () => {
  // State Management
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const { toast } = useToast();

  // Constants
  const maxCharacters = {
    instagram: 2200,
    twitter: 280,
    linkedin: 3000
  };

  const platformIcons = {
    instagram: <Instagram className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUserData(data);
      // Auto-select connected platforms
      const connectedPlatforms = Object.entries(data.social_configs || {})
        .filter(([_, config]) => config && Object.keys(config).length > 0)
        .map(([platform]) => platform);
      setSelectedPlatforms(connectedPlatforms);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    }
  };

  // Platform Management
  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const isPlatformConnected = (platform) => {
    if (!userData?.social_configs) return false;
    const config = userData.social_configs[platform.toLowerCase()];
    return config && Object.keys(config).length > 0;
  };

  // Image Handling
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  // Content Management
  const handlePromptChange = (e) => {
    const text = e.target.value;
    const minCharLimit = Math.min(...selectedPlatforms.map(p => maxCharacters[p.toLowerCase()]));
    if (text.length <= minCharLimit) {
      setPrompt(text);
      setCharacterCount(text.length);
    }
  };

  // Preview Generation
  const handlePreviewClick = async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to preview",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', prompt);
      if (image) formData.append('image', image);
      formData.append('platforms', JSON.stringify(selectedPlatforms));

      const response = await fetch('http://172.22.33.33:5000/generate', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${userData?.access_token}`
        }
      });

      if (!response.ok) throw new Error('Failed to generate preview');

      const data = await response.json();
      setPreviewContent(data.content);
      setPreviewGenerated(true);
      
      toast({
        title: "Success",
        description: "Preview generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate preview",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Publishing
  const handlePublish = async () => {
    if (!previewGenerated) {
      toast({
        title: "Generate Preview First",
        description: "Please preview your post before publishing",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', previewContent || prompt);
      if (image) formData.append('image', image);
      formData.append('platforms', JSON.stringify(selectedPlatforms));

      // Add platform-specific credentials
      selectedPlatforms.forEach(platform => {
        const credentials = userData?.social_configs?.[platform];
        if (credentials) {
          formData.append(`${platform}_credentials`, JSON.stringify(credentials));
        }
      });

      const response = await fetch('/api/publish-post', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${userData?.access_token}`
        }
      });

      if (!response.ok) throw new Error('Failed to publish post');

      toast({
        title: "Success",
        description: "Post published successfully!",
      });

      // Reset form
      setPrompt('');
      setImage(null);
      setImagePreview('');
      setPreviewContent('');
      setPreviewGenerated(false);
      setCharacterCount(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle>Select Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Instagram', 'Twitter', 'LinkedIn'].map(platform => {
              const isConnected = isPlatformConnected(platform.toLowerCase());
              const isSelected = selectedPlatforms.includes(platform.toLowerCase());
              return (
                <Button
                  key={platform}
                  variant={isSelected ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                  onClick={() => isConnected && togglePlatform(platform.toLowerCase())}
                  disabled={!isConnected}
                >
                  {platformIcons[platform.toLowerCase()]}
                  <span>{platform}</span>
                  {!isConnected && (
                    <Badge variant="outline" className="ml-2">Not Connected</Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Post Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content Input */}
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                placeholder="Write your post content..."
                value={prompt}
                onChange={handlePromptChange}
                className="min-h-32 resize-none"
              />
              <p className="text-sm text-gray-500 text-right">
                {characterCount}/{selectedPlatforms.length > 0 
                  ? Math.min(...selectedPlatforms.map(p => maxCharacters[p]))
                  : "0"} characters
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image</Label>
              {!image ? (
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
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
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={handlePreviewClick}
                disabled={!prompt || selectedPlatforms.length === 0 || isLoading}
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
                onClick={handlePublish}
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

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social">
              <TabsList className="mb-4">
                <TabsTrigger value="social">Social Preview</TabsTrigger>
                <TabsTrigger value="seo">SEO Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="social" className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <>
                    {!previewGenerated ? (
                      <Alert>
                        <AlertDescription>
                          Click the Preview button to generate a preview of your post
                        </AlertDescription>
                      </Alert>
                    ) : (
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
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="seo">
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p><strong>Title Preview:</strong> {prompt.slice(0, 60)}...</p>
                      <p><strong>Description Preview:</strong> {prompt.slice(0, 155)}...</p>
                      <p><strong>URL Preview:</strong> your-website.com/posts/{prompt.slice(0, 30).toLowerCase().replace(/\s+/g, '-')}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialPostCreator;