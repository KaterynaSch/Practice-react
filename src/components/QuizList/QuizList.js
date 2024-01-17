import { QuizCard } from "components/QuizCard/QuizCard"

export const QuizList = ({items}) => {//<li> повинна бути в списку
    return (
        <ul>        
            {items.map(item => ( 
            <li key={item.id}>      
                <QuizCard quiz={item}  />
            </li>
            ))} 
            
        </ul>
    )
}