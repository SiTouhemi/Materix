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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const [statsResponse, recentResponse] = await Promise.all([
        fetch("/api/admin/portfolio/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("/api/admin/portfolio/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      }

      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        if (recentData.success) {
          setRecentItems(recentData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "featured":
        return <Badge className="bg-purple-100 text-purple-800">Featured</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="space-y-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
        <Card className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Recent Portfolio Items</CardTitle>
            <CardDescription>
              Latest additions to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentItems.length > 0 ? (
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-500">
                          Created {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(item.status)}
                      <Link to={`/admin/portfolio/${item._id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">No portfolio items yet</p>
                <p className="text-sm text-slate-500 mb-4">
                  Start building your portfolio by adding your first item
                </p>
                <Link to="/admin/portfolio/new">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
