import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Eye, Star, LayoutDashboard, Settings, LogOut, Menu, X, Briefcase } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import type { AdminData } from "@/types";

const AdminAnalytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
                <Users className="h-5 w-5 text-white" />
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
                Analytics
              </h1>
              <p className="text-slate-600 text-lg">
                View detailed analytics and insights about your portfolio.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Total Views
                  </CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    1,234
                  </div>
                  <p className="text-sm text-slate-500">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Unique Visitors
                  </CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    567
                  </div>
                  <p className="text-sm text-slate-500">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Engagement Rate
                  </CardTitle>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    78%
                  </div>
                  <p className="text-sm text-slate-500">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Featured Items
                  </CardTitle>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    12
                  </div>
                  <p className="text-sm text-slate-500">
                    Currently featured
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Monthly Views</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Portfolio view trends over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="font-medium">Chart visualization coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Popular Items</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Most viewed portfolio items this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Project Alpha</h4>
                        <p className="text-sm text-slate-500">Web Development</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">245 views</p>
                        <p className="text-xs text-green-600 font-medium">+15%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Project Beta</h4>
                        <p className="text-sm text-slate-500">Mobile App</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">189 views</p>
                        <p className="text-xs text-green-600 font-medium">+8%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Project Gamma</h4>
                        <p className="text-sm text-slate-500">UI/UX Design</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">156 views</p>
                        <p className="text-xs text-green-600 font-medium">+22%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon Notice */}
            <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                <CardDescription className="text-slate-600">
                  More detailed analytics features are coming soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Advanced Analytics Coming Soon
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                    We're working on bringing you more detailed analytics including 
                    visitor demographics, conversion tracking, and performance insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
