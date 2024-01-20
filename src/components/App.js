import { Component } from "react"
import {nanoid} from 'nanoid';
import { QuizList } from "./QuizList/QuizList";
import initialQuizItems from '../components/data.json';
import { SearchBar } from "./SearchBar/SearchBar";
import { QuizForm } from "./QuizForm/QuizForm";
import { MainContainer } from "./MainContainer.styled";

//клас оголошують коли потрібен стан або доступ до методів життєвого циклу(export class App extends Component)
export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    // topicFilter: '',
    // levelFilter: 'all',
    filters: {
      topic: '',
      level: 'all'  
    }
  };

// ці методи є в class Component, але порожні 
// не стрілка, прив'язувння контексту не потрібне
componentDidMount(){
  const savedFilters = localStorage.getItem('quizItems');//читання з LS
  if(savedFilters !== null){// перевю чи не пусто
    this.setState({// збереження в state
      filters: JSON.parse(savedFilters),
    });
  }
}

//спрацьовує при обновленні стану або пропсів

componentDidUpdate(prevProps, prevState){ 
  // записувати код через if щоб не перерендувати компонент без зміни його пропса чи стану
  if(
    // prevState.filters.topic !== this.state.filters.topic ||
    // prevState.filters.level !== this.state.filters.level
    prevState.filters !== this.state.filters
    ){
      localStorage.setItem('quizFilters', JSON.stringify(this.state.filters));
      console.log('запис в LS');
    }

  
}
// componentWillUnmount(){}

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

  addQuiz = newQuiz => {  
    this.setState(prevState => ({
      quizItems: [...prevState.quizItems, {...newQuiz, id: nanoid()}],
    }))
  };

  deleteQuizItem = quizId=> {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
    }))
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

  render(){//метод класу
    // console.log('render');
    const  { filters} = this.state;
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
        />
        <QuizList items = {visibleItems} onDelete = {this.deleteQuizItem}/>
      </MainContainer>
    )
  }
};
