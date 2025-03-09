import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";
import { RoleBasedLayout } from "./components/role-based-layout";
import { RootLayout } from "./components/root-layout";
import { AdminDashboardPage } from "./pages/admin/dashboard";
import { AdminEditPlayerPage } from "./pages/admin/edit-player";
import { AdminNewPlayerPage } from "./pages/admin/new-player";
import { AdminPlayersPage } from "./pages/admin/players";
import { AdminViewPlayerPage } from "./pages/admin/view-player";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { UserDashboardPage } from "./pages/user/dasboard";
import { UserLeaderboardPage } from "./pages/user/leaderboard";
import { UserNewTeamPage } from "./pages/user/new-team";
import { UserPlayerPage } from "./pages/user/player";
import { UserPlayerCategoriesPage } from "./pages/user/player-categories";
import { UserPlayersOfCategoryPage } from "./pages/user/players-of-category";
import { UserSpiriterPage } from "./pages/user/spiriter";
import { UserTeamPage } from "./pages/user/team";
import { UserTeamsPage } from "./pages/user/teams";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute authRequired={false}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute authRequired={false}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute role="user">
            <RoleBasedLayout role="user" />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserDashboardPage />,
          },
          {
            path: "leaderboard",
            element: <UserLeaderboardPage />,
          },
          {
            path: "teams",
            children: [
              {
                index: true,
                element: <UserTeamsPage />,
              },
              {
                path: ":teamId",
                element: <UserTeamPage />,
              },
            ],
          },
          {
            path: "new-team",
            element: <UserNewTeamPage />,
          },
          {
            path: "player-categories",
            element: <UserPlayerCategoriesPage />,
          },
          {
            path: "players-of-category/:categoryId",
            element: <UserPlayersOfCategoryPage />,
          },
          {
            path: "player/:playerId",
            element: <UserPlayerPage />,
          },
          {
            path: "spiriter",
            element: <UserSpiriterPage />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <RoleBasedLayout role="admin" />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "players",
            element: <AdminPlayersPage />,
          },
          {
            path: "player/:playerId",
            element: <AdminViewPlayerPage />,
          },
          {
            path: "edit-player/:playerId",
            element: <AdminEditPlayerPage />,
          },
          {
            path: "new-player",
            element: <AdminNewPlayerPage />,
          },
        ],
      },
    ],
  },
]);
