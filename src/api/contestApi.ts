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
    const res = await axiosInstance.patch(`/admin/contest/update/${id}`, payload);
    return res.data;
  },

  deleteContest: async (code: string | number) => {
    const res = await axiosInstance.delete(`/admin/contest/delete/${code}`);
    return res.data;
  },

  endContest: async (code: string | number) => {
    const res = await axiosInstance.post(`/admin/contest/${code}/end`);
    return res.data;
  },
};

export default contestApi;
