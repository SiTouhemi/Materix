import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
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
  Monitor,
  Rocket,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router";
import { ContactForm } from "@/components/contact-form";

interface PortfolioItem {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  status: string;
  featured: boolean;
  technologies: string[];
  images: Array<{
    url: string;
    alt: string;
    isFeatured: boolean;
    order: number;
  }>;
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
  const [activeFilter, setActiveFilter] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const heroVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1
      }
    }
  };

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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPortfolioItems(data.data?.portfolioItems || []);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      // Don't set error, just use empty array to show sample projects
      setPortfolioItems([]);
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

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(item => 
        activeFilter === 'data_visualization' ? item.category === 'data_visualization' :
        activeFilter === 'web_development' ? item.category === 'web_development' :
        true
      );

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
          <p className="mt-4 text-gray-600">Loading our amazing work...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Floating Code Elements */}
      <div className="floating-code" style={{ top: '10%', left: '5%' }}>
        {'<div className="hero">'}
      </div>
      <div className="floating-code" style={{ top: '20%', right: '10%' }}>
        const app = express();
      </div>
      <div className="floating-code" style={{ top: '60%', left: '15%' }}>
        function createProject() {'{'}
      </div>
      <div className="floating-code" style={{ top: '80%', right: '5%' }}>
        npm install react
      </div>
      <div className="floating-code" style={{ top: '40%', left: '80%' }}>
        git commit -m "feat"
      </div>
      <div className="floating-code" style={{ top: '120%', left: '70%' }}>
        import React from 'react';
      </div>
      <div className="floating-code" style={{ top: '140%', left: '10%' }}>
        useEffect function
      </div>
      <div className="floating-code" style={{ top: '160%', right: '20%' }}>
        return div
      </div>
      <div className="floating-code" style={{ top: '200%', left: '30%' }}>
        className container
      </div>
      <div className="floating-code" style={{ top: '240%', right: '15%' }}>
        onClick handleClick
      </div>
      <div className="floating-code" style={{ top: '280%', left: '60%' }}>
        useState(false)
      </div>
      <div className="floating-code" style={{ top: '320%', left: '20%' }}>
        const [data, setData] = useState([]);
      </div>
      <div className="floating-code" style={{ top: '360%', right: '30%' }}>
        fetch('/api/data')
      </div>
      <div className="floating-code" style={{ top: '400%', left: '50%' }}>
        .then(response response.json())
      </div>
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
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">About</a>
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
      <section className="pt-32 pb-20 bg-white code-bg-hero relative overflow-hidden">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 hover:scale-105"
            variants={heroVariants}
          >
            We Build Digital
            <span className="block text-gray-600">Excellence</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700"
            variants={textVariants}
          >
            Transform your business with modern web applications, clean designs, and scalable solutions that drive results.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link to="#portfolio">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <span className="flex items-center">
                    View Our Work
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="#contact">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <span className="flex items-center">
                    Start Your Project
                    <Rocket className="h-5 w-5 ml-2 group-hover:translate-y-[-2px] transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainerVariants}
          >
            <motion.div className="text-center group" variants={itemVariants}>
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">50+</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Projects Delivered</div>
            </motion.div>
            <motion.div className="text-center group" variants={itemVariants}>
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">100%</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Client Satisfaction</div>
            </motion.div>
            <motion.div className="text-center group" variants={itemVariants}>
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">24/7</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Support Available</div>
            </motion.div>
            <motion.div className="text-center group" variants={itemVariants}>
              <div className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:scale-110">5★</div>
              <div className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">Average Rating</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 code-bg-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              We deliver clean, modern solutions that help businesses succeed online.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            {/* Web Development */}
            <motion.div variants={cardVariants}>
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
            </motion.div>

            {/* UI/UX Design */}
            <motion.div variants={cardVariants}>
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
            </motion.div>

            {/* Mobile Apps */}
            <motion.div variants={cardVariants}>
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
            </motion.div>

            {/* E-commerce */}
            <motion.div variants={cardVariants}>
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
            </motion.div>

            {/* API Integrations */}
            <motion.div variants={cardVariants}>
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
            </motion.div>

            {/* Maintenance */}
            <motion.div variants={cardVariants}>
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white code-bg-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              About Our Team
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              We're a passionate team of developers, designers, and problem-solvers dedicated to creating exceptional digital experiences.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            {/* Team Member 1 */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold text-2xl">A</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-gray-600">
                    Alex Chen
                  </h3>
                  <p className="text-gray-600 mb-4 transition-all duration-300">Lead Full-Stack Developer</p>
                  <p className="text-sm text-gray-500 mb-4 transition-all duration-300">
                    Expert in React, Node.js, and cloud architecture. Passionate about clean code and scalable solutions.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Code className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-gray-600">
                    Sarah Kim
                  </h3>
                  <p className="text-gray-600 mb-4 transition-all duration-300">UI/UX Designer</p>
                  <p className="text-sm text-gray-500 mb-4 transition-all duration-300">
                    Creative designer focused on user-centered design and beautiful, functional interfaces.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Palette className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold text-2xl">M</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-gray-600">
                    Mike Rodriguez
                  </h3>
                  <p className="text-gray-600 mb-4 transition-all duration-300">Mobile Developer</p>
                  <p className="text-sm text-gray-500 mb-4 transition-all duration-300">
                    Specialized in React Native and native mobile development. Creating seamless mobile experiences.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                      <Smartphone className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Company Values */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Collaboration</h3>
              <p className="text-gray-600 transition-all duration-300">We believe in the power of teamwork and close collaboration with our clients.</p>
            </motion.div>

            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Innovation</h3>
              <p className="text-gray-600 transition-all duration-300">We stay ahead of the curve with the latest technologies and best practices.</p>
            </motion.div>

            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Quality</h3>
              <p className="text-gray-600 transition-all duration-300">We never compromise on quality, delivering excellence in every project.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-white code-bg-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              Technologies We Use
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              We use modern, reliable technologies to build scalable and performant solutions.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            {technologies.map((tech) => (
              <motion.div key={tech.name} variants={cardVariants}>
                <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group">
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900 code-bg-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              Our Portfolio
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              Explore our latest projects and see how we've helped businesses achieve their goals.
            </motion.p>
          </motion.div>

          {/* Filter Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="flex space-x-8"
              variants={staggerContainerVariants}
            >
              <motion.button 
                onClick={() => setActiveFilter('all')}
                className={`font-medium text-lg transition-all duration-300 hover:text-blue-300 ${
                  activeFilter === 'all' ? 'text-blue-400' : 'text-white hover:text-gray-300'
                }`}
                variants={itemVariants}
              >
                All
              </motion.button>
              <motion.button 
                onClick={() => setActiveFilter('data_visualization')}
                className={`font-medium text-lg transition-all duration-300 hover:text-blue-300 ${
                  activeFilter === 'data_visualization' ? 'text-blue-400' : 'text-white hover:text-gray-300'
                }`}
                variants={itemVariants}
              >
                Data Visualization
              </motion.button>
              <motion.button 
                onClick={() => setActiveFilter('web_development')}
                className={`font-medium text-lg transition-all duration-300 hover:text-blue-300 ${
                  activeFilter === 'web_development' ? 'text-blue-400' : 'text-white hover:text-gray-300'
                }`}
                variants={itemVariants}
              >
                Web Development
              </motion.button>
            </motion.div>
          </motion.div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300">Featured Projects</h3>
              <p className="text-gray-300 mb-8 transition-all duration-300">Here are some of our recent projects that showcase our expertise.</p>
              
              {/* Sample Projects for Demo */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainerVariants}
              >
                {/* Sample Project 1 */}
                <motion.div variants={cardVariants}>
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden rounded-t-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500">
                      <div className="w-full h-full flex items-center justify-center">
                        <Monitor className="h-16 w-16 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                        E-commerce Platform
                      </CardTitle>
                      <p className="text-gray-400 text-sm mb-3 transition-all duration-300">
                        Full-stack e-commerce solution with payment processing
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">React</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Node.js</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Stripe</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sample Project 2 */}
                <motion.div variants={cardVariants}>
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-green-600 to-teal-600 overflow-hidden rounded-t-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-teal-500">
                      <div className="w-full h-full flex items-center justify-center">
                        <Smartphone className="h-16 w-16 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                        Mobile Banking App
                      </CardTitle>
                      <p className="text-gray-400 text-sm mb-3 transition-all duration-300">
                        Secure mobile banking application with biometric authentication
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">React Native</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Firebase</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Biometrics</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sample Project 3 */}
                <motion.div variants={cardVariants}>
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-orange-600 to-red-600 overflow-hidden rounded-t-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-500">
                      <div className="w-full h-full flex items-center justify-center">
                        <Palette className="h-16 w-16 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                        Design System
                      </CardTitle>
                      <p className="text-gray-400 text-sm mb-3 transition-all duration-300">
                        Comprehensive design system for enterprise applications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Figma</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Storybook</Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">Design Tokens</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              
              <div className="mt-12">
                <Link to="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainerVariants}
            >
              {/* Top Row - 3 smaller cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainerVariants}
              >
                {filteredProjects.slice(0, 3).map((item) => (
                  <motion.div key={item._id} variants={cardVariants}>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                      {/* Project Image */}
                      <div className="h-48 bg-gray-700 overflow-hidden rounded-t-lg transition-all duration-300 group-hover:bg-gray-600">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images.find(img => img.isFeatured)?.url || item.images[0].url}
                            alt={item.images.find(img => img.isFeatured)?.alt || item.name}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Monitor className="h-12 w-12 text-gray-500 transition-all duration-300 group-hover:scale-110" />
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                          {item.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm transition-all duration-300">
                          {getCategoryLabel(item.category)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Row - 2 larger cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainerVariants}
              >
                {filteredProjects.slice(3, 5).map((item) => (
                  <motion.div key={item._id} variants={cardVariants}>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                      {/* Project Image */}
                      <div className="h-64 bg-gray-700 overflow-hidden rounded-t-lg transition-all duration-300 group-hover:bg-gray-600">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images.find(img => img.isFeatured)?.url || item.images[0].url}
                            alt={item.images.find(img => img.isFeatured)?.alt || item.name}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Monitor className="h-16 w-16 text-gray-500 transition-all duration-300 group-hover:scale-110" />
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                          {item.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm transition-all duration-300">
                          {getCategoryLabel(item.category)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <Link to="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
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
      <section className="py-20 bg-white code-bg-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              We combine technical expertise with clean design to deliver exceptional results.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Modern Technologies</h3>
              <p className="text-gray-600 transition-all duration-300">Built with the latest frameworks and tools for optimal performance.</p>
            </motion.div>

            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Fast Delivery</h3>
              <p className="text-gray-600 transition-all duration-300">Quick turnaround times without compromising on quality.</p>
            </motion.div>

            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Collaborative</h3>
              <p className="text-gray-600 transition-all duration-300">We work closely with you throughout the entire process.</p>
            </motion.div>

            <motion.div className="text-center space-y-4 group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-600">Results Driven</h3>
              <p className="text-gray-600 transition-all duration-300">Transparent pricing with excellent value for your investment.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={cardVariants}>
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
            </motion.div>

            <motion.div variants={cardVariants}>
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
            </motion.div>

            <motion.div variants={cardVariants}>
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Testimonials Section */}
      <section id="contact" className="py-20 bg-white code-bg-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 hover:scale-105"
              variants={textVariants}
            >
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700"
              variants={textVariants}
            >
              Ready to start your next project? Get in touch and let's create something amazing together.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
          >
            
            {/* Left Column - Contact Information */}
            <motion.div 
              className="bg-gray-900 rounded-2xl p-8 lg:p-12"
              variants={cardVariants}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-700">
                Available for select freelance opportunities
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 transition-all duration-700">
                Have an exciting project you need help with? Send me an email or contact me via instant message!
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="group">
                  <a 
                    href="mailto:hello@materix.com" 
                    className="text-white text-lg font-medium hover:text-blue-400 transition-all duration-300 border-b border-blue-400 pb-1 hover:border-blue-300"
                  >
                    hello@materix.com
                  </a>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Connect with us:</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="https://linkedin.com/company/materix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-all duration-300 font-medium flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/materix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-all duration-300 font-medium flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      GitHub
                    </a>
                    <a href="https://twitter.com/materix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-all duration-300 font-medium flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                    <a href="https://instagram.com/materix" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-all duration-300 font-medium flex items-center gap-2">
                      Instagram
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Business Hours:</h3>
                  <p className="text-gray-300 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Weekend: Available for urgent projects<br />
                    Response time: Within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div variants={cardVariants}>
              <ContactForm />
            </motion.div>

            {/* Right Column - Testimonials */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainerVariants}
            >
              {/* Testimonial 1 - Purple */}
              <motion.div variants={cardVariants}>
                <Card className="bg-purple-600 border-0 text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-4 left-4 text-4xl font-bold opacity-20">"</div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">MG</span>
                      </div>
                    </div>
                    <div className="mt-8 mb-4">
                      <blockquote className="text-white text-sm leading-relaxed">
                        "Materix was instrumental in developing our website. Their responsiveness, organization, and strategic thinking made the entire process seamless."
                      </blockquote>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Mark Greenspan</p>
                      <p className="opacity-80">Founder at influenceTHIS Canada</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testimonial 2 - Blue */}
              <motion.div variants={cardVariants}>
                <Card className="bg-blue-600 border-0 text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-4 left-4 text-4xl font-bold opacity-20">"</div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">WH</span>
                      </div>
                    </div>
                    <div className="mt-8 mb-4">
                      <blockquote className="text-white text-sm leading-relaxed">
                        "Materix is AMAZING! If you have any doubt about hiring them, ask me – I am really impressed by this team!"
                      </blockquote>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Wilfried Hajek</p>
                      <p className="opacity-80">Agile Coach | Speaker | Trainer</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testimonial 3 - Purple */}
              <motion.div variants={cardVariants}>
                <Card className="bg-purple-600 border-0 text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-4 left-4 text-4xl font-bold opacity-20">"</div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">JC</span>
                      </div>
                    </div>
                    <div className="mt-8 mb-4">
                      <blockquote className="text-white text-sm leading-relaxed">
                        "One of the best professionals in web development. Great communication and accuracy in complex projects."
                      </blockquote>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Jonathan Castro</p>
                      <p className="opacity-80">CEO & Founder at The Cliff</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testimonial 4 - Blue */}
              <motion.div variants={cardVariants}>
                <Card className="bg-blue-600 border-0 text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-4 left-4 text-4xl font-bold opacity-20">"</div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">SM</span>
                      </div>
                    </div>
                    <div className="mt-8 mb-4">
                      <blockquote className="text-white text-sm leading-relaxed">
                        "Exceptional quality and attention to detail. They delivered exactly what we envisioned and more."
                      </blockquote>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Sarah Mitchell</p>
                      <p className="opacity-80">Marketing Director at TechFlow</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
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
                <a href="/legal/privacy-policy" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Privacy Policy</a>
                <a href="/legal/terms-of-service" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Terms of Service</a>
                <a href="/support/help-center" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;