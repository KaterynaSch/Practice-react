import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { QuizList } from "./QuizList/QuizList";
import { SearchBar } from "./SearchBar/SearchBar";
import { QuizForm } from "./QuizForm/QuizForm";
import { MainContainer } from "./MainContainer.styled";
import { createQuiz, deleteQuizById, fetchQuizzes } from "./api";
import { ErrorMessage } from "./ErrorMessage";

//клас оголошують коли потрібен стан або доступ до методів життєвого циклу(export class App extends Component)
export class App extends Component {
  state = {
    quizItems: [], 
    loading: false,
    error: false,   
    filters: {
      topic: '',
      level: 'all'  
    }
  };
// ці методи є в class Component, але порожні 
// не стрілка, прив'язувння контексту не потрібне
  async componentDidMount(){
    const savedFilters = localStorage.getItem('quizItems');//читання з LS
    if(savedFilters !== null){// перевю чи не пусто
      this.setState({// збереження в state
        filters: JSON.parse(savedFilters),
      });
    }
    try {
      this.setState({loading: true, error :false});
      const quizzes = await fetchQuizzes();
      toast.success('We found quizzes')
      this.setState({
        quizItems: quizzes,
        loading: false,
      });    

    } catch (error) {
      this.setState({error :true});
    } finally {
      this.setState({loading: false});
    }
  }
  //спрацьовує при обновленні стану або пропсів
  componentDidUpdate(prevProps, prevState){ 
    // записувати код через if щоб не перерендувати компонент без зміни його пропса чи стану
    if(
        prevState.filters !== this.state.filters
      ){
        localStorage.setItem('quizFilters', JSON.stringify(this.state.filters));
        console.log('запис в LS');
      }  
  }
  // componentWillUnmount(){}
  addQuiz = async newQuiz => {  
    try {
      this.setState({loading: true, error: false});
      const quiz = await createQuiz(newQuiz);
      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, quiz],
      }));
    } catch (error) {
      this.setState({error :true});
    } finally{
      this.setState({loading: false});
    }  
  };

  getVisibleItems = () => {
    const  {quizItems, filters} = this.state;
    return quizItems.filter(quiz => {
      const topicFilter = filters.topic.toLowerCase();
      const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);
      if(filters.level === 'all'){
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });    
  };

  changeFilter = (key, value) => {//key - ім'я фільтра: value = evt.target.value з input
    this.setState(prevState => ({
      filters:{ 
        ...prevState.filters,//розпилення попереднього стану для гарантії збереження всіх його частин
        [key]: value,
      }
    }))
  };

  resetFilters = () => {
    this.setState({
      filters: {
        topic: '',
        level: 'all'  
      },
    });
  };
  
  deleteQuizItem = async quizId=> {
    try {
      this.setState({loading :true, error: false});
      const deletedQuiz = await deleteQuizById(quizId);      
      this.setState(prevState => ({
        quizItems: prevState.quizItems.filter(quiz => quiz.id !== deletedQuiz.id),
      }))
    } catch (error) {
      this.setState({error :true});
    } finally{
      this.setState({loading: false});
    } 
    
  };
  //React зберігає при зміні стейту лише перший рівень вкладеності властивостей, тому потрібне розпилення prevState
// changeTopicFilter = newTopic => {//newFilter = evt.target.value з input
//   this.setState(prevState => ({
//     filters:{ 
//       ...prevState.filters,//розпилення попереднього стану для гарантії збереження всіх його частин
//       topic: newTopic,
//     }
//   }))
// };

// changeLevelFilter = newLevel => {//newFilter = evt.target.value з input
//   this.setState(prevState => ({
//     filters:{
//       ...prevState.filters,
//       level: newLevel,
//     }
//   }))
// };
//this. звернення в методі до властивості класу

  render(){//метод класу// рендерити при умові що компонент не порожній
    // console.log('render');
    const  { filters, loading, error} = this.state;
    //якщо topic є в topic квіза і якщо filter співпадає - подвійна фільтрація
    const visibleItems = this.getVisibleItems();
      
    return (
      <MainContainer>
        <QuizForm onAdd ={this.addQuiz}/>        
        <SearchBar 
        filters = {filters}
        onChangeFilter = {this.changeFilter}
        // level = {filters.level} topic = {filters.topic}         
        // onChangeTopic={this.changeTopicFilter}
        // onChangeLevel={this.changeLevelFilter}
        onReset = {this.resetFilters}
        />
        {loading && <b>Loading...</b>}
        {error && <ErrorMessage>Error! Please reload this page.</ErrorMessage>}
        {visibleItems.length > 0 && <QuizList items = {visibleItems} onDelete = {this.deleteQuizItem}/>}
        <Toaster />
      </MainContainer>
    )
  }
};
