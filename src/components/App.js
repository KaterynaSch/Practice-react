import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { QuizList } from "./QuizList/QuizList";
import { SearchBar } from "./SearchBar/SearchBar";
import { QuizForm } from "./QuizForm/QuizForm";
import { MainContainer } from "./MainContainer.styled";
import { createQuiz, deleteQuizById, fetchQuizzes } from "./api";
import { ErrorMessage } from "./ErrorMessage";

//ф-ція ініціалізатор стану
// спрацьовує ще до стадії монтування компонента, до Effect
const getInitialFilters = () => {
    const savedFilters = localStorage.getItem('quizItems');//читання з LS
    if(savedFilters !== null){//якщо не пусто
        return JSON.parse(savedFilters);
    }
    return {topic: '', level: 'all' }
}
//клас оголошують коли потрібен стан або доступ до методів життєвого циклу(export class App extends Component)
export const App = () => {

    const [quizItems, setQuizItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filters, setFilters] = useState(getInitialFilters);
   

    useEffect(() => {//замість componentDidUpdate(filers)//спрацьовує при обновленні стану або пропсів
        localStorage.setItem('quizFilters', JSON.stringify(filters));
    }, [filters]);

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

    const addQuiz = async newQuiz => {  
        try {
        setLoading(true);
        setError(false);
        const quiz = await createQuiz(newQuiz);
        setQuizItems(prevState =>[...prevState, quiz]);      
        } catch (error) {
        setError(true);
        } finally{
        setLoading(false);
        }  
    };       

//хуки взагалі не зберігають цілісність попередного стану
    const changeFilter = (key, value) => {//key - ім'я фільтра: value = evt.target.value з input
        setFilters(prevState => ({      
            ...prevState,//розпилення попереднього стану для гарантії збереження всіх його частин
            [key]: value,     
        }));
    };

    const resetFilters = () => {
        setFilters({     
            topic: '',
            level: 'all'  
        });
    };
  
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
        const topicFilter = filters.topic.toLowerCase();
        const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);
        if(filters.level === 'all'){
            return hasTopic;
        }
        return hasTopic && quiz.level === filters.level;
    }); 

    return (
      <MainContainer>
        <QuizForm onAdd ={addQuiz}/>        
        <SearchBar 
        filters = {filters}
        onChangeFilter = {changeFilter}        
        onReset = {resetFilters}
        />
        {loading && <b>Loading...</b>}
        {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
        {visibleItems.length > 0 && <QuizList items = {visibleItems} onDelete = {deleteQuizItem}/>}
        <Toaster />
      </MainContainer>
    )  
};
