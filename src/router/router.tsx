import { Routes, Route } from "react-router-dom";
import Login from "../page/login";
import Main from "../page/main";
import ContestsPage from "../page/contests/index";
import ContestCreate from "../page/contests/create";
import Profile from "../page/profile";
import Problems from "../page/problems";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/contests/create" element={<ContestCreate />} />
    </Routes>
  );
}
