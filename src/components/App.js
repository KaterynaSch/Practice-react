import { Navigate, Route, Routes } from "react-router-dom";

import { MainContainer } from "./MainContainer";
import HomePage from 'pages/HomePage';
import QuizzesPage from 'pages/QuizzesPage';
import CreateQuizPage from 'pages/CreateQuizPage';
import QuizDetailsPage from 'pages/quizDetailsPage';

export const App = () => {   

    return (                   
        <Routes>
            <Route path="/" element={<MainContainer/>}>
                <Route index path="/" element={<HomePage/>}/>
                <Route path="create" element={<CreateQuizPage/>}/>
                <Route path="quizzes" element={<QuizzesPage/>}/>
                <Route path="quizzes/:quizId" element={<QuizDetailsPage/>}/>
                <Route path="*" element= {<Navigate to = {"/"}/>}/>
            </Route>
        </Routes>                     
    )  
};
