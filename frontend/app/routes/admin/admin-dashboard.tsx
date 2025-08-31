import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Eye, 
  Star, 
  FileText, 
  Plus, 
  TrendingUp,
  Calendar,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Users
} from "lucide-react";
import { Link, useLocation, Navigate } from "react-router";
import type { AdminData } from "@/types";

interface DashboardStats {
  totalPortfolioItems: number;
  publishedItems: number;
  draftItems: number;
  featuredItems: number;
}

interface RecentItem {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

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

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.stats);
        setRecentItems(data.data.recentItems);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      name: "Users",
      href: "/admin/users",
      icon: Users,
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
        <main className="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-base sm:text-lg">
                  Welcome back! Here's what's happening with your portfolio.
                </p>
              </div>
              <Link to="/admin/portfolio/new">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Add Portfolio Item
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Total Items
                  </CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    {stats?.totalPortfolioItems || 0}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Portfolio items created
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Published
                  </CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                    {stats?.publishedItems || 0}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Live on website
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Featured
                  </CardTitle>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">
                    {stats?.featuredItems || 0}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Highlighted items
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    Drafts
                  </CardTitle>
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    {stats?.draftItems || 0}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Work in progress
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <span>Recent Portfolio Items</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Latest items added to your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentItems.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium mb-3 sm:mb-4 text-sm sm:text-base">No portfolio items yet</p>
                      <Link to="/admin/portfolio/new">
                        <Button variant="outline" className="rounded-xl px-4 sm:px-6 text-sm sm:text-base">
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Create First Item
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {recentItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">{item.name}</h4>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              {getStatusBadge(item.status)}
                              <span className="text-xs text-slate-500">
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                          </div>
                          <Link to={`/admin/portfolio/${item._id}`}>
                            <Button variant="ghost" size="sm" className="rounded-lg">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <Link to="/admin/portfolio/new">
                      <Button variant="outline" className="w-full justify-start rounded-xl py-2 sm:py-3 border-slate-200 hover:bg-slate-50 text-sm sm:text-base">
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                        Add New Portfolio Item
                      </Button>
                    </Link>
                    <Link to="/admin/portfolio">
                      <Button variant="outline" className="w-full justify-start rounded-xl py-2 sm:py-3 border-slate-200 hover:bg-slate-50 text-sm sm:text-base">
                        <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                        Manage Portfolio
                      </Button>
                    </Link>
                    <Link to="/admin/settings">
                      <Button variant="outline" className="w-full justify-start rounded-xl py-2 sm:py-3 border-slate-200 hover:bg-slate-50 text-sm sm:text-base">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                        Profile Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
