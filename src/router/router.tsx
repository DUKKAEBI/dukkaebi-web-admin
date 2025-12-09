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
import UsersPage from "../page/users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/problems" element={<Problems />} />
<<<<<<< HEAD
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/contests/create" element={<ContestCreate />} />
      <Route path="/contests/update/:id" element={<ContestUpdate />} />
      <Route path="/contests/info/:id" element={<ContestInfo />} />
      <Route path="/contests/problems/create" element={<ProblemCreate />} />
=======
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:userId" element={<Profile />} />
      <Route path="/contests" element={<ContestPage />} />
>>>>>>> 01bd294484d8b1367af14170444583e591756039
    </Routes>
  );
}
