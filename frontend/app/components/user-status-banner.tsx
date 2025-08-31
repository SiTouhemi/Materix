import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Crown, 
  Users, 
  Info,
  X
} from "lucide-react";

interface UserStatus {
  _id: string;
  name: string;
  email: string;
  isApproved: boolean;
  defaultRole: "viewer" | "member" | "admin" | "owner";
}

const UserStatusBanner = () => {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserStatus(data.user);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userStatus || !isVisible) {
    return null;
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "owner":
        return <Crown className="w-4 h-4" />;
      case "member":
        return <Users className="w-4 h-4" />;
      case "viewer":
        return <Eye className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-600"><Crown className="w-3 h-3 mr-1" />Admin</Badge>;
      case "owner":
        return <Badge className="bg-red-600"><Crown className="w-3 h-3 mr-1" />Owner</Badge>;
      case "member":
        return <Badge className="bg-blue-600"><Users className="w-3 h-3 mr-1" />Member</Badge>;
      case "viewer":
        return <Badge className="bg-gray-600"><Eye className="w-3 h-3 mr-1" />Viewer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
    ) : (
      <Badge className="bg-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Pending Approval</Badge>
    );
  };

  const getStatusMessage = () => {
    if (!userStatus.isApproved) {
      return {
        title: "Account Pending Approval",
        message: "Your account is currently pending approval. You can view workspaces and projects, but cannot create or edit content. Please contact the administrator for full access.",
        type: "warning"
      };
    }

    if (userStatus.defaultRole === "viewer") {
      return {
        title: "Viewer Access",
        message: "You have viewer access. You can browse and view content, but cannot create or edit workspaces, projects, or tasks. Contact an administrator to request editing permissions.",
        type: "info"
      };
    }

    return {
      title: "Full Access",
      message: "You have full access to create and manage workspaces, projects, and tasks.",
      type: "success"
    };
  };

  const statusInfo = getStatusMessage();

  return (
    <Card className={`mb-6 border-l-4 ${
      statusInfo.type === "warning" ? "border-yellow-500 bg-yellow-50" :
      statusInfo.type === "info" ? "border-blue-500 bg-blue-50" :
      "border-green-500 bg-green-50"
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center space-x-2">
                {getRoleIcon(userStatus.defaultRole)}
                <span className="font-semibold text-gray-900">{statusInfo.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleBadge(userStatus.defaultRole)}
                {getStatusBadge(userStatus.isApproved)}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {statusInfo.message}
            </p>
            {!userStatus.isApproved && (
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open("mailto:admin@materix.com?subject=Request for Account Approval", "_blank")}
                >
                  Contact Administrator
                </Button>
                <span className="text-xs text-gray-500">
                  Email: admin@materix.com
                </span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatusBanner;
