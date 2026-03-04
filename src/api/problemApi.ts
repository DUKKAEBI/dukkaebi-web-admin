import axiosInstance from "./axiosInstance";

export type Difficulty = "COPPER" | "IRON" | "SILVER" | "GOLD" | "JADE";
export type SolvedResult = "NOT_SOLVED" | "SOLVED" | "WRONG";

export interface ProblemItem {
  problemId: number;
  name: string;
  difficulty: Difficulty;
  score: number;
  solvedCount: number;
  correctRate: number;
  solvedResult: SolvedResult;
  addedAt: string;
}

export interface ProblemListResponse {
  content: ProblemItem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ProblemListParams {
  page?: number;
  size?: number;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface ProblemCreatePayload {
  name: string;
  description: string;
  input: string;
  output: string;
  difficulty: "COPPER" | "IRON" | "SILVER" | "GOLD" | "JADE";
  testCases: TestCase[];
}

export const getProblems = (params?: ProblemListParams) => {
  return axiosInstance.get<ProblemListResponse>(`/problems`, { params });
};

export const getProblem = (id: number) =>
  axiosInstance.get<ProblemItem>(`/problems/${id}`);

export const searchProblems = (name: string) =>
  axiosInstance.get<ProblemItem[]>(`/problems/search`, { params: { name } });

export const filterProblems = (params: Record<string, unknown>) =>
  axiosInstance.get<ProblemItem[]>(`/problems/filter`, { params });

export const createProblem = (payload: ProblemCreatePayload) =>
  axiosInstance.post(`/admin/problems/create`, payload);

export const updateProblem = (
  id: number,
  payload: Partial<ProblemCreatePayload>
) => axiosInstance.put(`/admin/problems/update/${id}`, payload);

export const deleteProblem = (id: number) =>
  axiosInstance.delete(`/admin/problems/delete/${id}`);

export default {
  getProblems,
  getProblem,
  searchProblems,
  filterProblems,
  createProblem,
  updateProblem,
  deleteProblem,
};
