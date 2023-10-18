const AUTH_HEADER = "Bearer"
const HOST = "http://localhost:8000";
const LOGOUT = "/logout"

const LOGIN = new URL("/user/auth/login/", HOST );
const LECTURES = new URL("/lecture/", HOST);
const CATEGORY = new URL("/category/", HOST);
const SESSION_CREATE = new URL("/exam/session/", HOST);
const LATEST_COURSES = new URL("/course/", HOST);

const getCurrentExamSessionUrl = exam_id => new URL(`/exam/${exam_id}/session/current/`, HOST);
const getExamUrl = exam_id => new URL(`/exam/${exam_id}/`, HOST);

const getLectureUrl = id => new URL(`/lecture/${id}/`, HOST)

export {HOST, LOGIN, AUTH_HEADER, LOGOUT, LECTURES, LATEST_COURSES, CATEGORY, SESSION_CREATE, getCurrentExamSessionUrl, getLectureUrl, getExamUrl}