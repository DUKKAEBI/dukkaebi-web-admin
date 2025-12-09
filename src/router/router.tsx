import { Routes, Route } from "react-router-dom";
import Login from "../page/login";
import Main from "../page/main";
import ContestsPage from "../page/contests/index";
import Profile from "../page/profile";
import Problems from "../page/problems";
import UsersPage from "../page/users";
import ContestCreate from "../page/contests/create/index";
import ContestUpdate from "../page/contests/update";
import ContestInfo from "../page/contests/info";
import ProblemCreate from "../page/contests/problems/create";
import ProblemUpdate from "../page/contests/problems/update";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:userId" element={<Profile />} />
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/contests/:contestsId" element={<ContestInfo />} />
      <Route path="/contests/create" element={<ContestCreate />} />
      <Route path="/contests/update/:contestsId" element={<ContestUpdate />} />
      <Route
        path="/contests/problems/create/:contestsId"
        element={<ProblemCreate />}
      />
      <Route
        path="/contests/problems/update/:problemsId"
        element={<ProblemUpdate />}
      />
    </Routes>
  );
}
