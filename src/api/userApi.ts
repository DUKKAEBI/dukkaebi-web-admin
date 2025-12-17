import axiosInstance from "./axiosInstance";

const userApi = {
  getUsers: async () => {
    const res = await axiosInstance.get(`/user/list`);
    return res.data;
  },

  getUser: async (id: string | number) => {
    const res = await axiosInstance.get(`/user/info/${id}`);
    return res.data;
  },

  updateUser: async (id: string | number, payload: any) => {
    const res = await axiosInstance.patch(`/admin/user/${id}`, payload);
    return res.data;
  },

  deleteUser: async (id: string | number) => {
    const res = await axiosInstance.delete(`/admin/user/delete/${id}`);
    return res.data;
  },
};

export default userApi;
