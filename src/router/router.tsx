import { Routes, Route } from "react-router-dom";
import Login from "../page/login";
import Main from "../page/main";
import ContestsPage from "../page/contests/index";
import ContestCreate from "../page/contests/create";
import ContestUpdate from "../page/contests/update";
import ContestInfo from "../page/contests/info";
import Profile from "../page/profile";
import ProblemCreate from "../page/contests/problems/create";
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
      <Route path="/contests/update/:id" element={<ContestUpdate />} />
      <Route path="/contests/info/:id" element={<ContestInfo />} />
      <Route path="/contests/problems/create" element={<ProblemCreate />} />
    </Routes>
  );
}
