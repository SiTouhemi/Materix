import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Filter
} from "lucide-react";
import { Link } from "react-router";

interface PortfolioItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
  createdBy: {
    name: string;
    username: string;
  };
}

const AdminPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.data.portfolioItems);
      }
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPortfolioItems(prev => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/portfolio/${id}/toggle-featured`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPortfolioItems(prev => 
          prev.map(item => 
            item._id === id 
              ? { ...item, featured: !item.featured }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="rounded-lg">
              ← Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Portfolio Management</h1>
            <p className="text-slate-600 mt-1">
              Manage your portfolio items and showcase your work
            </p>
          </div>
        </div>
        <Link to="/admin/portfolio/new">
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Portfolio Item
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search portfolio items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Items */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchTerm || statusFilter !== "all" ? "No items found" : "No portfolio items yet"}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "Get started by creating your first portfolio item"
              }
            </p>
            <Link to="/admin/portfolio/new">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create First Item
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {item.description}
                    </CardDescription>
                  </div>
                  {item.featured && (
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Category:</span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status:</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Created:</span>
                    <span className="text-sm text-slate-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFeatured(item._id)}
                      className="flex-1"
                    >
                      <Star className={`h-4 w-4 mr-1 ${item.featured ? 'text-yellow-500 fill-current' : ''}`} />
                      {item.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Link to={`/admin/portfolio/${item._id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
