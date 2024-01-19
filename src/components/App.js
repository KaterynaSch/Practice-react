import { Component } from "react"
import {nanoid} from 'nanoid';
import { QuizList } from "./QuizList/QuizList";
import initialQuizItems from '../components/data.json';
import { SearchBar } from "./SearchBar/SearchBar";
import { QuizForm } from "./QuizForm/QuizForm";



export class App extends Component {//клас
  state = {
    quizItems: initialQuizItems,
    // topicFilter: '',
    // levelFilter: 'all',
    filters: {
      topic: '',
      level: 'all'  
    }
  };

  addQuiz = newQuiz => {  
    this.setState(prevState => ({
      quizItems: [...prevState.quizItems, {...newQuiz, id: nanoid()}],
    }))
  }

  changeFilter = (key, value) => {//key - ім'я фільтра: value = evt.target.value з input
    this.state(prevState => ({
      filters:{ 
        ...prevState.filters,//розпилення попереднього стану для гарантії збереження всіх його частин
        [key]: value,
      }
    }))
  }

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

  deleteQuizItem = quizId=> {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
    }))
  };

  render(){//метод класу
    const  { filters} = this.state;
    //якщо topic є в topic квіза і якщо filter співпадає - подвійна фільтрація
    const visibleItems = this.getVisibleItems();
      
    return (
      <div>
        <QuizForm onAdd ={this.addQuiz}/>        
        <SearchBar 
        filters = {filters}
        onChangeFilter = {this.changeFilter}
        // level = {filters.level} topic = {filters.topic}         
        // onChangeTopic={this.changeTopicFilter}
        // onChangeLevel={this.changeLevelFilter}
        />
        <QuizList items = {visibleItems} onDelete = {this.deleteQuizItem}/>
      </div>
    )
  }
};
