import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  Github,
  Calendar,
  Filter,
  Star
} from "lucide-react";
import { Link } from "react-router";

interface PortfolioItem {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  status: string;
  featured: boolean;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  projectDate?: string;
  completionDate?: string;
  createdAt: string;
}

const PublicPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch("/api/portfolio");
      
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data.data.portfolioItems || []);
      }
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      web_development: "Web Development",
      mobile_app: "Mobile App",
      ui_ux_design: "UI/UX Design",
      branding: "Branding",
      marketing: "Marketing",
      other: "Other"
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      web_development: "bg-blue-100 text-blue-800 border-blue-200",
      mobile_app: "bg-green-100 text-green-800 border-green-200",
      ui_ux_design: "bg-purple-100 text-purple-800 border-purple-200",
      branding: "bg-orange-100 text-orange-800 border-orange-200",
      marketing: "bg-pink-100 text-pink-800 border-pink-200",
      other: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesFeatured = !showOnlyFeatured || item.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Portfolio
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our latest projects and creative work
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border-0 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="web_development">Web Development</option>
              <option value="mobile_app">Mobile App</option>
              <option value="ui_ux_design">UI/UX Design</option>
              <option value="branding">Branding</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>

            {/* Featured Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={showOnlyFeatured}
                onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                className="rounded border-slate-300"
              />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                Featured Only
              </label>
            </div>

            {/* Results Count */}
            <div className="text-sm text-slate-600 flex items-center">
              {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item._id} className="bg-white shadow-lg shadow-slate-200/50 border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(item.category)}>
                      {getCategoryLabel(item.category)}
                    </Badge>
                    {item.featured && (
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                    {item.name}
                  </CardTitle>
                  {item.shortDescription && (
                    <CardDescription className="text-slate-600 text-sm">
                      {item.shortDescription}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Description */}
                  <p className="text-slate-700 text-sm line-clamp-3">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  {item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs">
                          +{item.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Dates */}
                  {(item.projectDate || item.completionDate) && (
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.projectDate && item.completionDate ? (
                        <span>{formatDate(item.projectDate)} - {formatDate(item.completionDate)}</span>
                      ) : item.completionDate ? (
                        <span>Completed {formatDate(item.completionDate)}</span>
                      ) : (
                        <span>Started {formatDate(item.projectDate)}</span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center space-x-2 pt-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-slate-600 hover:text-slate-800 text-sm font-medium"
                      >
                        <Github className="h-3 w-3" />
                        <span>Code</span>
                      </a>
                    )}
                    {item.behanceUrl && (
                      <a
                        href={item.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        <span>Behance</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline" className="rounded-xl px-6 py-3">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;
