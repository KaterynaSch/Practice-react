import { BsFillTrash3Fill } from "react-icons/bs";
import Modal from 'react-modal';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ButtonDel, ButtonModal, CardWrapper, Title } from "./QuizCard.styled";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const QuizCard = ({quiz: {id, topic, level, time, questions}, onDelete}) => {
   
    const location = useLocation();    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = ()=> {
        setIsModalOpen(true);
    };

    const closeModal = ()=> {
        setIsModalOpen(false);
    };   

    return (
        <CardWrapper>
            <Link to={`/quizzes/${id}`} state={{from: location}}>
                <Title>{topic}</Title> 
            </Link>
            <ButtonDel onClick={() => onDelete(id)} >                
                <BsFillTrash3Fill />
            </ButtonDel>
            <ButtonModal onClick = {openModal}>Open modal</ButtonModal>
            <div>
                <p>Level: {level}</p>
                <p>Time: {time} min</p>
                <p>Questions: {questions}</p>
            </div> 
            <Modal
                isOpen={isModalOpen}        
                onRequestClose={closeModal}//дії при намагвнні закрити модалку
                style={customStyles}
                contentLabel="Example Modal"
                >
                <div>
                    <Title>{topic}</Title>
                    <p>Questions: {questions}</p>
                    <button onClick = {closeModal}>close</button>
                </div>            
            </Modal>      
        </CardWrapper>
    );   
};