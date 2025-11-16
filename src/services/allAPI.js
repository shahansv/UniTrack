import axiosConfig from "./axiosConfig";
import { baseURL, collegeURL } from "./baseURL";

export const getCollegeData = async (country) => {
  return await axiosConfig("get", `${collegeURL}${country}&limit=200`, "");
};

export const applyCollege = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/myCollege`, reqBody);
};

export const getAppliedCollegeData = async () => {
  return await axiosConfig("get", `${baseURL}/myCollege`, "");
};

export const deleteCollege = async (id) => {
  return await axiosConfig("delete", `${baseURL}/myCollege/${id}`, {});
};

export const editCollege = async (id, reqBody) => {
  return await axiosConfig("patch", `${baseURL}/myCollege/${id}`, reqBody);
};
