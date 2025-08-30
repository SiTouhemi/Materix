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
  Star,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Code,
  Palette,
  Smartphone,
  Globe,
  Zap,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Quote,
  Send,
  Phone,
  MapPin,
  Sparkles,
  Layers,
  Database,
  Server,
  Monitor,
  Cpu,
  Cloud,
  Rocket,
  Target,
  Award,
  TrendingUp,
  Play,
  ChevronRight,
  MousePointer,
  Eye,
  Heart,
  MessageCircle
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

const Homepage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchPortfolioItems();
    
    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      web_development: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
      mobile_app: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      ui_ux_design: "bg-gradient-to-r from-purple-500 to-violet-600 text-white",
      branding: "bg-gradient-to-r from-orange-500 to-amber-600 text-white",
      marketing: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
      other: "bg-gradient-to-r from-slate-500 to-gray-600 text-white"
    };
    return colors[category] || "bg-gradient-to-r from-slate-500 to-gray-600 text-white";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Featured projects for showcase
  const featuredProjects = portfolioItems.filter(item => item.featured).slice(0, 6);

  const technologies = [
    { name: "React", category: "Frontend", level: 95, icon: "⚛️" },
    { name: "TypeScript", category: "Frontend", level: 90, icon: "📘" },
    { name: "Node.js", category: "Backend", level: 88, icon: "🟢" },
    { name: "MongoDB", category: "Database", level: 85, icon: "🍃" },
    { name: "PostgreSQL", category: "Database", level: 82, icon: "🐘" },
    { name: "AWS", category: "Cloud", level: 80, icon: "☁️" },
    { name: "Docker", category: "DevOps", level: 78, icon: "🐳" },
    { name: "GraphQL", category: "API", level: 75, icon: "🔗" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 animate-pulse"></div>
          </div>
          <p className="mt-6 text-amber-100 font-medium text-lg">Loading amazing experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-50/90 backdrop-blur-xl border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg neon-glow">
                <span className="text-white font-mono font-bold text-xl">M</span>
              </div>
              <span className="text-3xl font-display font-bold text-gradient">Materix</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-amber-800 hover:text-orange-600 font-heading font-medium transition-colors text-shadow">Services</a>
              <a href="#portfolio" className="text-amber-800 hover:text-orange-600 font-heading font-medium transition-colors text-shadow">Portfolio</a>
              <a href="#technologies" className="text-amber-800 hover:text-orange-600 font-heading font-medium transition-colors text-shadow">Technologies</a>
              <a href="#contact" className="text-amber-800 hover:text-orange-600 font-heading font-medium transition-colors text-shadow">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost" className="text-amber-800 hover:text-orange-600 font-heading font-medium text-shadow">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-heading neon-glow">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-100 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d97706_0a_1px,transparent_1px),linear-gradient(to_bottom,#d97706_0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-400/30 to-orange-600/30 rounded-3xl rotate-45 animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-orange-400/30 to-red-600/30 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-red-400/30 to-amber-600/30 rounded-2xl rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-orange-400/30 to-amber-600/30 rounded-full animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-8 py-4 rounded-full glass-effect border border-amber-300/50 shadow-lg mb-8 animate-fade-in neon-glow">
            <Sparkles className="h-5 w-5 text-amber-600 mr-3" />
            <span className="text-sm font-mono font-semibold text-amber-900 text-shadow">Premium Web Development Services</span>
          </div>
          
          {/* Main Headline with Gradient Text */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-tight mb-8 text-shadow-lg">
            <span className="block text-gradient">
              We Build
            </span>
            <span className="block text-gradient-alt" style={{ animationDelay: '0.5s' }}>
              Digital
            </span>
            <span className="block text-gradient" style={{ animationDelay: '1s' }}>
              Excellence
            </span>
          </h1>
          
          {/* Subtext with Typewriter Effect */}
          <p className="text-xl md:text-2xl text-amber-800 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up font-heading text-shadow" style={{ animationDelay: '1.5s' }}>
            Transform your business with cutting-edge web applications, stunning designs, and scalable solutions that drive real results.
          </p>
          
          {/* CTA Buttons with Enhanced Styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '2s' }}>
            <Link to="#portfolio">
              <Button className="group relative bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white px-12 py-6 text-xl font-heading font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-2xl overflow-hidden neon-glow">
                <span className="relative z-10 flex items-center">
                  View Our Work
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link to="#contact">
              <Button variant="outline" className="group border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-12 py-6 text-xl font-heading font-semibold transition-all duration-300 rounded-2xl backdrop-blur-sm bg-amber-50/80 glass-effect">
                <span className="flex items-center">
                  Start Your Project
                  <Rocket className="h-5 w-5 ml-2 group-hover:translate-y-[-2px] transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '2.5s' }}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-2">50+</div>
              <div className="text-amber-800 font-heading font-medium text-shadow">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold text-gradient-alt mb-2">100%</div>
              <div className="text-amber-800 font-heading font-medium text-shadow">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-2">24/7</div>
              <div className="text-amber-800 font-heading font-medium text-shadow">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold text-gradient-alt mb-2">5★</div>
              <div className="text-amber-800 font-heading font-medium text-shadow">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-br from-amber-50 to-orange-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-amber-200 mb-6 neon-glow">
              <Target className="h-5 w-5 text-amber-600 mr-3" />
              <span className="text-sm font-mono font-semibold text-amber-800 text-shadow">Our Expertise</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-gradient mb-6 text-shadow-lg">
              Premium Services
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed font-heading text-shadow">
              We deliver world-class digital solutions that transform businesses and create exceptional user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <Card className="group relative bg-amber-50/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-display font-bold text-amber-900 mb-4 group-hover:text-amber-600 transition-colors duration-300 text-shadow">
                  Web Development
                </CardTitle>
                <CardDescription className="text-amber-800 text-base leading-relaxed font-heading">
                  Modern, responsive websites built with React, Node.js, and cutting-edge technologies. From simple landing pages to complex web applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-amber-100 text-amber-800 border-0">React</Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-0">Node.js</Badge>
                  <Badge className="bg-red-100 text-red-800 border-0">TypeScript</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-amber-600 hover:text-amber-700 p-0 h-auto font-mono font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* UI/UX Design */}
            <Card className="group relative bg-orange-50/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  UI/UX Design
                </CardTitle>
                <CardDescription className="text-amber-800 text-base leading-relaxed">
                  Beautiful, intuitive user interfaces and seamless user experiences that engage your audience and drive conversions.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-orange-100 text-orange-800 border-0">Figma</Badge>
                  <Badge className="bg-red-100 text-red-800 border-0">Adobe XD</Badge>
                  <Badge className="bg-amber-100 text-amber-800 border-0">Sketch</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-orange-600 hover:text-orange-700 p-0 h-auto font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Mobile Apps */}
            <Card className="group relative bg-red-50/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  Mobile Apps
                </CardTitle>
                <CardDescription className="text-amber-800 text-base leading-relaxed">
                  Native and cross-platform mobile applications that provide exceptional user experiences across all devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-red-100 text-red-800 border-0">React Native</Badge>
                  <Badge className="bg-amber-100 text-amber-800 border-0">Flutter</Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-0">Swift</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-red-600 hover:text-red-700 p-0 h-auto font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* E-commerce Solutions */}
            <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  E-commerce Solutions
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Complete online store solutions with secure payment processing, inventory management, and customer analytics.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-orange-100 text-orange-800 border-0">Shopify</Badge>
                  <Badge className="bg-amber-100 text-amber-800 border-0">WooCommerce</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">Stripe</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-orange-600 hover:text-orange-700 p-0 h-auto font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* API Integrations */}
            <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  API Integrations
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Seamless integration with third-party services, payment gateways, and business tools to streamline your operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-indigo-100 text-indigo-800 border-0">REST API</Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-0">GraphQL</Badge>
                  <Badge className="bg-cyan-100 text-cyan-800 border-0">WebSockets</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-indigo-600 hover:text-indigo-700 p-0 h-auto font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Maintenance & Support */}
            <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  Maintenance & Support
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  Ongoing maintenance, updates, and technical support to keep your website running smoothly and securely.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-red-100 text-red-800 border-0">24/7 Support</Badge>
                  <Badge className="bg-pink-100 text-pink-800 border-0">Security Updates</Badge>
                  <Badge className="bg-rose-100 text-rose-800 border-0">Performance</Badge>
                </div>
                <Button variant="ghost" className="group/btn text-red-600 hover:text-red-700 p-0 h-auto font-semibold">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-32 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,.1)_50%,transparent_65%)] bg-[length:20px_20px] animate-slide"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect-dark border border-white/20 mb-6 neon-glow">
              <Cpu className="h-5 w-5 text-amber-300 mr-3" />
              <span className="text-sm font-mono font-semibold text-amber-200 text-shadow">Technology Stack</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6 text-shadow-lg">
              Cutting-Edge
              <span className="block text-gradient">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed font-heading text-shadow">
              We use the latest and most powerful technologies to build scalable, performant, and future-proof solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <Card key={tech.name} className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-1" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-mono font-bold text-white mb-2 text-shadow">{tech.name}</h3>
                  <p className="text-sm text-amber-200 mb-4 font-heading">{tech.category}</p>
                  
                  {/* Skill Level Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-1000 group-hover:from-amber-300 group-hover:to-orange-300"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-amber-300 font-mono font-medium">{tech.level}% Proficiency</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-gradient-to-br from-orange-50 to-red-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-orange-200 mb-6 neon-glow">
              <Briefcase className="h-5 w-5 text-orange-600 mr-3" />
              <span className="text-sm font-mono font-semibold text-orange-800 text-shadow">Featured Work</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-gradient mb-6 text-shadow-lg">
              Our Portfolio
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed font-heading text-shadow">
              Explore our latest projects and see how we've helped businesses achieve their digital goals with innovative solutions.
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Briefcase className="h-16 w-16 text-amber-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-amber-900 mb-4 text-shadow-lg">Amazing Projects Coming Soon</h3>
              <p className="text-amber-700 text-lg mb-8 font-heading text-shadow">We're currently working on some incredible projects that will be showcased here.</p>
              <Link to="/sign-up">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-heading font-semibold shadow-xl rounded-2xl neon-glow">
                  Be the First to See Them
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((item, index) => (
                <Card key={item._id} className="group relative bg-amber-50/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-3" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </div>
                    </div>
                  )}
                  
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-200 to-orange-300 group-hover:from-amber-300 group-hover:to-orange-400 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Monitor className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>
                    
                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex space-x-3">
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 backdrop-blur-sm text-slate-900 p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 backdrop-blur-sm text-slate-900 p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="relative p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${getCategoryColor(item.category)} text-sm font-medium px-3 py-1 rounded-full shadow-lg`}>
                        {getCategoryLabel(item.category)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-display font-bold text-amber-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 text-shadow">
                      {item.name}
                    </CardTitle>
                    {item.shortDescription && (
                      <CardDescription className="text-amber-800 text-sm leading-relaxed font-heading">
                        {item.shortDescription}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="relative p-6 pt-0">
                    {/* Technologies */}
                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            +{item.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>1.2k views</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          <span>89 likes</span>
                        </div>
                      </div>
                      {item.completionDate && (
                        <span>{formatDate(item.completionDate)}</span>
                      )}
                    </div>

                    {/* View Project Button */}
                    <Button className="w-full bg-gradient-to-r from-amber-900 to-orange-900 hover:from-orange-900 hover:to-red-900 text-white font-mono font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn neon-glow">
                      <span className="flex items-center justify-center">
                        View Project
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <Link to="/sign-in">
              <Button className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 text-xl font-heading font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-2xl neon-glow">
                <span className="flex items-center">
                  Explore All Projects
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gradient-to-br from-amber-50 to-orange-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-amber-200 mb-6 neon-glow">
              <Award className="h-5 w-5 text-amber-600 mr-3" />
              <span className="text-sm font-mono font-semibold text-amber-800 text-shadow">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-gradient mb-6 text-shadow-lg">
              Excellence Delivered
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed font-heading text-shadow">
              We combine technical expertise with creative vision to deliver exceptional results that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center space-y-6 p-8 rounded-3xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 neon-glow">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-display font-bold text-amber-900 group-hover:text-amber-600 transition-colors duration-300 text-shadow">Modern Technologies</h3>
              <p className="text-amber-800 leading-relaxed font-heading">Built with the latest frameworks and tools for optimal performance and scalability.</p>
            </div>

            <div className="group text-center space-y-6 p-8 rounded-3xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 transition-all duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 neon-glow">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-display font-bold text-amber-900 group-hover:text-orange-600 transition-colors duration-300 text-shadow">Lightning Fast</h3>
              <p className="text-amber-800 leading-relaxed font-heading">Quick turnaround times without compromising on quality or attention to detail.</p>
            </div>

            <div className="group text-center space-y-6 p-8 rounded-3xl hover:bg-gradient-to-br hover:from-red-50 hover:to-amber-50 transition-all duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:shadow-red-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 neon-glow">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-display font-bold text-amber-900 group-hover:text-red-600 transition-colors duration-300 text-shadow">Collaborative</h3>
              <p className="text-amber-800 leading-relaxed font-heading">We work closely with you throughout the entire process to ensure your vision is realized.</p>
            </div>

            <div className="group text-center space-y-6 p-8 rounded-3xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 neon-glow">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-display font-bold text-amber-900 group-hover:text-amber-600 transition-colors duration-300 text-shadow">Results Driven</h3>
              <p className="text-amber-800 leading-relaxed font-heading">Transparent pricing with no hidden costs and excellent value for your investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect-dark border border-white/20 mb-6 neon-glow">
              <Quote className="h-5 w-5 text-amber-300 mr-3" />
              <span className="text-sm font-mono font-semibold text-amber-200 text-shadow">Client Testimonials</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6 text-shadow-lg">
              What Our Clients
              <span className="block text-gradient">
                Are Saying
              </span>
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed font-heading text-shadow">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">J</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg text-shadow">John Smith</h4>
                    <p className="text-amber-200 text-sm font-heading">CEO, TechStart Inc.</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-amber-100 italic text-lg leading-relaxed font-heading">
                  "The team delivered an exceptional e-commerce website that exceeded our expectations. The attention to detail and user experience is outstanding."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg text-shadow">Sarah Johnson</h4>
                    <p className="text-amber-200 text-sm font-heading">Founder, Creative Agency</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-amber-100 italic text-lg leading-relaxed font-heading">
                  "Professional, responsive, and incredibly talented. They transformed our vision into a beautiful, functional website that our clients love."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 rounded-3xl overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg text-shadow">Mike Chen</h4>
                    <p className="text-amber-200 text-sm font-heading">Product Manager, StartupXYZ</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-amber-100 italic text-lg leading-relaxed font-heading">
                  "Fast delivery, excellent communication, and a final product that perfectly matches our requirements. Highly recommended!"
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-8 py-4 rounded-full glass-effect border border-white/30 mb-8 neon-glow">
            <Rocket className="h-6 w-6 text-white mr-3" />
            <span className="text-white font-mono font-semibold text-shadow">Ready to Launch?</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-8 text-shadow-lg">
            Let's Build Something
            <span className="block text-gradient">
              Extraordinary
            </span>
          </h2>
          
          <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-16 leading-relaxed font-heading text-shadow">
            Ready to transform your digital presence? Get in touch with us and let's discuss how we can help bring your vision to life.
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-display font-bold text-white mb-2 text-shadow">Email Us</h3>
                <p className="text-amber-100 font-mono">hello@materix.com</p>
              </div>
            </div>
            
            <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-display font-bold text-white mb-2 text-shadow">Call Us</h3>
                <p className="text-amber-100 font-mono">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-display font-bold text-white mb-2 text-shadow">Visit Us</h3>
                <p className="text-amber-100 font-mono">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/sign-up">
              <Button className="group relative bg-white text-amber-600 hover:bg-amber-50 px-12 py-6 text-xl font-heading font-bold shadow-2xl hover:shadow-white/25 transition-all duration-500 rounded-2xl overflow-hidden neon-glow">
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" className="group border-2 border-white text-white hover:bg-white hover:text-amber-600 px-12 py-6 text-xl font-heading font-bold transition-all duration-500 rounded-2xl backdrop-blur-sm glass-effect">
                <span className="flex items-center">
                  Schedule a Call
                  <Calendar className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,.02)_50%,transparent_65%)] bg-[length:20px_20px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-xl neon-glow">
                  <span className="text-white font-mono font-bold text-xl">M</span>
                </div>
                <span className="text-3xl font-display font-bold text-gradient">Materix</span>
              </div>
              <p className="text-slate-300 mb-8 max-w-md text-lg leading-relaxed font-heading">
                Professional web development and design services. We build fast, modern, and scalable websites that help businesses succeed online.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="group w-12 h-12 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="group w-12 h-12 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="group w-12 h-12 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Mail className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-white mb-6 text-lg text-shadow">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Web Development
                </a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  UI/UX Design
                </a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Mobile Apps
                </a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  E-commerce
                </a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-white mb-6 text-lg text-shadow">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/sign-in" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Sign In
                </Link></li>
                <li><Link to="/sign-up" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Create Account
                </Link></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  About Us
                </a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Contact
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-slate-400 mb-4 md:mb-0">
                © 2024 Materix. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link to="/sign-up">
          <Button className="group w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-110 neon-glow animate-pulse-glow">
            <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
        }
        
        .font-heading {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 800;
          letter-spacing: -0.025em;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 25%, #dc2626 50%, #ea580c 75%, #f59e0b 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        
        .text-gradient-alt {
          background: linear-gradient(135deg, #dc2626 0%, #ea580c 25%, #f59e0b 50%, #ea580c 75%, #dc2626 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite reverse;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-effect-dark {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .neon-glow {
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.1);
        }
        
        .neon-glow:hover {
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.2);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.6); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-slide { animation: slide 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Homepage;