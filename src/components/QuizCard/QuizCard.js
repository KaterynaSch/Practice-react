import { BsFillTrash3Fill } from "react-icons/bs";
import { ButtonDel, CardWrapper, Title } from "./QuizCard.styled";

export const QuizCard = ( 
    {quiz: {id, topic, level, time, questions}, onDelete}) => {
    return (
    <CardWrapper>
        <Title>{topic}</Title> 
        <ButtonDel onClick={() => onDelete(id)} >
            Delete
            <BsFillTrash3Fill />
        </ButtonDel>
        <div>
            <p>Level: {level}</p>
            <p>Time: {time} min</p>
            <p>Questions: {questions}</p>
        </div>       
    </CardWrapper>
    )
};