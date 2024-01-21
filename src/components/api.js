import axios from "axios";

axios.defaults.baseURL = 'https://65ad1da4adbd5aa31be023a4.mockapi.io/api';

export const fetchQuizzes = async() => {
    const response = await axios.get('/quizzes');
    return response.data;
};

export const createQuiz = async(quiz) => {
    const response = await axios.post('/quizzes', quiz);
    return response.data;
};

export const deleteQuizById = async(quizId) => {
    const response = await axios.delete(`/quizzes/${quizId}`);
    return response.data;
};