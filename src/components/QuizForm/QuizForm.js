import { Formik} from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';

import  PracticeCaptcha  from 'components/PracticeCaptcha/PracticeCaptcha';
import { StyledErrMessage, StyledField, StyledForm, StyledLabel, FormButton } from './QuizForm.styled';


const QuizSchema = Yup.object().shape({
    topic: Yup.string().min(3, 'Too Short!').required('Required'),
    time: Yup.number().min(10, 'Min 10 mins').max(30, 'Max 30 mins').required('Required'),
    questions: Yup.number().min(5, 'Min 5 questions').max(20, 'Max 30 questions').required('Required'),
    level: Yup.string().oneOf(['beginner', 'intermediate', 'advanced']).required('Required')    
})

export const QuizForm = ({onAdd}) => {
  const [captchaValue, setCaptchaValue] = useState('');
  const recaptchaRef = useRef();

  return (      
        <Formik
        initialValues={{//початкове значення
          topic: '',
          time: 0,
          questions: 0,
          level: 'beginner'
        }}
        validationSchema={QuizSchema}
        onSubmit={ (values, actions) => {         
          onAdd(values);//додавання нового квіза при submit
          actions.resetForm();//очищення полів форми при submit 
          console.log(recaptchaRef.current);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
            setCaptchaValue('');
          }                   
        }}
        
      >       
        <StyledForm>
            <StyledLabel >
                Topic
                <StyledField  name="topic" placeholder="Topic" />
                <StyledErrMessage name= 'topic'/>
            </StyledLabel>
            <StyledLabel >
                Time
                <StyledField type='number' name="time" placeholder="Time" />
                <StyledErrMessage name='time'/>
            </StyledLabel>
            <StyledLabel >
                Questions
                <StyledField type='number' name="questions" placeholder="Questions" />
                <StyledErrMessage name= 'questions'/>
            </StyledLabel>
            <StyledLabel >
                Level
                <StyledField as="select" name="level">             
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>             
                </StyledField>
                <StyledErrMessage name= 'level'/>
            </StyledLabel>            
           <PracticeCaptcha ref={recaptchaRef} onChange={setCaptchaValue}/>  
           {captchaValue  && <FormButton type='submit'>Add quiz</FormButton>}                          
        </StyledForm>
      </Formik>        
    );
}; 
