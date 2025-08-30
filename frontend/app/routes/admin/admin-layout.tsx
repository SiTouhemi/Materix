import React, { useEffect, useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  BarChart3
} from "lucide-react";
import type { AdminData } from "@/types";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const admin = localStorage.getItem("adminData");

      if (!token || !admin) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
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
          // Token invalid, clear storage
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Admin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600"
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-slate-900 text-white"
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
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {adminData?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {adminData?.role || "Administrator"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-slate-600 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-600"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-lg font-semibold text-slate-900">Admin</span>
            <div className="w-8" />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
