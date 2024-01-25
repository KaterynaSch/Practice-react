import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useLocation, useParams } from "react-router-dom";

import { BackLink } from "components/BackLink";
import { ErrorMessage } from "components/ErrorMessage";
import { fetchQuizById } from "components/api";

export default function QuizDetailsPage() {

    const location = useLocation();
    const [quiz, setQuiz] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);   

    const {quizId} = useParams();
    useEffect(() => {
        async function getQuiz() {  
            try {
            setLoading(true);
            setError(false);
            const fetchQuiz = await fetchQuizById(quizId);
            setQuiz(fetchQuiz);
            toast.success('We found quiz!')            
            } catch (error) {
            setError(true);
            } finally{
            setLoading(false);
            }   
        }
        getQuiz()
    }, [quizId]); 

    // location.state.from - url з якого прийшов (збереження обраних фільтрів)
    // -elvis---location?.state?.from - якщо location не об'єкт після ? не об'єкт, то поверне undefined
    return (
        <>
            <h1>QuizDetails</h1>            
            <BackLink to={location?.state?.from ?? "/quizzes"}>Back to quizzes </BackLink>
            {quiz && 
            <>  
                <p>Topic: {quiz.topic}</p>
                <p>Level: {quiz.level}</p>
            </>}
            {loading && <b>Loading...</b>} 
            {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
        </>
    );
};
