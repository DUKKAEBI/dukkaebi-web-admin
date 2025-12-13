import { Routes, Route } from "react-router-dom";
import Login from "../page/login";
import Main from "../page/main";
import ContestsPage from "../page/contests/index";
import CoursePage from "../page/course/index";
import CourseCreatePage from "../page/course/create/index";
import CourseUpdatePage from "../page/course/update/index";
import Profile from "../page/users/info/index";
import Problems from "../page/problems";
import UsersPage from "../page/users";
import ContestCreate from "../page/contests/create/index";
import ContestUpdate from "../page/contests/update";
import ContestInfo from "../page/contests/info";
import ProblemCreate from "../page/contests/problems/create";
import ProblemUpdate from "../page/contests/problems/update";
import ProblemCreatePage from "../page/problems/create/index";
import ProblemUpdatePage from "../page/problems/update/index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/create" element={<ProblemCreatePage />} />
      <Route path="/problems/update/:id" element={<ProblemUpdatePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:userId" element={<Profile />} />
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/contests/:contestsId" element={<ContestInfo />} />
      <Route path="/contests/create" element={<ContestCreate />} />
      <Route path="/contests/update/:contestsId" element={<ContestUpdate />} />
      <Route path="/course" element={<CoursePage />} />
      <Route path="/course/create" element={<CourseCreatePage />} />
      <Route path="/course/update/:courseId" element={<CourseUpdatePage />} />
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
