import axios from "axios";
// import interviewReportModel from "../../../../../Backend/src/models/interviewReport.model";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * @description Generates a new AI interview report by uploading resume and user details.
 */

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) =>{
  const formData = new FormData()
  formData.append("jobDescription",jobDescription)
  formData.append("selfDescription",selfDescription)
  formData.append("resume",resumeFile)

  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response.data
}

/**
 * @description Fetches a specific interview report using its interview ID.
 */


export const getInterviewReportById = async (interviewId) =>{
  const response = await api.get(`/api/interview/report/${interviewId}`)

  return response.data
}

/**
 * @description Fetches all interview reports of the currently logged-in user.
 */

export const getAllInterviewReports = async ()=>{
  const response = await api.get("/api/interview")

  return response.data
}

/**
 * @description Generates and downloads an ATS-friendly resume PDF tailored to the selected interview report.
 */

export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    {},
    {
      responseType: "blob",
    }
  );

  return response.data;
};