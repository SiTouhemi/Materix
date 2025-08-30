import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Lock, Mail, LayoutDashboard, Settings, LogOut, Menu, X, BarChart3, Briefcase } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router";
import type { AdminData } from "@/types";

const AdminSettings = () => {
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
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
        // Pre-fill form with current data
        setFormData(prev => ({
          ...prev,
          name: data.data.name || "",
          email: data.data.email || "",
        }));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Profile updated successfully!");
        // Update stored admin data
        const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");
        adminData.name = formData.name;
        adminData.email = formData.email;
        localStorage.setItem("adminData", JSON.stringify(adminData));
        setAdminData(adminData);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password changed successfully!");
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setError(data.message || "Failed to change password");
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
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Settings
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your admin account settings and preferences.
              </p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 rounded-xl py-3"
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Password Settings */}
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Lock className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Change Password</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Update your account password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm font-semibold text-slate-700">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-600/25 rounded-xl py-3"
                    >
                      {isLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
