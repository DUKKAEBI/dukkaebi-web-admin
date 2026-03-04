import axiosInstance from "./axiosInstance";

export const noticeApi = {
  // 공지사항 모두 조회 (등록일 최신순 정렬)
  getNotices: async (page: number = 0, size: number = 10) => {
    const res = await axiosInstance.get(`/notice`, {
      params: { page, size, sort: "date,desc" },
    });
    return res.data;
  },

  // 공지사항 상세 조회
  getNotice: async (noticeId: string | number) => {
    const res = await axiosInstance.get(`/notice/${noticeId}`);
    return res.data;
  },

  // 공지사항 검색
  searchNotices: async (keyword: string) => {
    const res = await axiosInstance.get(`/notice/search`, {
      params: { keyword },
    });
    return res.data;
  },

  // 파일 업로드
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(`/admin/notice/upload-file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // 공지사항 생성
  createNotice: async (payload: {
    title: string;
    content: string;
    fileUrl: string;
  }) => {
    const res = await axiosInstance.post(`/admin/notice/create`, payload);
    return res.data;
  },

  // 공지사항 수정
  updateNotice: async (noticeId: string | number, payload: FormData) => {
    const res = await axiosInstance.put(
      `/admin/notice/update/${noticeId}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },

  // 공지사항 삭제
  deleteNotice: async (noticeId: string | number) => {
    const res = await axiosInstance.delete(`/admin/notice/delete/${noticeId}`);
    return res.data;
  },
};

export default noticeApi;
