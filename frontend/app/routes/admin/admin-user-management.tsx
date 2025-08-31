import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  Shield, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Crown, 
  Search,
  UserCheck,
  UserX,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  isApproved: boolean;
  defaultRole: "viewer" | "member" | "admin" | "owner";
  createdAt: string;
  lastLogin?: string;
}

interface UserStats {
  totalUsers: number;
  approvedUsers: number;
  pendingUsers: number;
  adminUsers: number;
  viewerUsers: number;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          toast.error(data.message || "Failed to fetch users");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/users/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (response.ok) {
        toast.success("User approved successfully");
        fetchUsers();
        fetchStats();
      } else {
        toast.error("Failed to approve user");
      }
    } catch (error) {
      toast.error("Error approving user");
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/promote`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        toast.success("User promoted to admin successfully");
        fetchUsers();
        fetchStats();
      } else {
        toast.error("Failed to promote user");
      }
    } catch (error) {
      toast.error("Error promoting user");
    }
  };

  const demoteToViewer = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/demote`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        toast.success("User demoted to viewer successfully");
        fetchUsers();
        fetchStats();
      } else {
        toast.error("Failed to demote user");
      }
    } catch (error) {
      toast.error("Error demoting user");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Badge className="bg-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Pending</Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user roles and permissions</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approvedUsers}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingUsers}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.adminUsers}</p>
                </div>
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Viewers</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.viewerUsers}</p>
                </div>
                <Eye className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchUsers} variant="outline">
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user roles and approval status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.defaultRole)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.isApproved)}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600">
                      {user.lastLogin 
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"
                      }
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {!user.isApproved && (
                        <Button
                          size="sm"
                          onClick={() => approveUser(user._id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      
                      {user.defaultRole === "viewer" && user.isApproved && (
                        <Button
                          size="sm"
                          onClick={() => promoteToAdmin(user._id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Crown className="w-4 h-4 mr-1" />
                          Promote
                        </Button>
                      )}
                      
                      {user.defaultRole === "admin" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => demoteToViewer(user._id)}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Demote
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
