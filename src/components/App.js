import { Component } from "react"
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

changeFilter = (key, value) => {//key - ім'я фільтра: value = evt.target.value з input
  this.setState(prevState => ({
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

render(){//метод класу
  const  {quizItems, filters} = this.state;
    return (
      <div>
        <QuizForm />
        <SearchBar 
        filters = {filters}
        onChangeFilter = {this.changeFilter}
        // level = {filters.level} topic = {filters.topic}         
        // onChangeTopic={this.changeTopicFilter}
        // onChangeLevel={this.changeLevelFilter}
        />
        <QuizList items = {quizItems} />
      </div>
    )
  }
};
