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
import { Link, useLocation, Navigate } from "react-router";
import type { AdminData } from "@/types";

const AdminPortfolioNew = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    images: [] as Array<{
      url: string;
      alt: string;
      isFeatured: boolean;
      order: number;
    }>,
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

  useEffect(() => {
    checkAuth();
  }, []);

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
      window.location.href = "/admin/login";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addChallenge = () => {
    if (newChallenge.trim() && !formData.challenges.includes(newChallenge.trim())) {
      setFormData(prev => ({
        ...prev,
        challenges: [...prev.challenges, newChallenge.trim()]
      }));
      setNewChallenge("");
    }
  };

  const removeChallenge = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.filter(c => c !== challenge)
    }));
  };

  const addSolution = () => {
    if (newSolution.trim() && !formData.solutions.includes(newSolution.trim())) {
      setFormData(prev => ({
        ...prev,
        solutions: [...prev.solutions, newSolution.trim()]
      }));
      setNewSolution("");
    }
  };

  const removeSolution = (solution: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.filter(s => s !== solution)
    }));
  };

  const addResult = () => {
    if (newResult.trim() && !formData.results.includes(newResult.trim())) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, newResult.trim()]
      }));
      setNewResult("");
    }
  };

  const removeResult = (result: string) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter(r => r !== result)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage = {
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || "Portfolio image",
        isFeatured: formData.images.length === 0, // First image is featured by default
        order: formData.images.length,
      };
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
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
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const setFeaturedImage = (index: number) => {
    const updatedImages = formData.images.map((img, i) => ({
      ...img,
      isFeatured: i === index,
    }));
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Portfolio item created successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          shortDescription: "",
          category: "",
          client: "",
          technologies: [],
          status: "draft",
          featured: false,
          liveUrl: "",
          githubUrl: "",
          behanceUrl: "",
          projectDate: "",
          completionDate: "",
        });
      } else {
        setError(data.message || "Failed to create portfolio item");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
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

  if (authLoading) {
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
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {adminData?.name || "System Administrator"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {adminData?.role || "super_admin"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-white border-slate-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">Admin</span>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/admin/portfolio">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Portfolio
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                    Create Portfolio Item
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Add a new project to your portfolio
                  </p>
                </div>
              </div>
            </div>

            {message && (
              <Alert className="border-green-200 bg-green-50 rounded-xl">
                <AlertDescription className="text-green-800 font-medium">{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="rounded-xl">
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <span>Basic Information</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Essential details about your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Project Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter project name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription" className="text-sm font-semibold text-slate-700">
                        Short Description
                      </Label>
                      <Input
                        id="shortDescription"
                        name="shortDescription"
                        type="text"
                        placeholder="Brief description (max 200 characters)"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        maxLength={200}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-semibold text-slate-700">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                        <SelectTrigger className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500">
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

                    <div className="space-y-2">
                      <Label htmlFor="client" className="text-sm font-semibold text-slate-700">
                        Client
                      </Label>
                      <Input
                        id="client"
                        name="client"
                        type="text"
                        placeholder="Client name or company"
                        value={formData.client}
                        onChange={handleInputChange}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Project Details */}
                <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Save className="h-5 w-5 text-green-600" />
                      </div>
                      <span>Project Details</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Additional project information and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-semibold text-slate-700">
                        Status
                      </Label>
                      <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={handleCheckboxChange}
                        className="rounded border-slate-300"
                      />
                      <Label htmlFor="featured" className="text-sm font-medium text-slate-700">
                        Featured Project
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDate" className="text-sm font-semibold text-slate-700">
                        Project Start Date
                      </Label>
                      <Input
                        id="projectDate"
                        name="projectDate"
                        type="date"
                        value={formData.projectDate}
                        onChange={handleInputChange}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completionDate" className="text-sm font-semibold text-slate-700">
                        Completion Date
                      </Label>
                      <Input
                        id="completionDate"
                        name="completionDate"
                        type="date"
                        value={formData.completionDate}
                        onChange={handleInputChange}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Images */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Project Images</CardTitle>
                  <CardDescription className="text-slate-600">
                    Add images to showcase your project. The first image will be featured by default.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Images */}
                  {formData.images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">Current Images</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-48 object-cover rounded-lg border border-slate-200"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
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
                    </div>
                  )}

                  {/* Add New Image */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Add New Image</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl" className="text-sm font-semibold text-slate-700">Image URL *</Label>
                        <Input
                          id="imageUrl"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imageAlt" className="text-sm font-semibold text-slate-700">Alt Text</Label>
                        <Input
                          id="imageAlt"
                          value={newImageAlt}
                          onChange={(e) => setNewImageAlt(e.target.value)}
                          placeholder="Description of the image"
                          className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={addImage}
                      disabled={!newImageUrl.trim()}
                      className="flex items-center space-x-2 rounded-xl"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Add Image</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Technologies Used</CardTitle>
                  <CardDescription className="text-slate-600">
                    Add the technologies and tools used in this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add technology (e.g., React, Node.js)"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      onClick={addTechnology}
                      variant="outline"
                      className="rounded-xl"
                    >
                      Add
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

              {/* Description */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Project Description</CardTitle>
                  <CardDescription className="text-slate-600">
                    Detailed description of your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your project in detail..."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Project Links</CardTitle>
                  <CardDescription className="text-slate-600">
                    Add links to live demo, GitHub, or other resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl" className="text-sm font-semibold text-slate-700">
                      Live Demo URL
                    </Label>
                    <Input
                      id="liveUrl"
                      name="liveUrl"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="text-sm font-semibold text-slate-700">
                      GitHub Repository
                    </Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="behanceUrl" className="text-sm font-semibold text-slate-700">
                      Behance/Dribbble Link
                    </Label>
                    <Input
                      id="behanceUrl"
                      name="behanceUrl"
                      type="url"
                      placeholder="https://behance.net/project"
                      value={formData.behanceUrl}
                      onChange={handleInputChange}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Client Testimonial</CardTitle>
                  <CardDescription className="text-slate-600">
                    Add a testimonial from the client (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="testimonialText" className="text-sm font-semibold text-slate-700">Testimonial Text</Label>
                    <Textarea
                      id="testimonialText"
                      value={formData.testimonial.text}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        testimonial: { ...prev.testimonial, text: e.target.value }
                      }))}
                      placeholder="What the client said about the project..."
                      rows={3}
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="testimonialAuthor" className="text-sm font-semibold text-slate-700">Author Name</Label>
                      <Input
                        id="testimonialAuthor"
                        value={formData.testimonial.author}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          testimonial: { ...prev.testimonial, author: e.target.value }
                        }))}
                        placeholder="Client name"
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testimonialPosition" className="text-sm font-semibold text-slate-700">Position</Label>
                      <Input
                        id="testimonialPosition"
                        value={formData.testimonial.position}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          testimonial: { ...prev.testimonial, position: e.target.value }
                        }))}
                        placeholder="Job title"
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testimonialCompany" className="text-sm font-semibold text-slate-700">Company</Label>
                      <Input
                        id="testimonialCompany"
                        value={formData.testimonial.company}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          testimonial: { ...prev.testimonial, company: e.target.value }
                        }))}
                        placeholder="Company name"
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Analysis */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Project Analysis</CardTitle>
                  <CardDescription className="text-slate-600">
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
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button type="button" onClick={addChallenge} disabled={!newChallenge.trim()} className="rounded-xl">
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
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button type="button" onClick={addSolution} disabled={!newSolution.trim()} className="rounded-xl">
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
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button type="button" onClick={addResult} disabled={!newResult.trim()} className="rounded-xl">
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
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                  <CardDescription className="text-slate-600">
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
                      className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button type="button" onClick={addTag} disabled={!newTag.trim()} className="rounded-xl">
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
                  <Button variant="outline" className="rounded-xl px-6 py-3">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 rounded-xl px-6 py-3"
                >
                  {isLoading ? "Creating..." : "Create Portfolio Item"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPortfolioNew;
