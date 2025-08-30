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

  useEffect(() => {
    fetchPortfolioItems();
    
    // Add smooth scrolling behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Featured projects for showcase
  const featuredProjects = portfolioItems.filter(item => item.featured).slice(0, 6);

  const technologies = [
    { name: "React", category: "Frontend", level: 95 },
    { name: "TypeScript", category: "Frontend", level: 90 },
    { name: "Node.js", category: "Backend", level: 88 },
    { name: "MongoDB", category: "Database", level: 85 },
    { name: "PostgreSQL", category: "Database", level: 82 },
    { name: "AWS", category: "Cloud", level: 80 },
    { name: "Docker", category: "DevOps", level: 78 },
    { name: "GraphQL", category: "API", level: 75 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Materix</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">Services</a>
              <a href="#portfolio" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">Portfolio</a>
              <a href="#technologies" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">Technologies</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 hover:scale-105">
            We Build Digital
            <span className="block text-gray-600">Excellence</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700">
            Transform your business with modern web applications, clean designs, and scalable solutions that drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="#portfolio">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <span className="flex items-center">
                  View Our Work
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link to="#contact">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <span className="flex items-center">
                  Start Your Project
                  <Rocket className="h-5 w-5 ml-2 group-hover:translate-y-[-2px] transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">50+</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Projects Delivered</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">100%</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Client Satisfaction</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">24/7</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Support Available</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">5★</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700">
              We deliver clean, modern solutions that help businesses succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  Web Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Modern, responsive websites built with React, Node.js, and cutting-edge technologies.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">React</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Node.js</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            {/* UI/UX Design */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  UI/UX Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Clean, intuitive user interfaces and seamless user experiences.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Figma</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Adobe XD</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Sketch</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Apps */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  Mobile Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Native and cross-platform mobile applications for all devices.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">React Native</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Flutter</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Swift</Badge>
                </div>
              </CardContent>
            </Card>

            {/* E-commerce */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  E-commerce Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Complete online store solutions with secure payment processing.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Shopify</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">WooCommerce</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Stripe</Badge>
                </div>
              </CardContent>
            </Card>

            {/* API Integrations */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  API Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Seamless integration with third-party services and business tools.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">REST API</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">GraphQL</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">WebSockets</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-gray-600">
                  Maintenance & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 transition-all duration-300">
                  Ongoing maintenance, updates, and technical support.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">24/7 Support</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Security Updates</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">Performance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105">
              Technologies We Use
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700">
              We use modern, reliable technologies to build scalable and performant solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">{tech.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 transition-all duration-300">{tech.category}</p>
                  
                  {/* Skill Level Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gray-900 h-2 rounded-full transition-all duration-1000 group-hover:bg-gray-700"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 transition-all duration-300 group-hover:text-gray-700">{tech.level}% Proficiency</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105">
              Our Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700">
              Explore our latest projects and see how we've helped businesses achieve their goals.
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-all duration-300">Projects Coming Soon</h3>
              <p className="text-gray-600 mb-8 transition-all duration-300">We're currently working on some amazing projects.</p>
              <Link to="/sign-up">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Be the First to See Them
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((item) => (
                <Card key={item._id} className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 group">
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-300">
                    <Monitor className="h-12 w-12 text-gray-400 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200">
                        {getCategoryLabel(item.category)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 transition-all duration-300 group-hover:text-gray-600">
                      {item.name}
                    </CardTitle>
                    {item.shortDescription && (
                      <CardDescription className="text-gray-600 transition-all duration-300">
                        {item.shortDescription}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Technologies */}
                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs transition-all duration-300 hover:bg-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs transition-all duration-300 hover:bg-gray-200">
                            +{item.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105 group/btn">
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
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700">
              We combine technical expertise with clean design to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Modern Technologies</h3>
              <p className="text-gray-600 transition-all duration-300">Built with the latest frameworks and tools for optimal performance.</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Fast Delivery</h3>
              <p className="text-gray-600 transition-all duration-300">Quick turnaround times without compromising on quality.</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Collaborative</h3>
              <p className="text-gray-600 transition-all duration-300">We work closely with you throughout the entire process.</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Results Driven</h3>
              <p className="text-gray-600 transition-all duration-300">Transparent pricing with excellent value for your investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">John Smith</h4>
                    <p className="text-gray-600 text-sm transition-all duration-300">CEO, TechStart Inc.</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic transition-all duration-300">
                  "The team delivered an exceptional e-commerce website that exceeded our expectations."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Sarah Johnson</h4>
                    <p className="text-gray-600 text-sm transition-all duration-300">Founder, Creative Agency</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic transition-all duration-300">
                  "Professional, responsive, and incredibly talented. They transformed our vision perfectly."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Mike Chen</h4>
                    <p className="text-gray-600 text-sm transition-all duration-300">Product Manager, StartupXYZ</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic transition-all duration-300">
                  "Fast delivery, excellent communication, and a final product that perfectly matches our requirements."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-700 hover:scale-105">
            Let's Build Something Together
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 transition-all duration-700">
            Ready to transform your digital presence? Get in touch with us and let's discuss your project.
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-700">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">Email Us</h3>
                <p className="text-gray-300 transition-all duration-300">hello@materix.com</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-700">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">Call Us</h3>
                <p className="text-gray-300 transition-all duration-300">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-700">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">Visit Us</h3>
                <p className="text-gray-300 transition-all duration-300">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <span className="flex items-center">
                  Start Your Project
                  <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
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
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="text-gray-900 font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold">Materix</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md transition-all duration-300">
                Professional web development and design services. We build clean, modern, and scalable websites.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Web Development</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Mobile Apps</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">E-commerce</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/sign-in" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Sign In</Link></li>
                <li><Link to="/sign-up" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Create Account</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">About Us</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Materix. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;