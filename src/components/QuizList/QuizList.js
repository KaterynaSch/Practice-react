import { QuizCard } from "components/QuizCard/QuizCard";
import { List } from "./QuizList.styled";

export const QuizList = ({items, onDelete}) => {//<li> повинна бути в списку
    return (
        <List>        
            {items.map(item => ( 
            <li key={item.id}>      
                <QuizCard quiz={item} onDelete = {onDelete} />
            </li>
            ))} 
            
        </List>
    );
};