import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  ArrowLeft, 
  Save, 
  X,
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  BarChart3,
  User,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { Link, useLocation, Navigate, useParams } from "react-router";
import type { AdminData } from "@/types";

interface PortfolioImage {
  url: string;
  alt: string;
  isFeatured: boolean;
  order: number;
}

interface PortfolioItem {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  client: string;
  technologies: string[];
  images: PortfolioImage[];
  status: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  behanceUrl: string;
  projectDate: string;
  completionDate: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
  challenges: string[];
  solutions: string[];
  results: string[];
  tags: string[];
}

const AdminPortfolioEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    category: "",
    client: "",
    technologies: [] as string[],
    status: "draft",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    behanceUrl: "",
    projectDate: "",
    completionDate: "",
    images: [] as PortfolioImage[],
    testimonial: {
      text: "",
      author: "",
      position: "",
      company: "",
    },
    challenges: [] as string[],
    solutions: [] as string[],
    results: [] as string[],
    tags: [] as string[],
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newChallenge, setNewChallenge] = useState("");
  const [newSolution, setNewSolution] = useState("");
  const [newResult, setNewResult] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchPortfolioItem();
    }
  }, [isAuthenticated, id]);

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");
    const admin = localStorage.getItem("adminData");

    if (!token || !admin) {
      setIsAuthenticated(false);
      setAuthLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdminData(data.data);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchPortfolioItem = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const item = data.data;
        
        setFormData({
          name: item.name || "",
          description: item.description || "",
          shortDescription: item.shortDescription || "",
          category: item.category || "",
          client: item.client || "",
          technologies: item.technologies || [],
          status: item.status || "draft",
          featured: item.featured || false,
          liveUrl: item.liveUrl || "",
          githubUrl: item.githubUrl || "",
          behanceUrl: item.behanceUrl || "",
          projectDate: item.projectDate ? new Date(item.projectDate).toISOString().split('T')[0] : "",
          completionDate: item.completionDate ? new Date(item.completionDate).toISOString().split('T')[0] : "",
          images: item.images || [],
          testimonial: item.testimonial || { text: "", author: "", position: "", company: "" },
          challenges: item.challenges || [],
          solutions: item.solutions || [],
          results: item.results || [],
          tags: item.tags || [],
        });
      } else {
        setError("Failed to load portfolio item");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      setIsAuthenticated(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Portfolio item updated successfully!");
      } else {
        setError(data.message || "Failed to update portfolio item");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const addChallenge = () => {
    if (newChallenge.trim() && !formData.challenges.includes(newChallenge.trim())) {
      setFormData({
        ...formData,
        challenges: [...formData.challenges, newChallenge.trim()],
      });
      setNewChallenge("");
    }
  };

  const removeChallenge = (challenge: string) => {
    setFormData({
      ...formData,
      challenges: formData.challenges.filter((c) => c !== challenge),
    });
  };

  const addSolution = () => {
    if (newSolution.trim() && !formData.solutions.includes(newSolution.trim())) {
      setFormData({
        ...formData,
        solutions: [...formData.solutions, newSolution.trim()],
      });
      setNewSolution("");
    }
  };

  const removeSolution = (solution: string) => {
    setFormData({
      ...formData,
      solutions: formData.solutions.filter((s) => s !== solution),
    });
  };

  const addResult = () => {
    if (newResult.trim() && !formData.results.includes(newResult.trim())) {
      setFormData({
        ...formData,
        results: [...formData.results, newResult.trim()],
      });
      setNewResult("");
    }
  };

  const removeResult = (result: string) => {
    setFormData({
      ...formData,
      results: formData.results.filter((r) => r !== result),
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage: PortfolioImage = {
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || "Portfolio image",
        isFeatured: formData.images.length === 0, // First image is featured by default
        order: formData.images.length,
      };
      
      setFormData({
        ...formData,
        images: [...formData.images, newImage],
      });
      setNewImageUrl("");
      setNewImageAlt("");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    // If we removed the featured image, make the first remaining image featured
    if (updatedImages.length > 0 && formData.images[index].isFeatured) {
      updatedImages[0].isFeatured = true;
    }
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const setFeaturedImage = (index: number) => {
    const updatedImages = formData.images.map((img, i) => ({
      ...img,
      isFeatured: i === index,
    }));
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const uploadImageToCloudinary = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/portfolio/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newImage = {
          url: data.data.url,
          public_id: data.data.public_id,
          alt: file.name || "Portfolio image",
          isFeatured: formData.images.length === 0, // First image is featured by default
          order: formData.images.length,
          width: data.data.width,
          height: data.data.height,
          format: data.data.format,
          size: data.data.size,
        };
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, newImage]
        }));
        return data.data.url;
      } else {
        throw new Error(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadImageToCloudinary(file);
      } catch (error) {
        setError("Failed to upload image. Please try again.");
      }
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Portfolio",
      href: "/admin/portfolio",
      icon: Briefcase,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  if (authLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-white shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {adminData?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {adminData?.username || "admin"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Edit Portfolio Item</h1>
                <p className="text-sm text-slate-600">Update your portfolio item details</p>
              </div>
            </div>
            <Link
              to="/admin/portfolio"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {message && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your portfolio item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web_development">Web Development</SelectItem>
                        <SelectItem value="mobile_app">Mobile App</SelectItem>
                        <SelectItem value="ui_ux_design">UI/UX Design</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief description (max 200 characters)"
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed description of the project"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="Client name or company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Project Images</CardTitle>
                <CardDescription>
                  Add images to showcase your project. The first image will be featured by default.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Images */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Current Images</h4>
                  {formData.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-48 object-cover rounded-lg border border-slate-200"
                            onError={(e) => {
                              console.error("Image failed to load:", image.url);
                              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";
                            }}
                            onLoad={() => {
                              console.log("Image loaded successfully:", image.url);
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => setFeaturedImage(index)}
                                disabled={image.isFeatured}
                              >
                                {image.isFeatured ? "Featured" : "Set Featured"}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removeImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {image.isFeatured && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-yellow-500 text-white">Featured</Badge>
                            </div>
                          )}
                        </div>
                                              ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg">
                        <div className="text-slate-400 mb-2">
                          <ImageIcon className="h-12 w-12 mx-auto" />
                        </div>
                        <p className="text-slate-600">No images added yet</p>
                        <p className="text-sm text-slate-500">Add images below to showcase your project</p>
                      </div>
                    )}
                  </div>

                {/* Add New Image */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Add New Image</h4>
                  
                  {/* File Upload */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload">Upload Image File</Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          id="fileUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                        <label htmlFor="fileUpload" className="cursor-pointer">
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                            <div className="text-sm text-slate-600">
                              {uploadingImage ? (
                                <span>Uploading...</span>
                              ) : (
                                <span>Click to upload or drag and drop</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Or add by URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">Or add by URL</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageAlt">Alt Text</Label>
                      <Input
                        id="imageAlt"
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        placeholder="Description of the image"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addImage}
                    disabled={!newImageUrl.trim()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Add Image by URL</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
                <CardDescription>
                  List the technologies, frameworks, and tools used in this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add a technology (e.g., React, Node.js)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology} disabled={!newTechnology.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Additional information about the project timeline and links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectDate">Project Start Date</Label>
                    <Input
                      id="projectDate"
                      type="date"
                      value={formData.projectDate}
                      onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Input
                      id="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="behanceUrl">Behance URL</Label>
                    <Input
                      id="behanceUrl"
                      value={formData.behanceUrl}
                      onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                      placeholder="https://behance.net/project"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card>
              <CardHeader>
                <CardTitle>Client Testimonial</CardTitle>
                <CardDescription>
                  Add a testimonial from the client (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="testimonialText">Testimonial Text</Label>
                  <Textarea
                    id="testimonialText"
                    value={formData.testimonial.text}
                    onChange={(e) => setFormData({
                      ...formData,
                      testimonial: { ...formData.testimonial, text: e.target.value }
                    })}
                    placeholder="What the client said about the project..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="testimonialAuthor">Author Name</Label>
                    <Input
                      id="testimonialAuthor"
                      value={formData.testimonial.author}
                      onChange={(e) => setFormData({
                        ...formData,
                        testimonial: { ...formData.testimonial, author: e.target.value }
                      })}
                      placeholder="Client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonialPosition">Position</Label>
                    <Input
                      id="testimonialPosition"
                      value={formData.testimonial.position}
                      onChange={(e) => setFormData({
                        ...formData,
                        testimonial: { ...formData.testimonial, position: e.target.value }
                      })}
                      placeholder="Job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonialCompany">Company</Label>
                    <Input
                      id="testimonialCompany"
                      value={formData.testimonial.company}
                      onChange={(e) => setFormData({
                        ...formData,
                        testimonial: { ...formData.testimonial, company: e.target.value }
                      })}
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Project Analysis</CardTitle>
                <CardDescription>
                  Document the challenges, solutions, and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Challenges */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Challenges</h4>
                  <div className="flex space-x-2">
                    <Input
                      value={newChallenge}
                      onChange={(e) => setNewChallenge(e.target.value)}
                      placeholder="Add a challenge faced during the project"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addChallenge())}
                    />
                    <Button type="button" onClick={addChallenge} disabled={!newChallenge.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.challenges.length > 0 && (
                    <div className="space-y-2">
                      {formData.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm">{challenge}</span>
                          <button
                            type="button"
                            onClick={() => removeChallenge(challenge)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Solutions */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Solutions</h4>
                  <div className="flex space-x-2">
                    <Input
                      value={newSolution}
                      onChange={(e) => setNewSolution(e.target.value)}
                      placeholder="Add a solution implemented"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSolution())}
                    />
                    <Button type="button" onClick={addSolution} disabled={!newSolution.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.solutions.length > 0 && (
                    <div className="space-y-2">
                      {formData.solutions.map((solution, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm">{solution}</span>
                          <button
                            type="button"
                            onClick={() => removeSolution(solution)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Results</h4>
                  <div className="flex space-x-2">
                    <Input
                      value={newResult}
                      onChange={(e) => setNewResult(e.target.value)}
                      placeholder="Add a result or outcome"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResult())}
                    />
                    <Button type="button" onClick={addResult} disabled={!newResult.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.results.length > 0 && (
                    <div className="space-y-2">
                      {formData.results.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm">{result}</span>
                          <button
                            type="button"
                            onClick={() => removeResult(result)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help categorize and search for this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g., responsive, e-commerce, API)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link to="/admin/portfolio">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="flex items-center space-x-2">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isLoading ? "Updating..." : "Update Portfolio Item"}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolioEdit;
