import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  Users,
  FolderOpen,
  CheckSquare,
  Settings,
  Zap,
  Shield,
  Globe
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    question: "How do I create my first workspace?",
    answer: "After signing up, click the 'Create Workspace' button in the dashboard. Give your workspace a name, description, and choose a color. You can invite team members immediately or add them later.",
    category: "getting-started"
  },
  {
    question: "How do I invite team members to my workspace?",
    answer: "Go to your workspace settings and click 'Invite Members'. Enter their email addresses and assign roles (owner, admin, member, or viewer). They'll receive an email invitation to join.",
    category: "getting-started"
  },
  {
    question: "What's the difference between workspaces and projects?",
    answer: "Workspaces are like departments or teams in your organization. Projects are specific initiatives within a workspace. You can have multiple projects in one workspace.",
    category: "getting-started"
  },
  // Projects & Tasks
  {
    question: "How do I create a new project?",
    answer: "Navigate to your workspace and click 'New Project'. Fill in the project details including title, description, start date, and due date. You can also assign team members and set the project status.",
    category: "projects-tasks"
  },
  {
    question: "Can I assign multiple people to a task?",
    answer: "Yes! When creating or editing a task, you can select multiple assignees. Each person will be notified and can update the task status.",
    category: "projects-tasks"
  },
  {
    question: "How do I track task progress?",
    answer: "Tasks have status options: To Do, In Progress, Review, and Done. Update the status as work progresses. You can also add comments, attachments, and time estimates.",
    category: "projects-tasks"
  },
  {
    question: "Can I create subtasks?",
    answer: "Yes! Open any task and scroll to the 'Subtasks' section. Click 'Add Subtask' to break down complex tasks into smaller, manageable pieces.",
    category: "projects-tasks"
  },
  // Collaboration
  {
    question: "How do I comment on tasks?",
    answer: "Open any task and scroll to the comments section. Type your comment and click 'Add Comment'. You can also @mention team members to notify them.",
    category: "collaboration"
  },
  {
    question: "Can I attach files to tasks?",
    answer: "Yes! In the task details, you can upload files by clicking the attachment icon. Supported formats include images, documents, and other common file types.",
    category: "collaboration"
  },
  {
    question: "How do I get notified about updates?",
    answer: "You'll receive email notifications for task assignments, comments, and status changes. You can manage notification preferences in your account settings.",
    category: "collaboration"
  },
  // Account & Settings
  {
    question: "How do I change my password?",
    answer: "Go to Settings > Account and click 'Change Password'. Enter your current password and choose a new one. Make sure it's strong and unique.",
    category: "account-settings"
  },
  {
    question: "Can I export my data?",
    answer: "Yes! Go to Settings > Data Export to download your projects, tasks, and other data in various formats including CSV and JSON.",
    category: "account-settings"
  },
  {
    question: "How do I delete my account?",
    answer: "Contact our support team at support@materix.com to request account deletion. We'll process your request within 30 days as per GDPR requirements.",
    category: "account-settings"
  },
  // Troubleshooting
  {
    question: "I can't log in to my account",
    answer: "Try resetting your password using the 'Forgot Password' link. If that doesn't work, check that you're using the correct email address. Contact support if issues persist.",
    category: "troubleshooting"
  },
  {
    question: "The app is running slowly",
    answer: "Try refreshing your browser or clearing your cache. If the issue persists, check your internet connection or try accessing from a different browser.",
    category: "troubleshooting"
  },
  {
    question: "I'm not receiving email notifications",
    answer: "Check your spam folder first. Then verify your email settings in your account preferences. Make sure you haven't accidentally unsubscribed from notifications.",
    category: "troubleshooting"
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const categories = [
    { id: "getting-started", name: "Getting Started", icon: Zap, color: "bg-blue-100 text-blue-600" },
    { id: "projects-tasks", name: "Projects & Tasks", icon: CheckSquare, color: "bg-green-100 text-green-600" },
    { id: "collaboration", name: "Collaboration", icon: Users, color: "bg-purple-100 text-purple-600" },
    { id: "account-settings", name: "Account & Settings", icon: Settings, color: "bg-gray-100 text-gray-600" },
    { id: "troubleshooting", name: "Troubleshooting", icon: Shield, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions, watch tutorials, and get the support you need to make the most of Materix.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">Comprehensive guides and tutorials</p>
              <Button variant="outline" className="w-full">Browse Docs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Step-by-step video guides</p>
              <Button variant="outline" className="w-full">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Get help from our team</p>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center">
              <Video className="w-4 h-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find quick answers to common questions about using Materix</p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Button
                variant={searchQuery === "" ? "default" : "outline"}
                onClick={() => setSearchQuery("")}
                size="sm"
              >
                All Questions
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(category.name)}
                  className="flex items-center"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpanded(index)}
                    >
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {expandedItems.has(index) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    {expandedItems.has(index) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            {categories.find(cat => cat.id === item.category)?.name}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse our categories</p>
              </div>
            )}
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Tutorials</h2>
              <p className="text-gray-600">Learn Materix with our step-by-step video guides</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Getting Started with Materix",
                  description: "Learn the basics of creating workspaces and projects",
                  duration: "5:23",
                  thumbnail: "🎯"
                },
                {
                  title: "Managing Tasks and Projects",
                  description: "Master task creation, assignment, and tracking",
                  duration: "8:45",
                  thumbnail: "📋"
                },
                {
                  title: "Team Collaboration Features",
                  description: "Discover how to work effectively with your team",
                  duration: "6:12",
                  thumbnail: "👥"
                },
                {
                  title: "Advanced Analytics & Reporting",
                  description: "Learn to use our powerful analytics dashboard",
                  duration: "7:30",
                  thumbnail: "📊"
                },
                {
                  title: "Customizing Your Workspace",
                  description: "Personalize your workspace settings and preferences",
                  duration: "4:18",
                  thumbnail: "⚙️"
                },
                {
                  title: "Integrations & API",
                  description: "Connect Materix with your favorite tools",
                  duration: "9:05",
                  thumbnail: "🔗"
                }
              ].map((tutorial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{tutorial.thumbnail}</div>
                    <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {tutorial.duration}
                      </Badge>
                      <Button size="sm" variant="outline">Watch</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentation & Guides</h2>
              <p className="text-gray-600">Comprehensive documentation for power users and developers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "User Guide",
                  description: "Complete guide to using all Materix features",
                  icon: BookOpen,
                  color: "text-blue-600"
                },
                {
                  title: "API Documentation",
                  description: "Integrate Materix with your applications",
                  icon: Globe,
                  color: "text-green-600"
                },
                {
                  title: "Best Practices",
                  description: "Tips and tricks for optimal project management",
                  icon: Zap,
                  color: "text-purple-600"
                },
                {
                  title: "Security Guide",
                  description: "Learn about our security measures and compliance",
                  icon: Shield,
                  color: "text-red-600"
                }
              ].map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <guide.icon className={`w-8 h-8 ${guide.color} flex-shrink-0 mt-1`} />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                        <Button size="sm" variant="outline">Read Guide</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Support</h2>
              <p className="text-gray-600">Can't find what you're looking for? Our support team is here to help</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Choose the best way to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@materix.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Community Forum</p>
                      <p className="text-sm text-gray-600">Ask questions and share tips</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="What can we help you with?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={4}
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;
