import axiosInstance from "./axiosInstance";

export interface TestCase {
  input: string;
  output: string;
}
export interface ContestProblemCreatePayload {
  name: string;
  description: string;
  input: string;
  output: string;
  score: number;
  testCases: TestCase[];
}

export const contestApi = {
  getContests: async (page: number = 0, size: number = 12) => {
    const res = await axiosInstance.get(`/contest/list`, {
      params: { page, size },
    });
    return res.data;
  },

  getContest: async (id: string | number) => {
    const res = await axiosInstance.get(`/contest/${id}`);
    return res.data;
  },

  // 대회 이미지 업로드
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(
      `/admin/contest/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  },

  // 대회 생성
  createContest: async (payload: {
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
  }) => {
    const res = await axiosInstance.post(`/admin/contest/create`, payload);
    return res.data;
  },

  updateContest: async (id: string | number, payload: any) => {
    const res = await axiosInstance.patch(
      `/admin/contest/update/${id}`,
      payload,
    );
    return res.data;
  },

  ///admin/contest/{code}/problem/{problemId}/score
  updateContestProblemScore: async (
    contestId: string,
    problemId: number,
    payload: {
      score: number;
    },
  ) => {
    try {
      return await axiosInstance.patch(
        `admin/contest/${contestId}/problem/${problemId}/score`,
        payload,
      );
    } catch (error) {
      console.log(error);
    }
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
    payload: any,
  ) => {
    const res = await axiosInstance.patch(
      `/admin/contest/${code}/participant/${userId}/score`,
      payload,
    );
    return res.data;
  },

  // 대회 전용 문제 생성
  createContestProblem: async (code: string | number, payload: any) => {
    const res = await axiosInstance.post(
      `/admin/contest/${code}/problem/create`,
      payload,
    );
    return res.data;
  },

  // 대회 문제 삭제
  deleteContestProblem: async (
    code: string | number,
    problemId: string | number,
  ) => {
    const res = await axiosInstance.delete(
      `/admin/contest/${code}/problem/${problemId}`,
    );
    return res.data;
  },

  //대회 문세 수정
  contestUpdateProblem: async (
    contestId: string,
    problemId: number,
    payload: Partial<ContestProblemCreatePayload>,
  ) => {
    console.log(payload);
    const cleanedPayload = {
      ...payload,
      testCases: payload.testCases?.map(({ input, output }) => ({
        input,
        output,
      })),
      difficulty: null,
    };

    return axiosInstance.patch(
      `/admin/contest/${contestId}/problem/${problemId}`,
      cleanedPayload,
    );
  },

  //일반 문제 대회에 가져오기
  addProblemsToContest: async (
    contestId: string,
    payload: { problemIds: number[] },
  ) => {
    try {
      return axiosInstance.post(
        `/admin/contest/${contestId}/problem/add`,
        payload,
      );
    } catch (error) {
      console.log(error);
    }
  },

  // 학생 제출 코드 조회
  getUserSubmission: async (
    code: string | number,
    problemId: string | number,
    userId: string | number,
  ) => {
    const res = await axiosInstance.get(
      `/admin/contest/${code}/problem/${problemId}/user/${userId}/submission`,
    );
    return res.data;
  },
};

export default contestApi;
