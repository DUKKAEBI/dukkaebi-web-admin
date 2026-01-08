import axiosInstance from "./axiosInstance";

export const contestApi = {
  getContests: async () => {
    const res = await axiosInstance.get(`/contest/list`);
    return res.data;
  },

  getContest: async (id: string | number) => {
    const res = await axiosInstance.get(`/contest/${id}`);
    return res.data;
  },

  createContest: async (payload: any) => {
    const res = await axiosInstance.post(`/admin/contest/create`, payload);
    return res.data;
  },

  updateContest: async (id: string | number, payload: any) => {
    const res = await axiosInstance.patch(
      `/admin/contest/update/${id}`,
      payload
    );
    return res.data;
  },

  endContest: async (code: string | number) => {
    const res = await axiosInstance.post(`/admin/contest/${code}/end`);
    return res.data;
  },

  deleteContest: async (code: string | number) => {
    const res = await axiosInstance.delete(`/admin/contest/delete/${code}`);
    return res.data;
  },

  // 대회 참여자 목록 조회 (등수 순)
  getParticipants: async (code: string | number) => {
    const res = await axiosInstance.get(`/admin/contest/${code}/participants`);
    return res.data;
  },

  // 참여자 점수 수정
  updateParticipantScore: async (
    code: string | number,
    userId: string | number,
    payload: any
  ) => {
    const res = await axiosInstance.patch(
      `/admin/contest/${code}/participant/${userId}/score`,
      payload
    );
    return res.data;
  },

  // 대회 전용 문제 생성
  createContestProblem: async (code: string | number, payload: any) => {
    const res = await axiosInstance.post(
      `/admin/contest/${code}/problem/create`,
      payload
    );
    return res.data;
  },

  // 대회 문제 삭제
  deleteContestProblem: async (
    code: string | number,
    problemId: string | number
  ) => {
    const res = await axiosInstance.delete(
      `/admin/contest/${code}/problem/${problemId}`
    );
    return res.data;
  },
};

export default contestApi;
