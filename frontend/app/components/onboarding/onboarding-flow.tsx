import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Sparkles,
  Zap,
  Shield,
  Globe
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
  completed: boolean;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingFlow = ({ isOpen, onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Materix!",
      description: "Let's get you started with your project management journey",
      icon: Sparkles,
      completed: false,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Materix!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Your powerful project management platform designed to help teams collaborate, 
              track progress, and deliver results faster than ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Team Collaboration</h3>
              <p className="text-xs text-gray-600">Work together seamlessly</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Task Management</h3>
              <p className="text-xs text-gray-600">Track progress efficiently</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Analytics</h3>
              <p className="text-xs text-gray-600">Data-driven insights</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "workspace",
      title: "Create Your First Workspace",
      description: "Organize your team and projects in dedicated workspaces",
      icon: Users,
      completed: false,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Workspaces</h3>
            <p className="text-gray-600">
              Workspaces are like departments or teams in your organization. 
              Each workspace can contain multiple projects and team members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Create Workspace</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Set up your first workspace to organize your team and projects
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Create Workspace
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Workspace Benefits:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Organize projects by team or department
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Control access and permissions
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Separate analytics and reporting
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Invite team members easily
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "projects",
      title: "Manage Projects & Tasks",
      description: "Create projects, assign tasks, and track progress",
      icon: CheckSquare,
      completed: false,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Projects & Tasks</h3>
            <p className="text-gray-600">
              Break down your work into manageable projects and tasks. 
              Track progress, assign responsibilities, and meet deadlines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <h4 className="font-semibold text-sm mb-2">Create Project</h4>
              <p className="text-xs text-gray-600">
                Set up a new project with title, description, and timeline
              </p>
            </Card>
            
            <Card className="text-center p-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <h4 className="font-semibold text-sm mb-2">Add Tasks</h4>
              <p className="text-xs text-gray-600">
                Break down projects into actionable tasks with assignees
              </p>
            </Card>
            
            <Card className="text-center p-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <h4 className="font-semibold text-sm mb-2">Track Progress</h4>
              <p className="text-xs text-gray-600">
                Monitor task completion and project milestones
              </p>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Zap className="w-5 h-5 text-green-600 mr-2" />
                Pro Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Task Management:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use subtasks for complex items</li>
                    <li>• Set priorities (High, Medium, Low)</li>
                    <li>• Add due dates and reminders</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Project Organization:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use tags to categorize tasks</li>
                    <li>• Create templates for recurring projects</li>
                    <li>• Archive completed projects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Get insights into your team's productivity and project progress",
      icon: BarChart3,
      completed: false,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Monitor your team's performance, track project progress, 
              and make data-driven decisions with our comprehensive analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Total Projects</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Completed Tasks</span>
                  <Badge variant="secondary">89</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">In Progress</span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Overdue</span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reports Available</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Project Progress Reports</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Team Performance Analytics</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <CheckSquare className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Task Completion Trends</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Time Tracking Insights</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "settings",
      title: "Customize Your Experience",
      description: "Configure your preferences and workspace settings",
      icon: Settings,
      completed: false,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalize Your Workspace</h3>
            <p className="text-gray-600">
              Customize your experience with themes, notifications, 
              and workspace settings that work best for your team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Profile Information</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Notification Preferences</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Security Settings</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Data Export</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workspace Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Member Management</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Project Templates</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Integrations</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm">Advanced Features</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "complete",
      title: "You're All Set!",
      description: "Ready to start managing your projects like a pro",
      icon: Sparkles,
      completed: false,
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Materix!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You're now ready to start managing your projects and collaborating with your team. 
              Here's what you can do next:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="text-center p-4">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Create Workspace</h3>
              <p className="text-xs text-gray-600">Set up your first workspace</p>
            </Card>
            <Card className="text-center p-4">
              <CheckSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Add Projects</h3>
              <p className="text-xs text-gray-600">Start your first project</p>
            </Card>
            <Card className="text-center p-4">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">View Analytics</h3>
              <p className="text-xs text-gray-600">Track your progress</p>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Need Help?
            </h4>
            <p className="text-sm text-blue-800">
              Visit our <a href="/support/help-center" className="underline font-medium">Help Center</a> for tutorials, 
              FAQs, and support resources.
            </p>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const currentStepData = steps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <currentStepData.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentStepData.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
              Skip
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex items-center">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center bg-green-600 hover:bg-green-700">
                  Get Started
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
