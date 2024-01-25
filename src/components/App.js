import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { Layout} from "./Layout";

// розділення коду
const HomePage = lazy(() => import('../pages/HomePage'));
const QuizzesPage= lazy(() => import('../pages/QuizzesPage'));
const CreateQuizPage= lazy(() => import('../pages/CreateQuizPage'));
const QuizDetailsPage= lazy(() => import('../pages/QuizDetailsPage'));
const NotFoundPage= lazy(() => import('../pages/NotFoundPage'));

export const App = () => {   

    return (                 
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index path="/" element={<HomePage/>}/>
                <Route path="create" element={<CreateQuizPage/>}/>
                <Route path="quizzes" element={<QuizzesPage/>}/>
                <Route path="quizzes/:quizId" element={<QuizDetailsPage/>}/>
                <Route path="*" element= {<NotFoundPage/>}/>
                {/* <Route path="*" element= {<Navigate to = {"/"}/>}/> */}
            </Route>
        </Routes>                            
    );  
};
