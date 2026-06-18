import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HomePage from "@/app/home/HomePage"
import LoginPage from "@/app/login/LoginPage"
import RegisterPage from "@/app/register/RegisterPage"

import AdminLayout from "@/app/admin/AdminLayout"
import AdminOverviewPage from "@/app/admin/AdminOverviewPage"
import AdminUsersPage from "@/app/admin/AdminUsersPage"
import AdminProjectsPage from "@/app/admin/AdminProjectsPage"
import AdminQuestsPage from "@/app/admin/AdminQuestsPage"

import DashboardLayout from "@/app/dashboard/DashboardLayout"
import DashboardHomePage from "@/app/dashboard/pages/DashboardHomePage"
import ProfilePage from "@/app/dashboard/pages/ProfilePage"
import SettingsPage from "@/app/dashboard/pages/SettingsPage"
import AiTalentPage from "@/app/dashboard/pages/chat/AiTalentPage"
import ItCareerPage from "@/app/dashboard/pages/chat/ItCareerPage"
import ProjectAccessPage from "@/app/dashboard/pages/project/ProjectAccessPage"
import ProjectDashboardPage from "@/app/dashboard/pages/project/ProjectDashboardPage"
import ProjectStatusPage from "@/app/dashboard/pages/project/ProjectStatusPage"
import SubmissionPage from "@/app/dashboard/pages/project/SubmissionPage"
import MicroLearningPage from "@/app/dashboard/pages/microlearning/MicroLearningPage"
import ModuleDetailPage from "@/app/dashboard/pages/microlearning/ModuleDetailPage"
import GamifiedQuestPage from "@/app/dashboard/pages/project/GamifiedQuestPage"
import ProjectMissionPage from "@/app/dashboard/pages/project/ProjectMissionPage"
import MentorPage from "@/app/dashboard/pages/mentor/MentorPage"
import MentorProjectDetailPage from "@/app/dashboard/pages/mentor/MentorProjectDetailPage"
import MentorEditSubmissionPage from "@/app/dashboard/pages/mentor/MentorEditSubmissionPage"
import EnrollAdvancedTrackPage from "@/app/dashboard/pages/mentor/EnrollAdvancedTrackPage"
import HubungiMentorPage from "@/app/dashboard/pages/mentor/HubungiMentorPage"
import CommunityPage from "@/app/dashboard/pages/komunitas/CommunityPage"
import ThreadDetailPage from "@/app/dashboard/pages/komunitas/ThreadDetailPage"
import CreateThreadPage from "@/app/dashboard/pages/komunitas/CreateThreadPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Navbar + Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<><Navbar /><LoginPage /></>} />
        <Route path="/register" element={<><Navbar /><RegisterPage /></>} />

        {/* Admin routes — separate layout, only for admin role */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="quests" element={<AdminQuestsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Dashboard routes — layout with sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Chat bot & IT Career */}
          <Route path="chat">
            <Route index element={<Navigate to="ai-talent" replace />} />
            <Route path="ai-talent" element={<AiTalentPage />} />
            <Route path="it-career" element={<ItCareerPage />} />
          </Route>

          {/* Project Workspace */}
          <Route path="project">
            <Route index element={<ProjectAccessPage />} />
            <Route path="dashboard" element={<ProjectDashboardPage />} />
            <Route path="mission/:levelId" element={<ProjectMissionPage />} />
            <Route path="status" element={<ProjectStatusPage />} />
            <Route path="submission" element={<SubmissionPage />} />
            <Route path="gamified-quest" element={<GamifiedQuestPage />} />
          </Route>

          {/* Micro Learning — standalone */}
          <Route path="micro-learning">
            <Route index element={<MicroLearningPage />} />
            <Route path=":moduleId" element={<ModuleDetailPage />} />
          </Route>

          {/* Mentor */}
          <Route path="mentor">
            <Route index element={<MentorPage />} />
            <Route path="enroll" element={<EnrollAdvancedTrackPage />} />
            <Route path=":projectId" element={<MentorProjectDetailPage />} />
            <Route path=":projectId/edit" element={<MentorEditSubmissionPage />} />
            <Route path=":projectId/contact" element={<HubungiMentorPage />} />
          </Route>

          {/* Community */}
          <Route path="community">
            <Route index element={<CommunityPage />} />
            <Route path="create" element={<CreateThreadPage />} />
            <Route path=":threadId" element={<ThreadDetailPage />} />
          </Route>

          <Route path="settings" element={<SettingsPage />} />

          {/* Catch-all → redirect ke home dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Global 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
