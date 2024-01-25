import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ErrorMessage } from "components/ErrorMessage";
import { QuizList } from "components/QuizList/QuizList";
import { SearchBar } from "components/SearchBar/SearchBar";
import { deleteQuizById, fetchQuizzes } from "components/api";
import { useFilters } from "hooks/useFilters";

// ф-ція ініціалізатор стану
// спрацьовує ще до стадії монтування компонента, до Effect
// const getInitialFilters = () => {
//     const savedFilters = localStorage.getItem('quizItems');//читання з LS
//     if(savedFilters !== null){//якщо не пусто
//         return JSON.parse(savedFilters);
//     }
//     return {topic: '', level: 'all' }
// }

export default function QuizzesPage() {
     const [quizItems, setQuizItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [filters, setFilters] = useState(getInitialFilters);
   
    const {topic, level} = useFilters();

    // useEffect(() => {//замість componentDidUpdate(filers)//спрацьовує при обновленні стану або пропсів
    //     localStorage.setItem('quizFilters', JSON.stringify(filters));
    // }, [filters]);

    useEffect(()=> {//не може бути async, щоб запобігти 'ефекту гонитви'- race conditions
        async function getQuizzes() {
            try {
                setLoading(true);
                setError(false);
                const quizzes = await fetchQuizzes();
                toast.success('We found quizzes')     
                setQuizItems(quizzes);    
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getQuizzes();
    },[])//порожній, бо в методі немає використання state or props    

    const deleteQuizItem = async quizId=> {
        try {
            setLoading(true);
            setError(false);
            const deletedQuiz = await deleteQuizById(quizId); 
            setQuizItems(prevState => 
                prevState.filter(quiz => quiz.id !== deletedQuiz.id)     
            );
        } catch (error) {
            setError(true);
        } finally{
            setLoading(false);
        }         
    };  

    const visibleItems = quizItems.filter(quiz => {
        const topicFilter = topic.toLowerCase();
        const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);
        if(level === 'all'){
            return hasTopic;
        }
        return hasTopic && quiz.level === level;
    }); 

    return (
        <>
            <SearchBar />
            {loading && <b>Loading...</b>} 
            {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
            {visibleItems.length > 0 && <QuizList items = {visibleItems} onDelete = {deleteQuizItem}/>} 
        </>
    );
};