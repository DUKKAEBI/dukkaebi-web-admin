import axiosInstance from "./axiosInstance";

function extractBody(res: any) {
  // Try common wrapper patterns to find the actual payload object/array
  const b = res?.data ?? res;
  if (Array.isArray(b)) return b;
  if (b && typeof b === "object") {
    // common: { data: ... }, { result: ... }, { body: ... }
    return b.data ?? b.result ?? b.body ?? b.course ?? b;
  }
  return b;
}

const courseApi = {
  getCourses: async () => {
    const res = await axiosInstance.get(`/course/list`);
    return extractBody(res);
  },

  getCourse: async (id: string | number) => {
    const res = await axiosInstance.get(`/course/${id}`);
    return extractBody(res);
  },

  createCourse: async (payload: any) => {
    const res = await axiosInstance.post(`/admin/course/create`, payload);
    return extractBody(res);
  },

  updateCourse: async (id: string | number, payload: any) => {
    const res = await axiosInstance.patch(
      `/admin/course/update/${id}`,
      payload,
    );
    return extractBody(res);
  },

  deleteCourse: async (code: string | number) => {
    try {
      const res = await axiosInstance.delete(`/admin/course/delete/${code}`);
      return extractBody(res);
    } catch (err: any) {
      // Re-throw with enriched info for caller to display
      const resp = err?.response;
      const status = resp?.status;
      const body = extractBody(resp ?? err);
      const e: any = new Error("Course delete failed");
      e.status = status;
      e.body = body;
      throw e;
    }
  },

  endCourse: async (code: string | number) => {
    const res = await axiosInstance.post(`/admin/course/${code}/end`);
    return extractBody(res);
  },

  addProblemsToCourse: async (
    courseId: string | number,
    payload: { problemIds: Array<number | string> },
  ) => {
    const res = await axiosInstance.post(
      `/admin/course/${courseId}/problems`,
      payload,
    );
    return extractBody(res);
  },

  deleteProblemToCourse: async (courseId: number, problemId: number) => {
    try {
      const res = await axiosInstance.delete(
        `/admin/course/${courseId}/problem/${problemId}`,
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default courseApi;
