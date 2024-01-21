import { BsFillTrash3Fill } from "react-icons/bs";
import Modal from 'react-modal';
import { ButtonDel, ButtonModal, CardWrapper, Title } from "./QuizCard.styled";
import { Component } from "react";


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

// export const QuizCard = ( 
export class QuizCard extends Component {
    state = {
        isModalOpen: false,
    };

    openModal = ()=> {
        this.setState({isModalOpen:true});
    };

    closeModal = ()=> {
        this.setState({isModalOpen:false});
    };

    render(){
        const {isModalOpen} = this.state;
        const {
            quiz: {id, topic, level, time, questions}, 
            onDelete} = this.props;

        return (
        <CardWrapper>
            <Title>{topic}</Title> 
            <ButtonDel onClick={() => onDelete(id)} >                
                <BsFillTrash3Fill />
            </ButtonDel>
            <ButtonModal onClick = {this.openModal}>Open modal</ButtonModal>
            <div>
                <p>Level: {level}</p>
                <p>Time: {time} min</p>
                <p>Questions: {questions}</p>
            </div> 
            <Modal
            isOpen={isModalOpen}        
            onRequestClose={this.closeModal}//дії при намагвнні закрити модалку
            style={customStyles}
            contentLabel="Example Modal"
            >
            <div>
                <Title>{topic}</Title>
                <p>Questions: {questions}</p>
                <button onClick = {this.closeModal}>close</button>
            </div>
            
        </Modal>      
        </CardWrapper>
        )
    };
};
// }