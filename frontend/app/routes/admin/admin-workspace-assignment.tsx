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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Building2, 
  Plus, 
  Trash2, 
  Search,
  Eye,
  Crown,
  UserCheck,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface User {
  _id: string;
  name: string;
  email: string;
  isApproved: boolean;
  defaultRole: "viewer" | "member" | "admin" | "owner";
}

interface Workspace {
  _id: string;
  name: string;
  description?: string;
  color: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  members: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
    };
    role: string;
  }>;
}

interface WorkspaceAssignment {
  _id: string;
  user: string;
  workspace: Workspace;
  role: string;
  isActive: boolean;
  assignedBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

interface AssignmentStats {
  totalAssignments: number;
  totalWorkspaces: number;
  totalUsers: number;
  averageAssignmentsPerUser: string;
}

const AdminWorkspaceAssignment = () => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [assignments, setAssignments] = useState<WorkspaceAssignment[]>([]);
  const [stats, setStats] = useState<AssignmentStats | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("viewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchUsers(),
        fetchWorkspaces(),
        fetchStats(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch("/api/admin/workspaces", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWorkspaces(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const fetchUserAssignments = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/workspaces`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAssignments(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/workspaces/stats", {
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

  const assignWorkspace = async () => {
    if (!selectedUser || !selectedWorkspace) {
      toast.error("Please select both user and workspace");
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          workspaceId: selectedWorkspace,
          role: selectedRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success("Workspace assigned successfully");
          setIsAssignDialogOpen(false);
          setSelectedUser(null);
          setSelectedWorkspace("");
          setSelectedRole("viewer");
          fetchUserAssignments(selectedUser._id);
          fetchStats();
          // Invalidate workspaces query to refresh the data
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        } else {
          toast.error(data.message || "Failed to assign workspace");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to assign workspace");
      }
    } catch (error) {
      toast.error("Error assigning workspace");
    }
  };

  const removeAssignment = async (userId: string, workspaceId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/workspaces/${workspaceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        toast.success("Workspace assignment removed successfully");
        fetchUserAssignments(userId);
        fetchStats();
        // Invalidate workspaces query to refresh the data
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      } else {
        toast.error("Failed to remove workspace assignment");
      }
    } catch (error) {
      toast.error("Error removing workspace assignment");
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    fetchUserAssignments(user._id);
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
      <Badge className="bg-green-600"><UserCheck className="w-3 h-3 mr-1" />Approved</Badge>
    ) : (
      <Badge className="bg-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Pending</Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workspace assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workspace Assignment Management</h1>
        <p className="text-gray-600">Assign workspaces to users and manage their access</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalAssignments}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workspaces</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalWorkspaces}</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Assignments/User</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.averageAssignmentsPerUser}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Users</span>
              <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" disabled={!selectedUser}>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Workspace
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Workspace to {selectedUser?.name}</DialogTitle>
                    <DialogDescription>
                      Select a workspace and role for this user
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Workspace</label>
                      <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workspace" />
                        </SelectTrigger>
                        <SelectContent>
                          {workspaces.map((workspace) => (
                            <SelectItem key={workspace._id} value={workspace._id}>
                              {workspace.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={assignWorkspace}>
                        Assign Workspace
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>
              Select a user to manage their workspace assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedUser?._id === user._id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(user.isApproved)}
                      {getRoleBadge(user.defaultRole)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace Assignments</CardTitle>
            <CardDescription>
              {selectedUser ? `${selectedUser.name}'s assigned workspaces` : "Select a user to view assignments"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-4">
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{assignment.workspace.name}</p>
                          <p className="text-sm text-gray-600">
                            Assigned by {assignment.assignedBy.name} on{" "}
                            {new Date(assignment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getRoleBadge(assignment.role)}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeAssignment(selectedUser._id, assignment.workspace._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No workspace assignments found</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Use the "Assign Workspace" button to add assignments
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a user to view their workspace assignments</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminWorkspaceAssignment;
