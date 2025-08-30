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
  MapPin
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

  // Featured projects for showcase
  const featuredProjects = portfolioItems.filter(item => item.featured).slice(0, 6);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl mb-8">
              <span className="text-3xl font-bold text-white">M</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              We build fast, modern, and scalable websites for your business.
            </h1>
            
            {/* Subtext */}
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              From landing pages to full e-commerce solutions, our team delivers professional web experiences that drive results.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link to="/sign-in">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                  View Our Work
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="outline" className="border-3 border-blue-600 text-blue-700 hover:bg-blue-50 px-10 py-6 text-xl font-semibold transition-all duration-300 rounded-2xl">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom / Portfolio Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our latest projects and see how we've helped businesses achieve their digital goals.
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No featured projects yet</h3>
              <p className="text-slate-600">Check back soon for our latest work</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((item) => (
                <Card key={item._id} className="bg-white shadow-xl shadow-slate-200/50 border-0 rounded-3xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${getCategoryColor(item.category)} text-sm font-medium`}>
                        {getCategoryLabel(item.category)}
                      </Badge>
                      {item.featured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </CardTitle>
                    {item.shortDescription && (
                      <CardDescription className="text-slate-600 text-base">
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
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 4 && (
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                            +{item.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center space-x-4 pt-4">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 text-sm font-semibold transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <Link to="/sign-in">
              <Button variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-xl">
                View All Projects
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer comprehensive web development and design services to help your business succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Web Development</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Modern, responsive websites built with React, Node.js, and cutting-edge technologies. From simple landing pages to complex web applications.
              </CardDescription>
            </Card>

            {/* UI/UX Design */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">UI/UX Design</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Beautiful, intuitive user interfaces and seamless user experiences that engage your audience and drive conversions.
              </CardDescription>
            </Card>

            {/* Mobile Apps */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Mobile Apps</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Native and cross-platform mobile applications that provide exceptional user experiences across all devices.
              </CardDescription>
            </Card>

            {/* E-commerce Solutions */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">E-commerce Solutions</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Complete online store solutions with secure payment processing, inventory management, and customer analytics.
              </CardDescription>
            </Card>

            {/* API Integrations */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">API Integrations</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Seamless integration with third-party services, payment gateways, and business tools to streamline your operations.
              </CardDescription>
            </Card>

            {/* Maintenance & Support */}
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Maintenance & Support</CardTitle>
              <CardDescription className="text-slate-600 text-base leading-relaxed">
                Ongoing maintenance, updates, and technical support to keep your website running smoothly and securely.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine technical expertise with creative vision to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Modern Technologies</h3>
              <p className="text-slate-600">Built with the latest frameworks and tools for optimal performance and scalability.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Fast Delivery</h3>
              <p className="text-slate-600">Quick turnaround times without compromising on quality or attention to detail.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Collaborative Approach</h3>
              <p className="text-slate-600">We work closely with you throughout the entire process to ensure your vision is realized.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Competitive Pricing</h3>
              <p className="text-slate-600">Transparent pricing with no hidden costs and excellent value for your investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">John Smith</h4>
                  <p className="text-slate-600 text-sm">CEO, TechStart Inc.</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic">
                "The team delivered an exceptional e-commerce website that exceeded our expectations. The attention to detail and user experience is outstanding."
              </p>
            </Card>

            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Sarah Johnson</h4>
                  <p className="text-slate-600 text-sm">Founder, Creative Agency</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic">
                "Professional, responsive, and incredibly talented. They transformed our vision into a beautiful, functional website that our clients love."
              </p>
            </Card>

            <Card className="bg-white shadow-lg border-0 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Mike Chen</h4>
                  <p className="text-slate-600 text-sm">Product Manager, StartupXYZ</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic">
                "Fast delivery, excellent communication, and a final product that perfectly matches our requirements. Highly recommended!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have an idea? Let's build it together.
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Ready to start your next project? Get in touch with us and let's discuss how we can help bring your vision to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center space-x-3 text-blue-100">
              <Mail className="h-6 w-6" />
              <span className="text-lg">hello@materix.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-100">
              <Phone className="h-6 w-6" />
              <span className="text-lg">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-100">
              <MapPin className="h-6 w-6" />
              <span className="text-lg">San Francisco, CA</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/sign-up">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                Start Your Project
                <Send className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-6 text-xl font-semibold transition-all duration-300 rounded-2xl">
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-2xl font-bold">Materix</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Professional web development and design services. We build fast, modern, and scalable websites that help businesses succeed online.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">E-commerce</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/sign-in" className="text-slate-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/sign-up" className="text-slate-300 hover:text-white transition-colors">Create Account</Link></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Materix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
