import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" })

// const API = axios.create({ baseURL: "https://stackoverflow-clone-server-mv3m.onrender.com" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);



export const postQuestion = (questionData) => API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const getQuestion = (id) => API.get(`/questions/getbyId/${id}`);
export const editQuestion = (id, questionData) => API.patch(`/questions/edit/${id}`, questionData);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId })

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`answer/delete/${id}`, { answerId, noOfAnswers })


export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)

//Payment routes
export const paymentCheckOut = (amount) => API.post("/payment/checkout", amount);
export const paymentGetKey = () => API.get("/payment/geykey");
export const subscriptionSet = (amount) => API.patch("/subscription/verify", amount);
export const subscriptionValidation = (userId) => API.patch("/subscription/validity", userId);