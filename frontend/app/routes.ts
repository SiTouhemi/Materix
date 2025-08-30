import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Public home page (not wrapped in auth layout)
  index("routes/root/home.tsx"),
  
  layout("routes/auth/auth-layout.tsx", [
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
  ]),

  layout("routes/dashboard/dashboard-layout.tsx", [
    route("dashboard", "routes/dashboard/index.tsx"),
    route("workspaces", "routes/dashboard/workspaces/index.tsx"),
    route(
      "workspaces/:workspaceId",
      "routes/dashboard/workspaces/workspace-details.tsx"
    ),
    route(
      "workspaces/:workspaceId/projects/:projectId",
      "routes/dashboard/project/project-details.tsx"
    ),
    route(
      "workspaces/:workspaceId/projects/:projectId/tasks/:taskId",
      "routes/dashboard/task/task-details.tsx"
    ),
    route("my-tasks", "routes/dashboard/my-tasks.tsx"),
    route("members", "routes/dashboard/members.tsx"),
    route("archived", "routes/dashboard/archived.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),

  route(
    "workspace-invite/:workspaceId",
    "routes/dashboard/workspaces/workspace-invite.tsx"
  ),

  layout("routes/user/user-layout.tsx", [
    route("user/profile", "routes/user/profile.tsx"),
  ]),

  // Portfolio route (now combined with home page)
  // route("portfolio", "routes/portfolio.tsx"),

  // Admin routes
  route("admin/login", "routes/admin/admin-login.tsx"),
  route("admin", "routes/admin/admin-dashboard.tsx"),
  route("admin/portfolio", "routes/admin/admin-portfolio.tsx"),
  route("admin/portfolio/new", "routes/admin/admin-portfolio-new.tsx"),
  route("admin/portfolio/:id", "routes/admin/admin-portfolio-edit.tsx"),
  route("admin/analytics", "routes/admin/admin-analytics.tsx"),
  route("admin/settings", "routes/admin/admin-settings.tsx"),
] satisfies RouteConfig;
