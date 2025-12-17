import axiosInstance from "./axiosInstance";

export interface ProblemItem {
  problemId: number;
  name: string;
  difficulty: string;
  solvedCount: number;
  correctRate: number;
  solvedResult?: string;
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

export const getProblems = (params?: Record<string, unknown>) =>
  axiosInstance.get<ProblemItem[]>(`/problems`, { params });

export const getProblem = (id: number) =>
  axiosInstance.get<ProblemItem>(`/problems/${id}`);

export const searchProblems = (name: string) =>
  axiosInstance.get<ProblemItem[]>(`/problems/search`, { params: { name } });

export const filterProblems = (params: Record<string, unknown>) =>
  axiosInstance.get<ProblemItem[]>(`/problems/filter`, { params });

export const createProblem = (payload: ProblemCreatePayload) =>
  axiosInstance.post(`/admin/problems/create`, payload);

export const updateProblem = (id: number, payload: Partial<ProblemCreatePayload>) =>
  axiosInstance.put(`/admin/problems/update/${id}`, payload);

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
