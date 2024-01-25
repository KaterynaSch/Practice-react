import { BackLink } from "components/BackLink";
import { ErrorMessage } from "components/ErrorMessage";
import { QuizForm } from "components/QuizForm/QuizForm";
import { createQuiz } from "components/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateQuizPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);  

    const addQuiz = async newQuiz => {  
        try {
        setLoading(true);
        setError(false);
        await createQuiz(newQuiz);
        toast.success('Add quiz! Search in "QuizListPage"')     
        // додавання quiz не потрібно, тому що в QuizzesPage при монтуванні завжди буде запит за свіжою інфою з беку
        // setQuizItems(prevState =>[...prevState, quiz]);      
        } catch (error) {
        setError(true);
        } finally{
        setLoading(false);
        }  
    };  

    return (
        <>
            <BackLink to="/quizzes">
                Back to quizzes
            </BackLink>
            <QuizForm onAdd ={addQuiz}/>
            {loading && <b>Creating quiz...</b>} 
            {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
        </>        
    );
};