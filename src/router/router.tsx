import { Routes, Route } from "react-router-dom";
import Login from "../page/login";
import Main from "../page/main";
import ContestsPage from "../page/contests/index";
import Profile from "../page/profile";
import Problems from "../page/problems";
import UsersPage from "../page/users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:userId" element={<Profile />} />
      <Route path="/contests" element={<ContestsPage />} />
    </Routes>
  );
}
