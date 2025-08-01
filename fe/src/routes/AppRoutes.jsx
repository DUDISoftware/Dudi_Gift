import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../../views/user/Home/HomePage";
import ExplorePage from "../../views/user/Explore/ExplorePage";
import ChatPage from "../../views/user/Chat/ChatPage";
import ProductDetail from "../../views/user/Product/ProductDetail";
import ProgramsPage from "../../views/user/Programs/ProgramsPage";
import CommunityPage from "../../views/user/Community/CommunityPage";
import PostPage from "../../views/user/Post/PostPage";
import FAQPage from "../../views/user/FAQ/FAQPage";
import ProfilePage from "../../views/user/Profile/ProfilePage";
import NoticePage from "../../views/user/Notice/NoticePage";
import Dashboard from "../../views/admin/Dashboard/Dashboard";
import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";
import ForgotPassword from "../../views/auth/ForgotPassword";
import VerifyCode from "../../views/auth/VerifyCode";
import ResetPassword from "../../views/auth/ResetPassword";
import ResetSuccess from "../../views/auth/ResetSuccess";
import NotFoundPage from '../../views/common/NotFound';
import ChatLayout from "../../views/user/Chat/ChatLayout";
import AccountSettings from "../../views/user/Account/AccountSettings";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
      </Route>

      {/* User */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NoticePage />} />
        <Route path="/messages/:id" element={<ChatPage />} />
        <Route path="/messages" element={<ChatLayout />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/program" element={<ProgramsPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/faq" element={<FAQPage />} /> 
        <Route path="/post" element={<PostPage />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        
      </Route>

      {/* Admin */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
      </Route>
      {/* NotFound */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
