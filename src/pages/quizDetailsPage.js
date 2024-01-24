import { ErrorMessage } from "components/ErrorMessage";
import { fetchQuizById } from "components/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function QuizDetailsPage() {
    const [quiz, setQuiz] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
   

    const {quizId} = useParams();
    useEffect(() => {
        async function getQuiz() {  
            try {
            setLoading(true);
            setError(false);
            const fetcQuiz = await fetchQuizById(quizId);
            setQuiz(fetcQuiz);
            toast.success('We found quiz!')            
            } catch (error) {
            setError(true);
            } finally{
            setLoading(false);
            }   
        }
        getQuiz()
    }, [quizId]); 
    
    return (
        <>
            QuizDetails
            {quiz && 
            <>  
                <p>Topic: {quiz.topic}</p>
                <p>Level: {quiz.level}</p>
            </>}
            {loading && <b>Loading...</b>} 
            {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
        </>
    )
}